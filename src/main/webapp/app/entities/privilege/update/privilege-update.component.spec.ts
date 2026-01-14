import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { PrivilegeService } from '../service/privilege.service';
import { IPrivilege } from '../privilege.model';
import { PrivilegeFormService } from './privilege-form.service';

import { PrivilegeUpdateComponent } from './privilege-update.component';

describe('Privilege Management Update Component', () => {
  let comp: PrivilegeUpdateComponent;
  let fixture: ComponentFixture<PrivilegeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let privilegeFormService: PrivilegeFormService;
  let privilegeService: PrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrivilegeUpdateComponent],
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
      .overrideTemplate(PrivilegeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    privilegeFormService = TestBed.inject(PrivilegeFormService);
    privilegeService = TestBed.inject(PrivilegeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const privilege: IPrivilege = { id: 'CBA' };

      activatedRoute.data = of({ privilege });
      comp.ngOnInit();

      expect(comp.privilege).toEqual(privilege);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrivilege>>();
      const privilege = { id: 'ABC' };
      jest.spyOn(privilegeFormService, 'getPrivilege').mockReturnValue(privilege);
      jest.spyOn(privilegeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ privilege });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: privilege }));
      saveSubject.complete();

      // THEN
      expect(privilegeFormService.getPrivilege).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(privilegeService.update).toHaveBeenCalledWith(expect.objectContaining(privilege));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrivilege>>();
      const privilege = { id: 'ABC' };
      jest.spyOn(privilegeFormService, 'getPrivilege').mockReturnValue({ id: null });
      jest.spyOn(privilegeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ privilege: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: privilege }));
      saveSubject.complete();

      // THEN
      expect(privilegeFormService.getPrivilege).toHaveBeenCalled();
      expect(privilegeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrivilege>>();
      const privilege = { id: 'ABC' };
      jest.spyOn(privilegeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ privilege });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(privilegeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
