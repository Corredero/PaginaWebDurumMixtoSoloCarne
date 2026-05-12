import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ArtistTrack {
  trackId: number;
  trackName: string;
  collectionName: string;
  releaseYear: string;
  previewUrl: string;
  trackTime: number;
  artistName: string;
}

@Component({
  selector: 'app-artist-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent {
  artistQuery = signal('');
  statusMessage = signal('');
  statusColor = signal('green');
  loading = signal(false);
  tracks = signal<ArtistTrack[]>([]);
  nowPlayingId = signal<number | null>(null);
  loadingPreviewId = signal<number | null>(null);
  currentPreviewTitle = signal('');
  currentTime = signal(0);
  duration = signal(0);
  volume = signal(0.7);

  private audio: HTMLAudioElement | null = null;
  private http = inject(HttpClient);

  get noResults() {
    return !this.loading() && this.tracks().length === 0 && !this.statusMessage();
  }

  searchArtist() {
    const artist = this.artistQuery().trim();
    if (!artist) {
      this.showStatus('Escribe el nombre del artista primero.', 'red');
      return;
    }

    this.loading.set(true);
    this.tracks.set([]);
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&attribute=artistTerm&limit=25`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        const results = data?.results || [];
        const filtered = results
          .filter((item: any) => item.previewUrl)
          .map((item: any) => ({
            trackId: item.trackId,
            trackName: item.trackName,
            collectionName: item.collectionName || 'Single',
            releaseYear: item.releaseDate ? item.releaseDate.slice(0, 4) : 'N/A',
            previewUrl: item.previewUrl,
            trackTime: item.trackTimeMillis || 0,
            artistName: item.artistName || artist,
          }))
          .sort((a: ArtistTrack, b: ArtistTrack) => b.trackTime - a.trackTime);

        this.tracks.set(filtered);
        this.loading.set(false);
        if (filtered.length === 0) {
          this.showStatus('No se encontraron canciones con preview para este artista.', 'red');
        }
      },
      error: () => {
        this.loading.set(false);
        this.showStatus('Error al buscar canciones del artista.', 'red');
      }
    });
  }

  togglePlay(track: ArtistTrack) {
    if (this.nowPlayingId() === track.trackId) {
      this.stopAudio();
      return;
    }

    if (this.loadingPreviewId()) {
      return;
    }

    if (!track.previewUrl) {
      this.showStatus('No hay preview disponible para esta canción.', 'red');
      return;
    }

    this.loadingPreviewId.set(track.trackId);
    this.currentPreviewTitle.set(`${track.trackName} - ${track.artistName}`);
    this.startAudio(track.previewUrl, track.trackId);
  }

  private startAudio(previewUrl: string, id: number) {
    this.stopAudio();

    if (typeof window === 'undefined') {
      this.loadingPreviewId.set(null);
      return;
    }

    this.audio = new Audio(previewUrl);
    this.audio.volume = this.volume();
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration.set(this.audio?.duration || 0);
    });
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime.set(this.audio?.currentTime || 0);
    });
    this.audio.addEventListener('ended', () => {
      this.stopAudio();
    });

    this.audio.play().then(() => {
      this.nowPlayingId.set(id);
      this.loadingPreviewId.set(null);
    }).catch(() => {
      this.showStatus('No se pudo reproducir el audio.', 'red');
      this.loadingPreviewId.set(null);
      this.stopAudio();
    });
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.nowPlayingId.set(null);
    this.loadingPreviewId.set(null);
    this.currentTime.set(0);
    this.duration.set(0);
  }

  setVolume(event: Event) {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.volume.set(value);
    if (this.audio) {
      this.audio.volume = value;
    }
  }

  seek(event: Event) {
    const value = parseFloat((event.target as HTMLInputElement).value);
    if (this.audio) {
      this.audio.currentTime = value;
    }
    this.currentTime.set(value);
  }

  formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  trackById(_index: number, track: ArtistTrack) {
    return track.trackId;
  }

  private showStatus(text: string, color: string) {
    this.statusMessage.set(text);
    this.statusColor.set(color);
    setTimeout(() => this.statusMessage.set(''), 2500);
  }
}
