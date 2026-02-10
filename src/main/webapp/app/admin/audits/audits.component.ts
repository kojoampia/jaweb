import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { DatePipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParseLinksService, AlertService } from 'app/core/services';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ITEMS_PER_PAGE } from 'app/shared';
import { Audit } from './audit.model';
import { AuditsService } from './audits.service';

@Component({
    selector: 'jhi-audit',
    templateUrl: './audits.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule],
    providers: [DatePipe]
})
export class AuditsComponent implements OnInit, OnDestroy {
    private auditsService = inject(AuditsService);
    private alertService = inject(AlertService);
    private parseLinks = inject(ParseLinksService);
    private activatedRoute = inject(ActivatedRoute);
    private datePipe = inject(DatePipe);
    private router = inject(Router);

    audits = signal<Audit[]>([]);
    fromDate = signal<string>('');
    itemsPerPage = ITEMS_PER_PAGE;
    links = signal<any>({});
    page = signal(1);
    routeData: any;
    predicate = signal<string>('id');
    previousPage = signal<number>(1);
    reverse = signal(false);
    toDate = signal<string>('');
    totalItems = signal(0);

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page.set(data['pagingParams'].page);
            this.previousPage.set(data['pagingParams'].page);
            this.reverse.set(data['pagingParams'].ascending);
            this.predicate.set(data['pagingParams'].predicate);
        });
        this.today();
        this.previousMonth();
        this.loadAll();
    }

    ngOnDestroy() {
        if (this.routeData) {
            this.routeData.unsubscribe();
        }
    }

    previousMonth() {
        const dateFormat = 'yyyy-MM-dd';
        let fromDate: Date = new Date();

        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }

        this.fromDate.set(this.datePipe.transform(fromDate, dateFormat) || '');
    }

    today() {
        const dateFormat = 'yyyy-MM-dd';
        // Today + 1 day - needed if the current day must be included
        const today: Date = new Date();
        today.setDate(today.getDate() + 1);
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate.set(this.datePipe.transform(date, dateFormat) || '');
    }

    loadAll() {
        this.auditsService
            .query({
                page: this.page() - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                fromDate: this.fromDate(),
                toDate: this.toDate()
            })
            .subscribe({
                next: (res: HttpResponse<Audit[]>) => this.onSuccess(res.body, res.headers),
                error: (res: HttpResponse<any>) => this.onError(res.body)
            });
    }

    sort() {
        const result = [this.predicate() + ',' + (this.reverse() ? 'asc' : 'desc')];
        if (this.predicate() !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage()) {
            this.previousPage.set(page);
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/admin/audits'], {
            queryParams: {
                page: this.page(),
                sort: this.predicate() + ',' + (this.reverse() ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    private onSuccess(data: Audit[] | null, headers: any) {
        this.links.set(this.parseLinks.parseLinks(headers.get('link')));
        this.totalItems.set(parseInt(headers.get('X-Total-Count'), 10));
        this.audits.set(data || []);
    }

    private onError(error: any) {
        this.alertService.error(error?.error || 'Error', error?.message || 'An error occurred');
    }
}
