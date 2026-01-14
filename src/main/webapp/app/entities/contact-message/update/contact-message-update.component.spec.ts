import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ContactMessageService } from '../service/contact-message.service';
import { IContactMessage } from '../contact-message.model';
import { ContactMessageFormService } from './contact-message-form.service';

import { ContactMessageUpdateComponent } from './contact-message-update.component';

describe('ContactMessage Management Update Component', () => {
  let comp: ContactMessageUpdateComponent;
  let fixture: ComponentFixture<ContactMessageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contactMessageFormService: ContactMessageFormService;
  let contactMessageService: ContactMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ContactMessageUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ContactMessageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContactMessageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contactMessageFormService = TestBed.inject(ContactMessageFormService);
    contactMessageService = TestBed.inject(ContactMessageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ContactMessage query and add missing value', () => {
      const contactMessage: IContactMessage = { id: 'CBA' };
      const contact: IContactMessage = { id: 'ef6d428a-dcfe-4445-a910-391ec97fe055' };
      contactMessage.contact = contact;

      const contactMessageCollection: IContactMessage[] = [{ id: 'e882a7c4-0042-4660-b4d3-4cd13a773c71' }];
      jest.spyOn(contactMessageService, 'query').mockReturnValue(of(new HttpResponse({ body: contactMessageCollection })));
      const additionalContactMessages = [contact];
      const expectedCollection: IContactMessage[] = [...additionalContactMessages, ...contactMessageCollection];
      jest.spyOn(contactMessageService, 'addContactMessageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contactMessage });
      comp.ngOnInit();

      expect(contactMessageService.query).toHaveBeenCalled();
      expect(contactMessageService.addContactMessageToCollectionIfMissing).toHaveBeenCalledWith(
        contactMessageCollection,
        ...additionalContactMessages.map(expect.objectContaining),
      );
      expect(comp.contactMessagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const contactMessage: IContactMessage = { id: 'CBA' };
      const contact: IContactMessage = { id: '2d420edd-4afc-481d-a83f-57287cff6f30' };
      contactMessage.contact = contact;

      activatedRoute.data = of({ contactMessage });
      comp.ngOnInit();

      expect(comp.contactMessagesSharedCollection).toContain(contact);
      expect(comp.contactMessage).toEqual(contactMessage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactMessage>>();
      const contactMessage = { id: 'ABC' };
      jest.spyOn(contactMessageFormService, 'getContactMessage').mockReturnValue(contactMessage);
      jest.spyOn(contactMessageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactMessage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contactMessage }));
      saveSubject.complete();

      // THEN
      expect(contactMessageFormService.getContactMessage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contactMessageService.update).toHaveBeenCalledWith(expect.objectContaining(contactMessage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactMessage>>();
      const contactMessage = { id: 'ABC' };
      jest.spyOn(contactMessageFormService, 'getContactMessage').mockReturnValue({ id: null });
      jest.spyOn(contactMessageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactMessage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contactMessage }));
      saveSubject.complete();

      // THEN
      expect(contactMessageFormService.getContactMessage).toHaveBeenCalled();
      expect(contactMessageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactMessage>>();
      const contactMessage = { id: 'ABC' };
      jest.spyOn(contactMessageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactMessage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contactMessageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareContactMessage', () => {
      it('Should forward to contactMessageService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(contactMessageService, 'compareContactMessage');
        comp.compareContactMessage(entity, entity2);
        expect(contactMessageService.compareContactMessage).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
