import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ClubeDTO } from '../../services/models';

@Component({
  selector: 'app-clubes',
  imports: [],
  templateUrl: './clubes.component.html',
  styleUrl: './clubes.component.css',
})
export class ClubesComponent implements OnInit {
  private api = inject(ApiService);

  clubes = signal<ClubeDTO[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  ngOnInit(): void {
    this.api.listarClubes().subscribe({
      next: (resposta) => {
        this.clubes.set(resposta.clubes);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os clubes. Verifique se o backend está rodando.');
        this.carregando.set(false);
      },
    });
  }
}
