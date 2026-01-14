import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IImprint } from '../imprint.model';
import { ImprintService } from '../service/imprint.service';

@Component({
  standalone: true,
  templateUrl: './imprint-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ImprintDeleteDialogComponent {
  imprint?: IImprint;

  protected imprintService = inject(ImprintService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.imprintService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
