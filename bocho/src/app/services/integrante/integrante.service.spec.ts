import { TestBed } from '@angular/core/testing';

import { IntegranteService } from './integrante.service';

describe('IntegranteService', () => {
  let service: IntegranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
