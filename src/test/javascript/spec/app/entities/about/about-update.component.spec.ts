/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { AboutUpdateComponent } from 'app/entities/about/about-update.component';
import { AboutService } from 'app/entities/about/about.service';
import { About } from 'app/shared/model/about.model';

describe('Component Tests', () => {
    describe('About Management Update Component', () => {
        let comp: AboutUpdateComponent;
        let fixture: ComponentFixture<AboutUpdateComponent>;
        let service: AboutService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [AboutUpdateComponent]
            })
                .overrideTemplate(AboutUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AboutUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AboutService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new About('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.about = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new About();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.about = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
