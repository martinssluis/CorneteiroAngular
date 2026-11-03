import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AtletaDTO } from '../../services/models';

@Component({
  selector: 'app-atletas',
  imports: [],
  templateUrl: './atletas.component.html',
  styleUrl: './atletas.component.css',
})
export class AtletasComponent implements OnInit {
  private api = inject(ApiService);

  atletas = signal<AtletaDTO[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  ngOnInit(): void {
    this.api.listarAtletas().subscribe({
      next: (resposta) => {
        this.atletas.set(resposta.atletas);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os atletas. Verifique se o backend está rodando.');
        this.carregando.set(false);
      },
    });
  }
}
