import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService, Song } from '../../services/song.service';


@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {
  query = signal('');

  filteredSongs = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.songService.songs();
    return this.songService.songs().filter(s =>
      s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
    );
  });

  constructor(public songService: SongService) {}

  onSearch(value: string) {
    this.query.set(value);
  }

  clearSearch() {
    this.query.set('');
  }

  delete(id: number) {
    this.songService.delete(id);
  }

  trackById(_: number, song: Song) {
    return song.id;
  }
}
