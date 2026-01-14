import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAbout } from '../about.model';
import { AboutService } from '../service/about.service';
import { AboutFormService, AboutFormGroup } from './about-form.service';

@Component({
  standalone: true,
  selector: 'jhi-about-update',
  templateUrl: './about-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AboutUpdateComponent implements OnInit {
  isSaving = false;
  about: IAbout | null = null;

  protected aboutService = inject(AboutService);
  protected aboutFormService = inject(AboutFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AboutFormGroup = this.aboutFormService.createAboutFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ about }) => {
      this.about = about;
      if (about) {
        this.updateForm(about);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const about = this.aboutFormService.getAbout(this.editForm);
    if (about.id !== null) {
      this.subscribeToSaveResponse(this.aboutService.update(about));
    } else {
      this.subscribeToSaveResponse(this.aboutService.create(about));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbout>>): void {
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

  protected updateForm(about: IAbout): void {
    this.about = about;
    this.aboutFormService.resetForm(this.editForm, about);
  }
}
