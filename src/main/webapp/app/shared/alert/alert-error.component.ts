import { Component, inject, OnDestroy, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { Alert, AlertService } from 'app/core/services/alert.service';
import { EventManagerService as EventManager } from 'app/core/services/event-manager.service';
import { AlertError } from './alert-error.model';

@Component({
  standalone: true,
  selector: 'jhi-alert-error',
  templateUrl: './alert-error.component.html',
  imports: [CommonModule, NgbModule],
})
export class AlertErrorComponent implements OnDestroy {
  alerts = signal<Alert[]>([]);
  errorListener: Subscription;
  httpErrorListener: Subscription;

  private alertService = inject(AlertService);
  private eventManager = inject(EventManager);

  private translateService = inject(TranslateService);

  constructor() {
    this.errorListener = this.eventManager.subscribe('jojoaddisonApp.error', (errorResponse: AlertError) => {
      this.addErrorAlert(errorResponse.message, errorResponse.key, errorResponse.params);
    });

    this.httpErrorListener = this.eventManager.subscribe('jojoaddisonApp.httpError', (httpErrorResponse: HttpErrorResponse) => {
      this.handleHttpError(httpErrorResponse);
    });
  }

  setClasses(alert: Alert): { [key: string]: boolean } {
    const classes = { 'jhi-toast': Boolean(alert.toast) };
    if (alert.position) {
      return { ...classes, [alert.position]: true };
    }
    return classes;
  }

  ngOnDestroy(): void {
    if (this.errorListener) {
        this.errorListener.unsubscribe();
    }
    if (this.httpErrorListener) {
        this.httpErrorListener.unsubscribe();
    }
  }

  close(alert: Alert): void {
    alert.close?.(this.alerts());
  }

  private addErrorAlert(message?: string, translationKey?: string, translationParams?: { [key: string]: unknown }): void {
    this.alertService.addAlert({ type: 'danger', message, translationKey, translationParams }, this.alerts());
  }

  private handleHttpError(httpErrorResponse: HttpErrorResponse): void {
    switch (httpErrorResponse.status) {
      // connection refused, server not reachable
      case 0:
        this.addErrorAlert('Server not reachable', 'error.server.not.reachable');
        break;

      case 400: {
        this.handleBadRequest(httpErrorResponse);
        break;
      }

      case 404:
        this.addErrorAlert('Not found', 'error.url.not.found');
        break;

      default:
        this.handleDefaultError(httpErrorResponse);
    }
  }

  private handleBadRequest(httpErrorResponse: HttpErrorResponse): void {
    const arr = httpErrorResponse.headers.keys();
    let errorHeader: string | null = null;
    let entityKey: string | null = null;
    for (const entry of arr) {
      if (entry.toLowerCase().endsWith('app-error')) {
        errorHeader = httpErrorResponse.headers.get(entry);
      } else if (entry.toLowerCase().endsWith('app-params')) {
        entityKey = httpErrorResponse.headers.get(entry);
      }
    }
    if (errorHeader) {
      const alertData = entityKey ? { entityName: this.translateService.instant(`global.menu.entities.${entityKey}`) } : undefined;
      this.addErrorAlert(errorHeader, errorHeader, alertData);
    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
      this.handleFieldsError(httpErrorResponse);
    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
      this.addErrorAlert(
        httpErrorResponse.error.detail ?? httpErrorResponse.error.message,
        httpErrorResponse.error.message,
        httpErrorResponse.error.params,
      );
    } else {
      this.addErrorAlert(httpErrorResponse.error, httpErrorResponse.error);
    }
  }

  private handleDefaultError(httpErrorResponse: HttpErrorResponse): void {
    if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
      this.addErrorAlert(
        httpErrorResponse.error.detail ?? httpErrorResponse.error.message,
        httpErrorResponse.error.message,
        httpErrorResponse.error.params,
      );
    } else {
      this.addErrorAlert(httpErrorResponse.error, httpErrorResponse.error);
    }
  }

  private handleFieldsError(httpErrorResponse: HttpErrorResponse): void {
    const fieldErrors = httpErrorResponse.error.fieldErrors;
    for (const fieldError of fieldErrors) {
      if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
        fieldError.message = 'Size';
      }
      // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
      const convertedField: string = fieldError.field.replace(/\[\d*\]/g, '[]');
      const fieldName: string = this.translateService.instant(`jojoaddisonApp.${fieldError.objectName as string}.${convertedField}`);
      this.addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message as string}`, { fieldName });
    }
  }
}
