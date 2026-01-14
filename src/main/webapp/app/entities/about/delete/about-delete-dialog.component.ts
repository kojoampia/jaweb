import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAbout } from '../about.model';
import { AboutService } from '../service/about.service';

@Component({
  standalone: true,
  templateUrl: './about-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AboutDeleteDialogComponent {
  about?: IAbout;

  protected aboutService = inject(AboutService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.aboutService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
