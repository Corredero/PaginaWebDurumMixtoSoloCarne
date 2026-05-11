import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.css'
})
export class SongFormComponent {
  title = '';
  artist = '';
  message = signal('');
  messageColor = signal('green');
  authWarning = signal('');

  isAuthenticated = computed(() => this.authService.isAuthenticated());

  constructor(
    private songService: SongService,
    private authService: AuthService
  ) {}

  add() {
    if (!this.isAuthenticated()) {
      this.showMessage('Registrate o inicia sesión para añadir canciones.', 'red');
      return;
    }

    if (!this.title.trim() || !this.artist.trim()) {
      this.showMessage('Rellena los dos campos!', 'red');
      return;
    }

    const exists = this.songService.songs().some(
      s => s.title.toLowerCase() === this.title.toLowerCase() &&
           s.artist.toLowerCase() === this.artist.toLowerCase()
    );

    if (exists) {
      this.showMessage('La canción ya existe', 'red');
      return;
    }

    this.songService.add(this.title.trim(), this.artist.trim());
    this.title = '';
    this.artist = '';
    this.showMessage('Cancion guardada! :)', 'green');
  }

  clear() {
    this.title = '';
    this.artist = '';
    this.message.set('');
    this.authWarning.set('');
  }

  private showMessage(text: string, color: string) {
    this.message.set(text);
    this.messageColor.set(color);
    setTimeout(() => this.message.set(''), 2500);
  }
}
