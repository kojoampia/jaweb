import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IImprint } from '../imprint.model';
import { ImprintService } from '../service/imprint.service';
import { ImprintFormService, ImprintFormGroup } from './imprint-form.service';

@Component({
  standalone: true,
  selector: 'jhi-imprint-update',
  templateUrl: './imprint-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ImprintUpdateComponent implements OnInit {
  isSaving = false;
  imprint: IImprint | null = null;

  protected imprintService = inject(ImprintService);
  protected imprintFormService = inject(ImprintFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ImprintFormGroup = this.imprintFormService.createImprintFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imprint }) => {
      this.imprint = imprint;
      if (imprint) {
        this.updateForm(imprint);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const imprint = this.imprintFormService.getImprint(this.editForm);
    if (imprint.id !== null) {
      this.subscribeToSaveResponse(this.imprintService.update(imprint));
    } else {
      this.subscribeToSaveResponse(this.imprintService.create(imprint));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImprint>>): void {
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

  protected updateForm(imprint: IImprint): void {
    this.imprint = imprint;
    this.imprintFormService.resetForm(this.editForm, imprint);
  }
}
