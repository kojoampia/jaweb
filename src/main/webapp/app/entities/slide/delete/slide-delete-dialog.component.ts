import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISlide } from '../slide.model';
import { SlideService } from '../service/slide.service';

@Component({
  standalone: true,
  templateUrl: './slide-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SlideDeleteDialogComponent {
  slide?: ISlide;

  protected slideService = inject(SlideService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.slideService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
