import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/alert/alert-error.component';
import { JhiIconComponent } from 'app/shared/icon/icon.component';

@Component({
    selector: 'jhi-messenger',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, JhiIconComponent, AlertErrorComponent]
})
export class MessengerComponent implements OnInit {
    @Input() message: Messenger = new Messenger();
    @Output() onMessage: EventEmitter<any> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Input() isSending = false;
    @Input() isVisible = false;
    isReady = false;

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            this.isReady = true;
        }, 50);
    }

    setContentChanged(data: string): void {
        this.message.content = data;
    }

    toggleView() {
        this.isVisible = !this.isVisible;
    }

    sendMessage() {
        this.isSending = true;
        this.onMessage.emit(this.message);
    }

    close() {
        this.onClose.emit({ action: 'close' });
    }
}

export class Messenger {
    public id: string = '';
    public senderName: string = '';
    public senderEmail: string = '';
    public title: string = '';
    public content: string = '';
    constructor() {}
}
