import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IPrivilege } from '../privilege.model';

@Component({
  standalone: true,
  selector: 'jhi-privilege-detail',
  templateUrl: './privilege-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class PrivilegeDetailComponent {
  privilege = input<IPrivilege | null>(null);

  previousState(): void {
    window.history.back();
  }
}
