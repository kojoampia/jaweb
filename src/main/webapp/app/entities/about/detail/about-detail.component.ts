import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IAbout } from '../about.model';

@Component({
  standalone: true,
  selector: 'jhi-about-detail',
  templateUrl: './about-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class AboutDetailComponent {
  about = input<IAbout | null>(null);

  previousState(): void {
    window.history.back();
  }
}
