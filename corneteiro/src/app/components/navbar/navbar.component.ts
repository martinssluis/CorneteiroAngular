import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UnordedListComponent } from '../unorded-list/unorded-list.component';

interface NavbarLink {
  text: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    UnordedListComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  navbarLinks: NavbarLink[] = [
    {
      text: 'Recomendações',
      route: '/'
    },
    {
      text: 'Atletas',
      route: '/atletas'
    },
    {
      text: 'Clubes',
      route: '/clubes'
    }
  ];
}
