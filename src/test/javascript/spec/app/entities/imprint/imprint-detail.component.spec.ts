/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { ImprintDetailComponent } from 'app/entities/imprint/imprint-detail.component';
import { Imprint } from 'app/shared/model/imprint.model';

describe('Component Tests', () => {
    describe('Imprint Management Detail Component', () => {
        let comp: ImprintDetailComponent;
        let fixture: ComponentFixture<ImprintDetailComponent>;
        const route = ({ data: of({ imprint: new Imprint('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [ImprintDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImprintDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImprintDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.imprint).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
