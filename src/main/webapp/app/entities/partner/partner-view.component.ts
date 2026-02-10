import { Component, Input, OnInit } from '@angular/core';
import { IPartner } from 'app/shared/model/partner.model';
import { PartnerService } from './partner.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'jhi-partner-view',
  templateUrl: './partner-view.component.html',
  imports: [CommonModule, RouterModule],
  styles: [],
})
export class PartnerViewComponent implements OnInit {
  @Input() partners: IPartner[] = [];

  constructor(private partnerService: PartnerService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    if (!this.partners || this.partners.length === 0) {
      this.partnerService.query({}).subscribe((res: any) => {
        this.partners = res.body;
      });
    }
  }

  sanitize(data: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(data);
  }
}
