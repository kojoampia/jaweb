import { Component, inject, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IAbout } from 'app/entities/about/about.model';
import { AboutService } from 'app/entities/about/service/about.service';
import { IBlog } from 'app/entities/blog/blog.model';
import { BlogService } from 'app/entities/blog/service/blog.service';
import { SlideService } from '../service/slide.service';
import { ISlide } from '../slide.model';
import { SlideFormService, SlideFormGroup } from './slide-form.service';

@Component({
  standalone: true,
  selector: 'jhi-slide-update',
  templateUrl: './slide-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SlideUpdateComponent implements OnInit {
  isSaving = false;
  slide: ISlide | null = null;

  aboutsSharedCollection: IAbout[] = [];
  blogsSharedCollection: IBlog[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected slideService = inject(SlideService);
  protected slideFormService = inject(SlideFormService);
  protected aboutService = inject(AboutService);
  protected blogService = inject(BlogService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SlideFormGroup = this.slideFormService.createSlideFormGroup();

  compareAbout = (o1: IAbout | null, o2: IAbout | null): boolean => this.aboutService.compareAbout(o1, o2);

  compareBlog = (o1: IBlog | null, o2: IBlog | null): boolean => this.blogService.compareBlog(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slide }) => {
      this.slide = slide;
      if (slide) {
        this.updateForm(slide);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('jojoaddisonApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const slide = this.slideFormService.getSlide(this.editForm);
    if (slide.id !== null) {
      this.subscribeToSaveResponse(this.slideService.update(slide));
    } else {
      this.subscribeToSaveResponse(this.slideService.create(slide));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlide>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(slide: ISlide): void {
    this.slide = slide;
    this.slideFormService.resetForm(this.editForm, slide);

    this.aboutsSharedCollection = this.aboutService.addAboutToCollectionIfMissing<IAbout>(this.aboutsSharedCollection, slide.about);
    this.blogsSharedCollection = this.blogService.addBlogToCollectionIfMissing<IBlog>(this.blogsSharedCollection, slide.blog);
  }

  protected loadRelationshipsOptions(): void {
    this.aboutService
      .query()
      .pipe(map((res: HttpResponse<IAbout[]>) => res.body ?? []))
      .pipe(map((abouts: IAbout[]) => this.aboutService.addAboutToCollectionIfMissing<IAbout>(abouts, this.slide?.about)))
      .subscribe((abouts: IAbout[]) => (this.aboutsSharedCollection = abouts));

    this.blogService
      .query()
      .pipe(map((res: HttpResponse<IBlog[]>) => res.body ?? []))
      .pipe(map((blogs: IBlog[]) => this.blogService.addBlogToCollectionIfMissing<IBlog>(blogs, this.slide?.blog)))
      .subscribe((blogs: IBlog[]) => (this.blogsSharedCollection = blogs));
  }
}
