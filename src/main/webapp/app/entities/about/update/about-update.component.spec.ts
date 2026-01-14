import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { AboutService } from '../service/about.service';
import { IAbout } from '../about.model';
import { AboutFormService } from './about-form.service';

import { AboutUpdateComponent } from './about-update.component';

describe('About Management Update Component', () => {
  let comp: AboutUpdateComponent;
  let fixture: ComponentFixture<AboutUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let aboutFormService: AboutFormService;
  let aboutService: AboutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AboutUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AboutUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AboutUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    aboutFormService = TestBed.inject(AboutFormService);
    aboutService = TestBed.inject(AboutService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const about: IAbout = { id: 'CBA' };

      activatedRoute.data = of({ about });
      comp.ngOnInit();

      expect(comp.about).toEqual(about);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAbout>>();
      const about = { id: 'ABC' };
      jest.spyOn(aboutFormService, 'getAbout').mockReturnValue(about);
      jest.spyOn(aboutService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ about });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: about }));
      saveSubject.complete();

      // THEN
      expect(aboutFormService.getAbout).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(aboutService.update).toHaveBeenCalledWith(expect.objectContaining(about));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAbout>>();
      const about = { id: 'ABC' };
      jest.spyOn(aboutFormService, 'getAbout').mockReturnValue({ id: null });
      jest.spyOn(aboutService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ about: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: about }));
      saveSubject.complete();

      // THEN
      expect(aboutFormService.getAbout).toHaveBeenCalled();
      expect(aboutService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAbout>>();
      const about = { id: 'ABC' };
      jest.spyOn(aboutService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ about });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(aboutService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
