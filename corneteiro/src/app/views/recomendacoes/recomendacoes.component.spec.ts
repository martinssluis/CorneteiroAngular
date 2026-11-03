import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RecomendacoesComponent } from './recomendacoes.component';

const URL_ATLETAS = 'http://localhost:1895/recomendacoes/custo-beneficio';
const URL_CLUBES_RANKING = 'http://localhost:1895/recomendacoes/custo-beneficio/clubes';

const atleta = {
  atleta_id: 1, apelido: 'Arrascaeta', clube_id: 262, posicao_id: 4, status_id: 7,
  preco_num: 10, media_num: 6, jogos_num: 20, custo_beneficio: 0.6,
  motivo: 'Média 6,00 em 20 jogos ÷ preço C$ 10,00 = 0,600',
};
const clubeRanking = {
  clube_id: 262, nome: 'Flamengo', apelido: 'Mengão', escudos: {}, quantidade_atletas: 8,
  custo_beneficio_medio: 0.55, motivo: 'Média do custo-benefício de 8 atletas elegíveis = 0,550',
};

describe('RecomendacoesComponent', () => {
  let fixture: ComponentFixture<RecomendacoesComponent>;
  let http: HttpTestingController;

  const texto = () => fixture.nativeElement.textContent as string;

  function responderCarga() {
    http.expectOne('http://localhost:1895/clubes').flush({
      quantidade: 1,
      clubes: [{ id: 262, slug: 'flamengo', apelido: 'Mengão', nome_completo: 'Flamengo', nome: 'FLA', escudos: {} }],
    });
    http.expectOne((r) => r.url === URL_ATLETAS).flush({ quantidade: 1, atletas: [atleta] });
    http.expectOne((r) => r.url === URL_CLUBES_RANKING).flush({ quantidade: 1, clubes: [clubeRanking] });
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendacoesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendacoesComponent);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('carrega com mínimo de 3 jogos e lista os atletas com o nome do clube', () => {
    const req = http.expectOne((r) => r.url === URL_ATLETAS);
    expect(req.request.params.get('minJogos')).toBe('3');
    req.flush({ quantidade: 1, atletas: [atleta] });
    http.expectOne('http://localhost:1895/clubes').flush({
      quantidade: 1,
      clubes: [{ id: 262, slug: 'flamengo', apelido: 'Mengão', nome_completo: 'Flamengo', nome: 'FLA', escudos: {} }],
    });
    http.expectOne((r) => r.url === URL_CLUBES_RANKING).flush({ quantidade: 0, clubes: [] });
    fixture.detectChanges();

    expect(texto()).toContain('Arrascaeta');
    expect(texto()).toContain('Flamengo');
    expect(texto()).not.toContain('Mengão');
    expect(texto()).toContain('Meia');
  });

  it('mostra o custo-benefício em estrelas relativas ao melhor da lista', () => {
    http.expectOne('http://localhost:1895/clubes').flush({ quantidade: 0, clubes: [] });
    http.expectOne((r) => r.url === URL_ATLETAS).flush({
      quantidade: 3,
      atletas: [
        { ...atleta, atleta_id: 1, custo_beneficio: 0.8 },  // melhor da lista -> 5 estrelas
        { ...atleta, atleta_id: 2, custo_beneficio: 0.4 },  // metade -> 2,5 estrelas
        { ...atleta, atleta_id: 3, custo_beneficio: 0.0 },  // zero -> 0 estrela
      ],
    });
    http.expectOne((r) => r.url === URL_CLUBES_RANKING).flush({ quantidade: 0, clubes: [] });
    fixture.detectChanges();

    const estrelas = Array.from(fixture.nativeElement.querySelectorAll('.estrelas') as NodeListOf<HTMLElement>);
    expect(estrelas.map((e) => e.getAttribute('aria-label'))).toEqual([
      '5 de 5 estrelas',
      '2,5 de 5 estrelas',
      '0 de 5 estrelas',
    ]);
    expect(texto()).not.toContain('0.800');
  });

  it('alterna para o ranking de clubes', () => {
    responderCarga();

    const abas = fixture.nativeElement.querySelectorAll('.abas button') as NodeListOf<HTMLButtonElement>;
    abas[1].click();
    fixture.detectChanges();

    expect(texto()).toContain('Custo-benefício médio');
    expect(texto()).toContain('Flamengo');
    expect(texto()).not.toContain('Mengão');
    expect(fixture.nativeElement.querySelector('.estrelas')?.getAttribute('aria-label')).toBe('5 de 5 estrelas');
  });

  it('ao escolher uma posição, consulta de novo com o filtro', () => {
    responderCarga();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = '5';
    select.dispatchEvent(new Event('change'));

    const req = http.expectOne((r) => r.url === URL_ATLETAS);
    expect(req.request.params.get('posicaoId')).toBe('5');
    req.flush({ quantidade: 0, atletas: [] });
    http.expectOne((r) => r.url === URL_CLUBES_RANKING).flush({ quantidade: 0, clubes: [] });
    fixture.detectChanges();

    expect(texto()).toContain('Nenhum atleta encontrado');
  });

  it('mostra erro quando o backend falha', () => {
    http.expectOne('http://localhost:1895/clubes').error(new ProgressEvent('error'));
    http.expectOne((r) => r.url === URL_ATLETAS).error(new ProgressEvent('error'));
    http.expectOne((r) => r.url === URL_CLUBES_RANKING).error(new ProgressEvent('error'));
    fixture.detectChanges();

    expect(texto()).toContain('Não foi possível carregar as recomendações');
  });
});
