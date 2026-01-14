import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { StaffService } from '../service/staff.service';
import { IStaff } from '../staff.model';
import { StaffFormService } from './staff-form.service';

import { StaffUpdateComponent } from './staff-update.component';

describe('Staff Management Update Component', () => {
  let comp: StaffUpdateComponent;
  let fixture: ComponentFixture<StaffUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let staffFormService: StaffFormService;
  let staffService: StaffService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StaffUpdateComponent],
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
      .overrideTemplate(StaffUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StaffUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    staffFormService = TestBed.inject(StaffFormService);
    staffService = TestBed.inject(StaffService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const staff: IStaff = { id: 'CBA' };
      const credential: IUser = { id: '4e721970-f867-4627-bd3d-7265264b9bbf' };
      staff.credential = credential;

      const userCollection: IUser[] = [{ id: '4bb72124-bad9-4848-be96-0bacdcc776d6' }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [credential];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ staff });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const staff: IStaff = { id: 'CBA' };
      const credential: IUser = { id: '75aa936a-ae7a-4886-8d3f-d0c7eab04fc0' };
      staff.credential = credential;

      activatedRoute.data = of({ staff });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(credential);
      expect(comp.staff).toEqual(staff);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStaff>>();
      const staff = { id: 'ABC' };
      jest.spyOn(staffFormService, 'getStaff').mockReturnValue(staff);
      jest.spyOn(staffService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ staff });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: staff }));
      saveSubject.complete();

      // THEN
      expect(staffFormService.getStaff).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(staffService.update).toHaveBeenCalledWith(expect.objectContaining(staff));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStaff>>();
      const staff = { id: 'ABC' };
      jest.spyOn(staffFormService, 'getStaff').mockReturnValue({ id: null });
      jest.spyOn(staffService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ staff: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: staff }));
      saveSubject.complete();

      // THEN
      expect(staffFormService.getStaff).toHaveBeenCalled();
      expect(staffService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStaff>>();
      const staff = { id: 'ABC' };
      jest.spyOn(staffService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ staff });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(staffService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
