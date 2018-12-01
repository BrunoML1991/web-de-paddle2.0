import { TestBed } from '@angular/core/testing';

import { ApiConexionService } from './api-conexion.service';

describe('ApiConexionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiConexionService = TestBed.get(ApiConexionService);
    expect(service).toBeTruthy();
  });
});
