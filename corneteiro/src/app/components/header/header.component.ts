import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports:
  [
    NavbarComponent,
    LogoComponent,
    CommonModule

  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
}
