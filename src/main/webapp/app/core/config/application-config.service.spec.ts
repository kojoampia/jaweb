import { TestBed } from '@angular/core/testing';

import { ApplicationConfigService } from './application-config.service';

describe('ApplicationConfigService', () => {
  let service: ApplicationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('without prefix', () => {
    it('should return correctly', () => {
      expect(service.getEndpointFor('api')).toEqual('/api');
    });

    it('should return correctly when passing microservice', () => {
      expect(service.getEndpointFor('api', 'microservice')).toEqual('/services/microservice/api');
    });
  });

  describe('with prefix', () => {
    beforeEach(() => {
      service.setEndpointPrefix('prefix/');
    });

    it('should return correctly', () => {
      expect(service.getEndpointFor('api')).toEqual('prefix/api');
    });

    it('should return correctly when passing microservice', () => {
      expect(service.getEndpointFor('api', 'microservice')).toEqual('prefix/services/microservice/api');
    });
  });

  describe('with URL prefix without trailing slash', () => {
    beforeEach(() => {
      service.setEndpointPrefix('http://localhost:1980');
    });

    it('should normalize the separator', () => {
      expect(service.getEndpointFor('management/info')).toEqual('http://localhost:1980/management/info');
    });
  });
});
