import { Component } from '@angular/core';
import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
import { CommonModule } from '@angular/common';

dayjs.extend(utc);

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  footerDate = dayjs.utc();
}
