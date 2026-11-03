import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ClubeDTO, CustoBeneficioAtleta, CustoBeneficioClube } from '../../services/models';

export const POSICOES: Record<number, string> = {
  1: 'Goleiro',
  2: 'Lateral',
  3: 'Zagueiro',
  4: 'Meia',
  5: 'Atacante',
  6: 'Técnico',
};

type Visao = 'atletas' | 'clubes';

@Component({
  selector: 'app-recomendacoes',
  imports: [],
  templateUrl: './recomendacoes.component.html',
  styleUrl: './recomendacoes.component.css',
})
export class RecomendacoesComponent implements OnInit {
  private api = inject(ApiService);

  readonly posicoes = Object.entries(POSICOES).map(([id, nome]) => ({ id: Number(id), nome }));

  // filtros
  posicaoId = signal<number | null>(null);
  clubeId = signal<number | null>(null);
  minJogos = signal(3);

  visao = signal<Visao>('atletas');

  clubes = signal<ClubeDTO[]>([]);
  atletas = signal<CustoBeneficioAtleta[]>([]);
  clubesRanking = signal<CustoBeneficioClube[]>([]);

  carregando = signal(true);
  erro = signal<string | null>(null);

  private apelidoDoClube = computed(
    () => new Map(this.clubes().map((clube) => [clube.id, clube.apelido]))
  );

  ngOnInit(): void {
    this.api.listarClubes().subscribe({
      next: (resposta) => this.clubes.set(resposta.clubes),
      error: () => this.falhar(),
    });
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);

    const filtros = {
      posicaoId: this.posicaoId(),
      clubeId: this.clubeId(),
      minJogos: this.minJogos(),
    };

    this.api.custoBeneficioAtletas(filtros).subscribe({
      next: (resposta) => {
        this.atletas.set(resposta.atletas);
        this.carregando.set(false);
      },
      error: () => this.falhar(),
    });

    this.api.custoBeneficioClubes(filtros).subscribe({
      next: (resposta) => this.clubesRanking.set(resposta.clubes),
      error: () => this.falhar(),
    });
  }

  alterarPosicao(valor: string): void {
    this.posicaoId.set(valor === '' ? null : Number(valor));
    this.carregar();
  }

  alterarClube(valor: string): void {
    this.clubeId.set(valor === '' ? null : Number(valor));
    this.carregar();
  }

  alterarMinJogos(valor: string): void {
    const numero = Number(valor);
    if (valor === '' || Number.isNaN(numero) || numero < 0) return;
    this.minJogos.set(Math.floor(numero));
    this.carregar();
  }

  nomeDoClube(id: number): string {
    return this.apelidoDoClube().get(id) ?? `Clube ${id}`;
  }

  nomeDaPosicao(id: number): string {
    return POSICOES[id] ?? `Posição ${id}`;
  }

  private falhar(): void {
    this.erro.set('Não foi possível carregar as recomendações. Verifique se o backend está rodando.');
    this.carregando.set(false);
  }
}
