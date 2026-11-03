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

  it('custoBeneficioAtletas envia só os filtros preenchidos', () => {
    service.custoBeneficioAtletas({ posicaoId: 4, clubeId: null, minJogos: 5 }).subscribe();

    const req = http.expectOne((r) => r.url === 'http://localhost:1895/recomendacoes/custo-beneficio');
    expect(req.request.params.get('posicaoId')).toBe('4');
    expect(req.request.params.get('minJogos')).toBe('5');
    expect(req.request.params.has('clubeId')).toBe(false);
    req.flush({ atletas: [] });
  });

  it('custoBeneficioClubes não envia clubeId', () => {
    service.custoBeneficioClubes({ clubeId: 262, posicaoId: 5 }).subscribe();

    const req = http.expectOne((r) => r.url === 'http://localhost:1895/recomendacoes/custo-beneficio/clubes');
    expect(req.request.params.get('posicaoId')).toBe('5');
    expect(req.request.params.has('clubeId')).toBe(false);
    req.flush({ clubes: [] });
  });
});
