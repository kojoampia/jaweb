import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'jhi-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() items: any[] = [];
    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
    sidebarItems: SidebarItem[] = [];
    isSidebarCollapsed: boolean = false;
    isHideSidebar: boolean = false;
    sidebarItem: SidebarItem | null = null;
    @Input() title: string = '';

    constructor() {}

    ngOnInit(): void {
        if (this.items && this.items.length > 0) {
            this.sidebarItems = [];
            this.items.forEach((item: any) => {
                if (item.hasOwnProperty('key') && item.hasOwnProperty('value')) {
                    this.sidebarItems.push(new SidebarItem(item.key, item.value));
                }
            });
        }
    }

    toggleSidebarCollapse(): void {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    toggleHideSidebar(): void {
        this.isHideSidebar = !this.isHideSidebar;
    }

    onClick(item: any): void {
        this.sidebarItem = Object.assign({}, item) as SidebarItem;
        this.itemSelected.emit(item);
    }

    highlightSelected(item: any): boolean {
        if (!this.sidebarItem) {
            return false;
        }
        return this.sidebarItem.key === item.key;
    }
}

export class SidebarItem {
    constructor(public key: string, public label: string) {}
}
