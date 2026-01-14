import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CareerService } from '../service/career.service';
import { ICareer } from '../career.model';
import { CareerFormService } from './career-form.service';

import { CareerUpdateComponent } from './career-update.component';

describe('Career Management Update Component', () => {
  let comp: CareerUpdateComponent;
  let fixture: ComponentFixture<CareerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let careerFormService: CareerFormService;
  let careerService: CareerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CareerUpdateComponent],
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
      .overrideTemplate(CareerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CareerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    careerFormService = TestBed.inject(CareerFormService);
    careerService = TestBed.inject(CareerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const career: ICareer = { id: 'CBA' };

      activatedRoute.data = of({ career });
      comp.ngOnInit();

      expect(comp.career).toEqual(career);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICareer>>();
      const career = { id: 'ABC' };
      jest.spyOn(careerFormService, 'getCareer').mockReturnValue(career);
      jest.spyOn(careerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ career });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: career }));
      saveSubject.complete();

      // THEN
      expect(careerFormService.getCareer).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(careerService.update).toHaveBeenCalledWith(expect.objectContaining(career));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICareer>>();
      const career = { id: 'ABC' };
      jest.spyOn(careerFormService, 'getCareer').mockReturnValue({ id: null });
      jest.spyOn(careerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ career: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: career }));
      saveSubject.complete();

      // THEN
      expect(careerFormService.getCareer).toHaveBeenCalled();
      expect(careerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICareer>>();
      const career = { id: 'ABC' };
      jest.spyOn(careerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ career });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(careerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
