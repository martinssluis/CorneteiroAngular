import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listarAtletas chama GET /atletas', () => {
    service.listarAtletas().subscribe();
    http.expectOne('http://localhost:1895/atletas').flush({ quantidade: 0, atletas: [] });
  });

  it('listarClubes chama GET /clubes', () => {
    service.listarClubes().subscribe();
    http.expectOne('http://localhost:1895/clubes').flush({ quantidade: 0, clubes: [] });
  });
});
