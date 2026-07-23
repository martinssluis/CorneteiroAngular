import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('corneteiro');
}
