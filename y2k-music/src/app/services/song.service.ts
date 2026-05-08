import { Injectable, signal, computed } from '@angular/core';

export interface Song {
  id: number;
  title: string;
  artist: string;
}

@Injectable({ providedIn: 'root' })
export class SongService {
  private readonly STORAGE_KEY = 'y2k_songs';

  songs = signal<Song[]>(this.load());

  totalArtists = computed(() =>
    new Set(this.songs().map(s => s.artist.toLowerCase())).size
  );

  private load(): Song[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.songs()));
  }

  add(title: string, artist: string) {
    this.songs.update(list => [{ id: Date.now(), title, artist }, ...list]);
    this.save();
  }

  delete(id: number) {
    this.songs.update(list => list.filter(s => s.id !== id));
    this.save();
  }
}
