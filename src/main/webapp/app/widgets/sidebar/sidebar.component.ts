import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() items: any[];
    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
    sidebarItems: SidebarItem[];
    @LocalStorage() isSidebarCollapsed: boolean;
    @LocalStorage() isHideSidebar: boolean;
    @LocalStorage() sidebarItem: SidebarItem;
    @Input() title: string;

    constructor() {}

    ngOnInit() {
        // console.log('sidebar::>> items');
        // console.log(this.items);
        if (this.items) {
            this.sidebarItems = [];
            this.items.forEach(item => {
                if (item.hasOwnProperty('key') && item.hasOwnProperty('value')) {
                    this.sidebarItems.push(new SidebarItem(item.key, item.value));
                }
            });
        }
    }

    toggleSidebarCollapse() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    toggleHideSidebar() {
        this.isHideSidebar = !this.isHideSidebar;
    }

    onClick(item: any) {
        // console.log('item-selected');
        // console.log(item);
        this.sidebarItem = Object.assign({}, item);
        this.itemSelected.emit(item);
    }

    highlightSelected(item: any): boolean {
        // console.log('sidebar::>>highlight');
        // console.log(this.sidebarItem);
        if (!this.sidebarItem) {
            return false;
        }
        return this.sidebarItem.key === item.key;
    }
}

export class SidebarItem {
    constructor(public key: string, public label: string) {}
}
