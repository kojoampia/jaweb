import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { DataUtilsService as DataUtils } from 'app/core/services/data-utils.service';
import { IStaff } from '../staff.model';

@Component({
  standalone: true,
  selector: 'jhi-staff-detail',
  templateUrl: './staff-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StaffDetailComponent {
  staff = input<IStaff | null>(null);

  protected dataUtils = inject(DataUtils);

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
