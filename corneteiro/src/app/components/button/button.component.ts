import { Component,  input } from '@angular/core';
import { IButtonConfig } from './button.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  config = input.required<IButtonConfig>();
}
