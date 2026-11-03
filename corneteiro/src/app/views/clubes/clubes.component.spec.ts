import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ClubesComponent } from './clubes.component';

describe('ClubesComponent', () => {
  let fixture: ComponentFixture<ClubesComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubesComponent);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('lista os clubes retornados pelo backend', () => {
    http.expectOne('http://localhost:1895/clubes').flush({
      quantidade: 1,
      clubes: [{ id: 262, slug: 'flamengo', apelido: 'Flamengo', nome: 'Flamengo', escudos: {} }],
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Flamengo');
  });

  it('mostra mensagem de erro quando o backend falha', () => {
    http.expectOne('http://localhost:1895/clubes').error(new ProgressEvent('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Não foi possível carregar os clubes');
  });
});
