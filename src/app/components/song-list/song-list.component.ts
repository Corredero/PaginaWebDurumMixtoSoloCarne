import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService, Song } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';
import { PrimeraMayusculaPipe } from '../../pipes/primera-mayuscula-pipe';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeraMayusculaPipe],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  query = signal('');
  statusMessage = signal('');
  statusColor = signal('green');

  filteredSongs = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.songService.songs();
    return this.songService.songs().filter(s =>
      s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
    );
  });

  isAuthenticated = computed(() => this.authService.isAuthenticated());

  constructor(
    public songService: SongService,
    private authService: AuthService
  ) {}

  onSearch(value: string) {
    this.query.set(value);
  }

  clearSearch() {
    this.query.set('');
  }

  delete(id: number) {
    if (!this.isAuthenticated()) {
      this.showStatus('Necesitas iniciar sesión para borrar canciones.', 'red');
      return;
    }
    this.songService.delete(id);
  }

  private showStatus(text: string, color: string) {
    this.statusMessage.set(text);
    this.statusColor.set(color);
    setTimeout(() => this.statusMessage.set(''), 2500);
  }

  trackById(_: number, song: Song) {
    return song.id;
  }
}
