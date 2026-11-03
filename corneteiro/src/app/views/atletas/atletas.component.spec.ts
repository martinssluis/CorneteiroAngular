import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AtletasComponent } from './atletas.component';

describe('AtletasComponent', () => {
  let fixture: ComponentFixture<AtletasComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtletasComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AtletasComponent);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('lista os atletas retornados pelo backend', () => {
    http.expectOne('http://localhost:1895/atletas').flush({
      quantidade: 1,
      atletas: [{ atleta_id: 1, apelido: 'Arrascaeta', foto: 'x/FORMATO/a.png', preco_num: 12.5, media_num: 6.1 }],
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Arrascaeta');
  });

  it('mostra mensagem de erro quando o backend falha', () => {
    http.expectOne('http://localhost:1895/atletas').error(new ProgressEvent('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Não foi possível carregar os atletas');
  });
});
