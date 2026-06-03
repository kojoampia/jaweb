import { getTestBed } from '@angular/core/testing';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import './jest-global-mocks';

const testBed = getTestBed() as ReturnType<typeof getTestBed> & { platform?: unknown };

if (!testBed.platform) {
  setupZoneTestEnv();
}
