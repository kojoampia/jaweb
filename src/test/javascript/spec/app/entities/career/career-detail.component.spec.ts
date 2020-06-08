/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { CareerDetailComponent } from 'app/entities/career/career-detail.component';
import { Career } from 'app/shared/model/career.model';

describe('Component Tests', () => {
    describe('Career Management Detail Component', () => {
        let comp: CareerDetailComponent;
        let fixture: ComponentFixture<CareerDetailComponent>;
        const route = ({ data: of({ career: new Career('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [CareerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CareerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CareerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.career).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
