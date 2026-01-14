import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAbout } from 'app/entities/about/about.model';
import { AboutService } from 'app/entities/about/service/about.service';
import { IBlog } from 'app/entities/blog/blog.model';
import { BlogService } from 'app/entities/blog/service/blog.service';
import { ISlide } from '../slide.model';
import { SlideService } from '../service/slide.service';
import { SlideFormService } from './slide-form.service';

import { SlideUpdateComponent } from './slide-update.component';

describe('Slide Management Update Component', () => {
  let comp: SlideUpdateComponent;
  let fixture: ComponentFixture<SlideUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let slideFormService: SlideFormService;
  let slideService: SlideService;
  let aboutService: AboutService;
  let blogService: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SlideUpdateComponent],
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
      .overrideTemplate(SlideUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SlideUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    slideFormService = TestBed.inject(SlideFormService);
    slideService = TestBed.inject(SlideService);
    aboutService = TestBed.inject(AboutService);
    blogService = TestBed.inject(BlogService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call About query and add missing value', () => {
      const slide: ISlide = { id: 'CBA' };
      const about: IAbout = { id: '186ee66e-26d5-4404-8f33-2afeec4f2308' };
      slide.about = about;

      const aboutCollection: IAbout[] = [{ id: '7e088850-c1b9-4d6e-98a2-463fda89050c' }];
      jest.spyOn(aboutService, 'query').mockReturnValue(of(new HttpResponse({ body: aboutCollection })));
      const additionalAbouts = [about];
      const expectedCollection: IAbout[] = [...additionalAbouts, ...aboutCollection];
      jest.spyOn(aboutService, 'addAboutToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ slide });
      comp.ngOnInit();

      expect(aboutService.query).toHaveBeenCalled();
      expect(aboutService.addAboutToCollectionIfMissing).toHaveBeenCalledWith(
        aboutCollection,
        ...additionalAbouts.map(expect.objectContaining),
      );
      expect(comp.aboutsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Blog query and add missing value', () => {
      const slide: ISlide = { id: 'CBA' };
      const blog: IBlog = { id: '7eff7692-44fb-42ab-be60-fb9f1c48b88c' };
      slide.blog = blog;

      const blogCollection: IBlog[] = [{ id: '2a4a7a57-0cd1-4e91-ada5-ec7a36b24789' }];
      jest.spyOn(blogService, 'query').mockReturnValue(of(new HttpResponse({ body: blogCollection })));
      const additionalBlogs = [blog];
      const expectedCollection: IBlog[] = [...additionalBlogs, ...blogCollection];
      jest.spyOn(blogService, 'addBlogToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ slide });
      comp.ngOnInit();

      expect(blogService.query).toHaveBeenCalled();
      expect(blogService.addBlogToCollectionIfMissing).toHaveBeenCalledWith(
        blogCollection,
        ...additionalBlogs.map(expect.objectContaining),
      );
      expect(comp.blogsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const slide: ISlide = { id: 'CBA' };
      const about: IAbout = { id: '3abc49f3-19f6-490b-9b04-07c9459bcf70' };
      slide.about = about;
      const blog: IBlog = { id: 'b9c2533e-aedf-48a8-bb4a-815f74a41bb6' };
      slide.blog = blog;

      activatedRoute.data = of({ slide });
      comp.ngOnInit();

      expect(comp.aboutsSharedCollection).toContain(about);
      expect(comp.blogsSharedCollection).toContain(blog);
      expect(comp.slide).toEqual(slide);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISlide>>();
      const slide = { id: 'ABC' };
      jest.spyOn(slideFormService, 'getSlide').mockReturnValue(slide);
      jest.spyOn(slideService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ slide });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: slide }));
      saveSubject.complete();

      // THEN
      expect(slideFormService.getSlide).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(slideService.update).toHaveBeenCalledWith(expect.objectContaining(slide));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISlide>>();
      const slide = { id: 'ABC' };
      jest.spyOn(slideFormService, 'getSlide').mockReturnValue({ id: null });
      jest.spyOn(slideService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ slide: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: slide }));
      saveSubject.complete();

      // THEN
      expect(slideFormService.getSlide).toHaveBeenCalled();
      expect(slideService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISlide>>();
      const slide = { id: 'ABC' };
      jest.spyOn(slideService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ slide });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(slideService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAbout', () => {
      it('Should forward to aboutService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(aboutService, 'compareAbout');
        comp.compareAbout(entity, entity2);
        expect(aboutService.compareAbout).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBlog', () => {
      it('Should forward to blogService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(blogService, 'compareBlog');
        comp.compareBlog(entity, entity2);
        expect(blogService.compareBlog).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
