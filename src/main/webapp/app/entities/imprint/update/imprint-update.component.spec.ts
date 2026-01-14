import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ImprintService } from '../service/imprint.service';
import { IImprint } from '../imprint.model';
import { ImprintFormService } from './imprint-form.service';

import { ImprintUpdateComponent } from './imprint-update.component';

describe('Imprint Management Update Component', () => {
  let comp: ImprintUpdateComponent;
  let fixture: ComponentFixture<ImprintUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let imprintFormService: ImprintFormService;
  let imprintService: ImprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ImprintUpdateComponent],
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
      .overrideTemplate(ImprintUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ImprintUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    imprintFormService = TestBed.inject(ImprintFormService);
    imprintService = TestBed.inject(ImprintService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const imprint: IImprint = { id: 'CBA' };

      activatedRoute.data = of({ imprint });
      comp.ngOnInit();

      expect(comp.imprint).toEqual(imprint);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImprint>>();
      const imprint = { id: 'ABC' };
      jest.spyOn(imprintFormService, 'getImprint').mockReturnValue(imprint);
      jest.spyOn(imprintService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ imprint });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: imprint }));
      saveSubject.complete();

      // THEN
      expect(imprintFormService.getImprint).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(imprintService.update).toHaveBeenCalledWith(expect.objectContaining(imprint));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImprint>>();
      const imprint = { id: 'ABC' };
      jest.spyOn(imprintFormService, 'getImprint').mockReturnValue({ id: null });
      jest.spyOn(imprintService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ imprint: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: imprint }));
      saveSubject.complete();

      // THEN
      expect(imprintFormService.getImprint).toHaveBeenCalled();
      expect(imprintService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImprint>>();
      const imprint = { id: 'ABC' };
      jest.spyOn(imprintService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ imprint });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(imprintService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
