import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IContactMessage } from '../contact-message.model';

@Component({
  standalone: true,
  selector: 'jhi-contact-message-detail',
  templateUrl: './contact-message-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ContactMessageDetailComponent {
  contactMessage = input<IContactMessage | null>(null);

  previousState(): void {
    window.history.back();
  }
}
