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
  @Output() viewChange = new EventEmitter<'songs' | 'top10' | 'artist' | 'novedades' | 'juego'>();

  showSongs() {
    this.viewChange.emit('songs');
  }

  showTop10() {
    this.viewChange.emit('top10');
  }

  showArtist() {
    this.viewChange.emit('artist');
  }

  showNovedades() {
    this.viewChange.emit('novedades');
  }

  showJuego() {
    this.viewChange.emit('juego');
  }
}
