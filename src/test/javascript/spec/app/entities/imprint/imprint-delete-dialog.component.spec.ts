/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JojoaddisonTestModule } from '../../../test.module';
import { ImprintDeleteDialogComponent } from 'app/entities/imprint/imprint-delete-dialog.component';
import { ImprintService } from 'app/entities/imprint/imprint.service';

describe('Component Tests', () => {
    describe('Imprint Management Delete Component', () => {
        let comp: ImprintDeleteDialogComponent;
        let fixture: ComponentFixture<ImprintDeleteDialogComponent>;
        let service: ImprintService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [ImprintDeleteDialogComponent]
            })
                .overrideTemplate(ImprintDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImprintDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImprintService);
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
