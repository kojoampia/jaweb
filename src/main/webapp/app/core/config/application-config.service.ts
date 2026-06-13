import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigService {
  private endpointPrefix = '';
  private microfrontend = false;

  setEndpointPrefix(endpointPrefix: string): void {
    this.endpointPrefix = endpointPrefix;
  }

  setMicrofrontend(microfrontend = true): void {
    this.microfrontend = microfrontend;
  }

  isMicrofrontend(): boolean {
    return this.microfrontend;
  }

  getEndpointFor(api: string, microservice?: string): string {
    const path = microservice ? `services/${microservice}/${api}` : api;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

    if (!this.endpointPrefix) {
      return `/${normalizedPath}`;
    }

    const normalizedPrefix = this.endpointPrefix.endsWith('/') ? this.endpointPrefix.slice(0, -1) : this.endpointPrefix;

    return `${normalizedPrefix}/${normalizedPath}`;
  }
}
