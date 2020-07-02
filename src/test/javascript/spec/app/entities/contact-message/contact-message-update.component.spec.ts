/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { ContactMessageUpdateComponent } from 'app/entities/contact-message/contact-message-update.component';
import { ContactMessageService } from 'app/entities/contact-message/contact-message.service';
import { ContactMessage } from 'app/shared/model/contact-message.model';

describe('Component Tests', () => {
    describe('ContactMessage Management Update Component', () => {
        let comp: ContactMessageUpdateComponent;
        let fixture: ComponentFixture<ContactMessageUpdateComponent>;
        let service: ContactMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [ContactMessageUpdateComponent]
            })
                .overrideTemplate(ContactMessageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactMessageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMessageService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ContactMessage('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.contactMessage = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ContactMessage();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.contactMessage = entity;
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
