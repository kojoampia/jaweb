import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICareer } from '../career.model';
import { CareerService } from '../service/career.service';

@Component({
  standalone: true,
  templateUrl: './career-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CareerDeleteDialogComponent {
  career?: ICareer;

  protected careerService = inject(CareerService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.careerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
