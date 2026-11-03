import { Routes } from '@angular/router';
import { AtletasComponent } from './views/atletas/atletas.component';
import { ClubesComponent } from './views/clubes/clubes.component';

export const routes: Routes = [
  {path: 'atletas', component: AtletasComponent},
  {path: 'clubes', component: ClubesComponent}
];
