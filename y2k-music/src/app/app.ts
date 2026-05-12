import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SongFormComponent } from './components/song-form/song-form.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopArtistsComponent } from './components/top-artists/top-artists.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { ArtistSearchComponent } from './components/artist-search/artist-search.component';
import { ChatComponent } from './components/chat/chat.component';
import { JuegoComponent } from './components/juego/juego.component';
import { AuthService } from './services/auth.service';

interface SubscriptionErrors {
  nombre?: string;
  apellidos?: string;
  email?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    SongFormComponent,
    SongListComponent,
    FooterComponent,
    TopArtistsComponent,
    NovedadesComponent,
    ArtistSearchComponent,
    ChatComponent,
    JuegoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentView = signal<'songs' | 'top10' | 'artist' | 'chat' | 'novedades' | 'juego'>('songs');
  showSubscriptionPopup = signal(false);
  subscriptionName = '';
  subscriptionLastName = '';
  subscriptionEmail = '';
  subscriptionErrors = signal<SubscriptionErrors>({});
  subscriptionMessage = signal('');
  private popupTimer: ReturnType<typeof setTimeout> | null = null;
  private popupShownThisSession = false;

  constructor(public authService: AuthService) {
    effect(() => {
      if (this.authService.isAuthenticated() && !this.popupShownThisSession) {
        if (this.popupTimer) {
          clearTimeout(this.popupTimer);
        }
        this.popupTimer = setTimeout(() => {
          if (this.authService.isAuthenticated() && !this.popupShownThisSession) {
            this.openSubscriptionPopup();
            this.popupShownThisSession = true;
          }
        }, 10000);
      }

      if (!this.authService.isAuthenticated()) {
        if (this.popupTimer) {
          clearTimeout(this.popupTimer);
          this.popupTimer = null;
        }
        this.popupShownThisSession = false;
      }
    });
  }

  onViewChange(view: 'songs' | 'top10' | 'artist' | 'chat' | 'novedades' | 'juego' | 'links') {
    if (view === 'links') {
      this.openSubscriptionPopup();
      return;
    }
    this.currentView.set(view);
  }

  openSubscriptionPopup() {
    this.showSubscriptionPopup.set(true);
    this.subscriptionErrors.set({});
    this.subscriptionMessage.set('');
  }

  closeSubscriptionPopup() {
    this.showSubscriptionPopup.set(false);
  }

  submitSubscription() {
    const errors: SubscriptionErrors = {};
    const nombre = this.subscriptionName.trim();
    const apellidos = this.subscriptionLastName.trim();
    const email = this.subscriptionEmail.trim();

    if (!nombre) {
      errors.nombre = 'Necesitas ingresar tu nombre.';
    }
    if (!apellidos) {
      errors.apellidos = 'Necesitas ingresar tus apellidos.';
    }
    if (!email) {
      errors.email = 'Necesitas ingresar tu correo electrónico.';
    } else if (!this.validateEmail(email)) {
      errors.email = 'El correo tiene un formato inválido.';
    }

    this.subscriptionErrors.set(errors);
    if (Object.keys(errors).length > 0) {
      this.subscriptionMessage.set('Corrige los errores para continuar.');
      return;
    }

    this.subscriptionMessage.set('¡Inscripción recibida! Estarás al tanto de anuncios y novedades.');
    this.subscriptionName = '';
    this.subscriptionLastName = '';
    this.subscriptionEmail = '';
  }

  private validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
