/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JojoaddisonTestModule } from '../../../test.module';
import { ContactMessageDetailComponent } from 'app/entities/contact-message/contact-message-detail.component';
import { ContactMessage } from 'app/shared/model/contact-message.model';

describe('Component Tests', () => {
    describe('ContactMessage Management Detail Component', () => {
        let comp: ContactMessageDetailComponent;
        let fixture: ComponentFixture<ContactMessageDetailComponent>;
        const route = ({ data: of({ contactMessage: new ContactMessage('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JojoaddisonTestModule],
                declarations: [ContactMessageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContactMessageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactMessageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contactMessage).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
