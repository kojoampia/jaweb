/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JojoaddisonTestModule } from '../../../test.module';
import { PrivilegeComponent } from 'app/entities/privilege/privilege.component';
import { PrivilegeService } from 'app/entities/privilege/privilege.service';
import { Privilege } from 'app/shared/model/privilege.model';

describe('Component Tests', () => {
    describe('Privilege Management Component', () => {
        let comp: PrivilegeComponent;
        let fixture: ComponentFixture<PrivilegeComponent>;
        let service: PrivilegeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [PrivilegeComponent],
                providers: []
            })
                .overrideTemplate(PrivilegeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrivilegeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrivilegeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Privilege('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.privileges[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
