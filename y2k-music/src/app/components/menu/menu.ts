import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  @Output() viewChange = new EventEmitter<'songs' | 'top10'>();

  onTop10Click() {
    this.viewChange.emit('top10');
  }

  onInicioClick() {
    this.viewChange.emit('songs');
  }
}
