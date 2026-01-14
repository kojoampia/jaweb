import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { CareerService } from '../service/career.service';
import { ICareer } from '../career.model';
import { CareerFormService, CareerFormGroup } from './career-form.service';

@Component({
  standalone: true,
  selector: 'jhi-career-update',
  templateUrl: './career-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CareerUpdateComponent implements OnInit {
  isSaving = false;
  career: ICareer | null = null;

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected careerService = inject(CareerService);
  protected careerFormService = inject(CareerFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CareerFormGroup = this.careerFormService.createCareerFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ career }) => {
      this.career = career;
      if (career) {
        this.updateForm(career);
      }
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const career = this.careerFormService.getCareer(this.editForm);
    if (career.id !== null) {
      this.subscribeToSaveResponse(this.careerService.update(career));
    } else {
      this.subscribeToSaveResponse(this.careerService.create(career));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICareer>>): void {
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

  protected updateForm(career: ICareer): void {
    this.career = career;
    this.careerFormService.resetForm(this.editForm, career);
  }
}
