import { Routes } from '@angular/router';
import { AtletasComponent } from './views/atletas/atletas.component';
import { ClubesComponent } from './views/clubes/clubes.component';
import { RecomendacoesComponent } from './views/recomendacoes/recomendacoes.component';

export const routes: Routes = [
  {path: '', redirectTo: 'recomendacoes', pathMatch: 'full'},
  {path: 'recomendacoes', component: RecomendacoesComponent},
  {path: 'atletas', component: AtletasComponent},
  {path: 'clubes', component: ClubesComponent}
];
