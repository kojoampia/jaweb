import { AfterContentInit, ContentChild, Directive, Host, HostListener, Input, effect } from '@angular/core';
import { JhiIconComponent } from '../icon/icon.component';

import { SortDirective } from './sort.directive';

@Directive({
  standalone: true,
  selector: '[jhiSortBy]',
})
export class SortByDirective implements AfterContentInit {
  @Input() jhiSortBy!: string;

  @ContentChild(JhiIconComponent, { static: false })
  iconComponent?: JhiIconComponent;

  protected sortIcon = 'swap_vert';
  protected sortAscIcon = 'arrow_upward';
  protected sortDescIcon = 'arrow_downward';

  constructor(@Host() private sort: SortDirective) {
    effect(() => {
      this.updateIcon(this.sort.sortState().predicate, this.sort.sortState().order);
    });
  }

  ngAfterContentInit(): void {
    const { predicate, order } = this.sort.sortState();
    this.updateIcon(predicate, order);
  }

  @HostListener('click')
  onClick(): void {
    if (this.iconComponent) {
      this.sort.sort(this.jhiSortBy);
    }
  }

  private updateIcon(predicate?: string, order?: string): void {
    if (!this.iconComponent) {
      return;
    }

    let icon = this.sortIcon;
    if (predicate === this.jhiSortBy && order !== undefined) {
      icon = order === 'asc' ? this.sortAscIcon : this.sortDescIcon;
    }

    this.iconComponent.icon = icon;
  }
}
