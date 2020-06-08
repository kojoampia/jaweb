/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JojoaddisonTestModule } from '../../../test.module';
import { CareerDeleteDialogComponent } from 'app/entities/career/career-delete-dialog.component';
import { CareerService } from 'app/entities/career/career.service';

describe('Component Tests', () => {
    describe('Career Management Delete Component', () => {
        let comp: CareerDeleteDialogComponent;
        let fixture: ComponentFixture<CareerDeleteDialogComponent>;
        let service: CareerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [CareerDeleteDialogComponent]
            })
                .overrideTemplate(CareerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CareerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CareerService);
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
