/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JojoaddisonTestModule } from '../../../test.module';
import { HomeComponent } from 'app/entities/home/home.component';
import { HomeService } from 'app/entities/home/home.service';
import { Home } from 'app/shared/model/home.model';

describe('Component Tests', () => {
    describe('Home Management Component', () => {
        let comp: HomeComponent;
        let fixture: ComponentFixture<HomeComponent>;
        let service: HomeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [HomeComponent],
                providers: []
            })
                .overrideTemplate(HomeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HomeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HomeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Home('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.homes[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
