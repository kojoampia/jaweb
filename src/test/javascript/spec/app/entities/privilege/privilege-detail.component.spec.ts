/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { PrivilegeDetailComponent } from 'app/entities/privilege/privilege-detail.component';
import { Privilege } from 'app/shared/model/privilege.model';

describe('Component Tests', () => {
    describe('Privilege Management Detail Component', () => {
        let comp: PrivilegeDetailComponent;
        let fixture: ComponentFixture<PrivilegeDetailComponent>;
        const route = ({ data: of({ privilege: new Privilege('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [PrivilegeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrivilegeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrivilegeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.privilege).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
