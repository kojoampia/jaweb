import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const ICON_MAP: Record<string, string> = {
  asterisk: 'asterisk',
  at: 'alternate_email',
  'arrow-circle-left': 'arrow_circle_left',
  'arrow-circle-right': 'arrow_circle_right',
  'arrow-left': 'arrow_back',
  ban: 'block',
  bars: 'menu',
  bell: 'notifications',
  blog: 'article',
  book: 'menu_book',
  briefcase: 'work',
  'calendar-alt': 'calendar_month',
  camera: 'photo_camera',
  'check-circle': 'check_circle',
  'check-square': 'check_box',
  clock: 'schedule',
  close: 'close',
  cogs: 'settings',
  edit: 'edit',
  eye: 'visibility',
  gavel: 'gavel',
  'hand-holding-heart': 'volunteer_activism',
  handshake: 'handshake',
  heart: 'favorite',
  home: 'home',
  info: 'info',
  'info-circle': 'info',
  list: 'list',
  'pencil-alt': 'edit',
  phone: 'call',
  plus: 'add',
  retweet: 'repeat',
  save: 'save',
  search: 'search',
  send: 'send',
  'sign-in-alt': 'login',
  'sign-out-alt': 'logout',
  sort: 'swap_vert',
  sync: 'refresh',
  'tachometer-alt': 'speed',
  tasks: 'task_alt',
  'thumbs-up': 'thumb_up',
  times: 'close',
  tools: 'build',
  'trash-alt': 'delete',
  user: 'person',
  'user-friends': 'groups',
  'user-plus': 'person_add',
  'user-tie': 'badge',
  users: 'groups',
  wrench: 'handyman',
};

@Component({
  selector: 'jhi-icon',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <mat-icon [class.icon-spin]="animation === 'spin'" [fontSet]="'material-symbols-outlined'">
      {{ resolvedIcon }}
    </mat-icon>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        color: currentColor;
        line-height: 1;
      }

      :host(.fixed-width) {
        width: 1.25rem;
      }

      mat-icon {
        width: 1.125rem;
        height: 1.125rem;
        font-size: 1.125rem;
        line-height: 1;
      }

      .icon-spin {
        animation: icon-spin 1s linear infinite;
      }

      @keyframes icon-spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JhiIconComponent {
  @Input() icon: string | [string, string] = 'help';
  @Input() fixedWidth = false;
  @Input() animation?: string;

  @HostBinding('class.fixed-width')
  get isFixedWidth(): boolean {
    return this.fixedWidth;
  }

  get resolvedIcon(): string {
    const iconName = Array.isArray(this.icon) ? this.icon[1] : this.icon;
    return ICON_MAP[iconName] ?? iconName;
  }
}
