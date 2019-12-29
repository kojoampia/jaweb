/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JojoaddisonTestModule } from '../../../test.module';
import { AboutDeleteDialogComponent } from 'app/entities/about/about-delete-dialog.component';
import { AboutService } from 'app/entities/about/about.service';

describe('Component Tests', () => {
    describe('About Management Delete Component', () => {
        let comp: AboutDeleteDialogComponent;
        let fixture: ComponentFixture<AboutDeleteDialogComponent>;
        let service: AboutService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [AboutDeleteDialogComponent]
            })
                .overrideTemplate(AboutDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AboutDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AboutService);
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
