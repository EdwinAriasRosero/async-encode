import { TestBed } from '@angular/core/testing';

import { Base64ConverterService } from './conversion.service';

describe('ConversionService', () => {
  let service: Base64ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
