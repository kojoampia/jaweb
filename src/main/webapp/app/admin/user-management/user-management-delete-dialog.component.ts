import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, EventWithContent } from 'app/core/services/event-manager.service';

import { User, UserService } from 'app/core';

@Component({
    selector: 'jhi-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent {
    user: User | undefined;

    constructor(private userService: UserService, public activeModal: NgbActiveModal, private eventManager: EventManager) {}

    clear(): void {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login: string): void {
        this.userService.delete(login).subscribe(response => {
            this.eventManager.broadcast(new EventWithContent('userListModification', 'Deleted a user'));
            this.activeModal.dismiss(true);
        });
    }
}
