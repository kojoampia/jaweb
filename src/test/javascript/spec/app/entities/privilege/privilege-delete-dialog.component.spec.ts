/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JojoaddisonTestModule } from '../../../test.module';
import { PrivilegeDeleteDialogComponent } from 'app/entities/privilege/privilege-delete-dialog.component';
import { PrivilegeService } from 'app/entities/privilege/privilege.service';

describe('Component Tests', () => {
    describe('Privilege Management Delete Component', () => {
        let comp: PrivilegeDeleteDialogComponent;
        let fixture: ComponentFixture<PrivilegeDeleteDialogComponent>;
        let service: PrivilegeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [PrivilegeDeleteDialogComponent]
            })
                .overrideTemplate(PrivilegeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrivilegeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrivilegeService);
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
