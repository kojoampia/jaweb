import { Injectable } from '@angular/core';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
  id?: number;
  type: AlertType;
  message?: string;
  translationKey?: string;
  translationParams?: { [key: string]: unknown };
  timeout?: number;
  toast?: boolean;
  position?: string;
  close?: (alerts: Alert[]) => void;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alerts: Alert[] = [];

  addAlert(alert: Alert): void {
    this.alerts.push(alert);
  }

  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  clear(): void {
    this.alerts = [];
  }

  success(message: string): void {
    this.addAlert({ type: 'success', message });
  }

  error(message: string): void {
    this.addAlert({ type: 'danger', message });
  }

  warning(message: string): void {
    this.addAlert({ type: 'warning', message });
  }

  info(message: string): void {
    this.addAlert({ type: 'info', message });
  }
}
