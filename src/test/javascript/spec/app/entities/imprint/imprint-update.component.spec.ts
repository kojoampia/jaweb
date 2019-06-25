/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { ImprintUpdateComponent } from 'app/entities/imprint/imprint-update.component';
import { ImprintService } from 'app/entities/imprint/imprint.service';
import { Imprint } from 'app/shared/model/imprint.model';

describe('Component Tests', () => {
    describe('Imprint Management Update Component', () => {
        let comp: ImprintUpdateComponent;
        let fixture: ComponentFixture<ImprintUpdateComponent>;
        let service: ImprintService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [ImprintUpdateComponent]
            })
                .overrideTemplate(ImprintUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImprintUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImprintService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Imprint('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imprint = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Imprint();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imprint = entity;
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
