/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JojoaddisonTestModule } from '../../../test.module';
import { HomeDeleteDialogComponent } from 'app/entities/home/home-delete-dialog.component';
import { HomeService } from 'app/entities/home/home.service';

describe('Component Tests', () => {
    describe('Home Management Delete Component', () => {
        let comp: HomeDeleteDialogComponent;
        let fixture: ComponentFixture<HomeDeleteDialogComponent>;
        let service: HomeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [HomeDeleteDialogComponent]
            })
                .overrideTemplate(HomeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HomeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HomeService);
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
