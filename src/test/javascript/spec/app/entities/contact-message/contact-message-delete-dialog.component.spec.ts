/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JojoaddisonTestModule } from '../../../test.module';
import { ContactMessageDeleteDialogComponent } from 'app/entities/contact-message/contact-message-delete-dialog.component';
import { ContactMessageService } from 'app/entities/contact-message/contact-message.service';

describe('Component Tests', () => {
    describe('ContactMessage Management Delete Component', () => {
        let comp: ContactMessageDeleteDialogComponent;
        let fixture: ComponentFixture<ContactMessageDeleteDialogComponent>;
        let service: ContactMessageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [ContactMessageDeleteDialogComponent]
            })
                .overrideTemplate(ContactMessageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactMessageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMessageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
