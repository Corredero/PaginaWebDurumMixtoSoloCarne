import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface TopArtist {
  name: string;
  listeners: number;
  image: string;
}

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})
export class TopArtistsComponent {
  private http = inject(HttpClient);

  artists = signal<TopArtist[]>([]);
  loading = signal(false);

  constructor() {
    this.loadTopArtists();
  }

  loadTopArtists() {
    this.loading.set(true);
    // Using Last.fm API for top artists (requires API key, using a demo key)
    const apiKey = 'your_lastfm_api_key'; // Replace with actual key
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json&limit=10`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        const topArtists = data.artists.artist.map((artist: any) => ({
          name: artist.name,
          listeners: parseInt(artist.listeners),
          image: artist.image[2]['#text'] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/No_image_available.png/120px-No_image_available.png'
        }));
        this.artists.set(topArtists);
        this.loading.set(false);
      },
      error: () => {
        // Fallback to mock data if API fails
        this.artists.set([
          { name: 'The Weeknd', listeners: 85000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg/120px-The_Weeknd_Portrait_by_Brian_Ziff.jpg' },
          { name: 'Dua Lipa', listeners: 78000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Dua_Lipa-69798_%28cropped%29.jpg/120px-Dua_Lipa-69798_%28cropped%29.jpg' },
          { name: 'Taylor Swift', listeners: 75000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png/120px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png' },
          { name: 'Ed Sheeran', listeners: 72000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/120px-Ed_Sheeran-6886_%28cropped%29.jpg' },
          { name: 'Justin Bieber', listeners: 70000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/120px-Justin_Bieber_in_2015.jpg' },
          { name: 'Ariana Grande', listeners: 68000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ariana_Grande_promoting_Wicked_%282024%29.jpg/120px-Ariana_Grande_promoting_Wicked_%282024%29.jpg' },
          { name: 'Bruno Mars', listeners: 65000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg/120px-BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg' },
          { name: 'Billie Eilish', listeners: 62000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/BillieEilishO2140725-39_-_54665577407_%28cropped%29.jpg/120px-BillieEilishO2140725-39_-_54665577407_%28cropped%29.jpg' },
          { name: 'Katy Perry', listeners: 60000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/KatyPerryWestminst111224_%2881_of_95%29_%2854206733094%29_%28cropped_2%29.jpg/120px-KatyPerryWestminst111224_%2881_of_95%29_%2854206733094%29_%28cropped_2%29.jpg' },
          { name: 'Rihanna', listeners: 58000000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/120px-Rihanna_Fenty_2018.png' }
        ]);
        this.loading.set(false);
      }
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/No_image_available.png/120px-No_image_available.png') {
      img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/No_image_available.png/120px-No_image_available.png';
    }
  }
}