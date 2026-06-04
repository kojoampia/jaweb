import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IImprint } from '../imprint.model';

@Component({
  standalone: true,
  selector: 'jhi-imprint-detail',
  templateUrl: './imprint-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class ImprintDetailComponent {
  imprint = input<IImprint | null>(null);

  previousState(): void {
    window.history.back();
  }
}
