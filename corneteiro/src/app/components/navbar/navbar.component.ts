import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IButtonConfig } from '../button/button.types';

@Component({
  selector: 'app-navbar',
  imports: [
    ButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  navbarButtons: IButtonConfig[] = [
    {
      text: 'Recomendações',
      class: 'btn--primary',
      action: () => this.handleRecomendacoes()
    },
    {
      text: 'Atletas',
      class: 'btn--primary',
      action: () => this.handleAtletas()
    },
    {
      text: 'Clubes',
      class: 'btn--primary',
      action: () => this.handleClubes()
    }
  ];

  handleRecomendacoes(){
    console.log("Redirecionando para recomendações")
  }

  handleAtletas(){
    console.log("Redirecionando para atletas")
  }

  handleClubes(){
    console.log("Redirecionando para clubes")
  }
}
