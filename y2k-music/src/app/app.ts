import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SongFormComponent } from './components/song-form/song-form.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopArtistsComponent } from './components/top-artists/top-artists.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    SongFormComponent,
    SongListComponent,
    FooterComponent,
    TopArtistsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentView = signal<'songs' | 'top10'>('songs');

  constructor(public authService: AuthService) {}

  showSongs() {
    this.currentView.set('songs');
  }

  showTop10() {
    this.currentView.set('top10');
  }
}
