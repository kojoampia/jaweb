/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { InformationDetailComponent } from 'app/entities/information/information-detail.component';
import { Information } from 'app/shared/model/information.model';

describe('Component Tests', () => {
    describe('Information Management Detail Component', () => {
        let comp: InformationDetailComponent;
        let fixture: ComponentFixture<InformationDetailComponent>;
        const route = ({ data: of({ information: new Information('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [InformationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InformationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InformationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.information).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
