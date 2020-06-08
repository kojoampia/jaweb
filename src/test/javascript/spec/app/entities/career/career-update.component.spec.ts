/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { CareerUpdateComponent } from 'app/entities/career/career-update.component';
import { CareerService } from 'app/entities/career/career.service';
import { Career } from 'app/shared/model/career.model';

describe('Component Tests', () => {
    describe('Career Management Update Component', () => {
        let comp: CareerUpdateComponent;
        let fixture: ComponentFixture<CareerUpdateComponent>;
        let service: CareerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [CareerUpdateComponent]
            })
                .overrideTemplate(CareerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CareerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CareerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Career('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.career = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Career();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.career = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
