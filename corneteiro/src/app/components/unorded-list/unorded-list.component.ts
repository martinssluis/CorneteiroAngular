import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-unorded-list',
  imports: [CommonModule],
  templateUrl: './unorded-list.component.html',
  styleUrl: './unorded-list.component.css',
})
export class UnordedListComponent {
  orientation = input<'horizontal' | 'vertical'>('vertical');

  variation = computed(() => `list-${this.orientation()}`); // faz a ponte entre a variação do componente em si com a escolha do caso de uso
  }
