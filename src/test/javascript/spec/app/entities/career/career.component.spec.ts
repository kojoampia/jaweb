/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JojoaddisonTestModule } from '../../../test.module';
import { CareerComponent } from 'app/entities/career/career.component';
import { CareerService } from 'app/entities/career/career.service';
import { Career } from 'app/shared/model/career.model';

describe('Component Tests', () => {
    describe('Career Management Component', () => {
        let comp: CareerComponent;
        let fixture: ComponentFixture<CareerComponent>;
        let service: CareerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [CareerComponent],
                providers: []
            })
                .overrideTemplate(CareerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CareerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CareerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Career('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.careers[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
