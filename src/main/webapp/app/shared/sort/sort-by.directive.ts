import { AfterContentInit, ContentChild, Directive, Host, HostListener, Input, effect } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { SortDirective } from './sort.directive';

@Directive({
  standalone: true,
  selector: '[jhiSortBy]',
})
export class SortByDirective implements AfterContentInit {
  @Input() jhiSortBy!: string;

  @ContentChild(FaIconComponent, { static: false })
  iconComponent?: FaIconComponent;

  protected sortIcon = faSort;
  protected sortAscIcon = faSortUp;
  protected sortDescIcon = faSortDown;

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

    let icon: IconDefinition = this.sortIcon;
    if (predicate === this.jhiSortBy && order !== undefined) {
      icon = order === 'asc' ? this.sortAscIcon : this.sortDescIcon;
    }

    this.iconComponent.icon = icon.iconName;
    this.iconComponent.render();
  }
}
