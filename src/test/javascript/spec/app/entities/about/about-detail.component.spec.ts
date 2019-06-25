/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { AboutDetailComponent } from 'app/entities/about/about-detail.component';
import { About } from 'app/shared/model/about.model';

describe('Component Tests', () => {
    describe('About Management Detail Component', () => {
        let comp: AboutDetailComponent;
        let fixture: ComponentFixture<AboutDetailComponent>;
        const route = ({ data: of({ about: new About('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [AboutDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AboutDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AboutDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.about).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
