import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  visits = '001337';
  authMode = signal<'login' | 'register'>('login');
  username = '';
  password = '';
  confirmPassword = '';
  authMessage = signal('');
  authMessageColor = signal('green');

  constructor(
    private songService: SongService,
    public authService: AuthService
  ) {}

  get currentUser() {
  return this.authService.currentUser(); // <-- Añade () aquí
}

  get isAuthenticated() {
  return this.authService.isAuthenticated(); // <-- Añade () aquí
}

  ngOnInit() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    const count = parseInt(localStorage.getItem('visit_count') || '1337');
    const next = count + 1;
    localStorage.setItem('visit_count', String(next));
    this.visits = String(next).padStart(6, '0');
  }

  switchMode(mode: 'login' | 'register') {
    this.authMode.set(mode);
    this.authMessage.set('');
  }

  submitAuth() {
    if (this.authMode() === 'login') {
      const result = this.authService.login(this.username, this.password);
      this.authMessage.set(result.message);
      this.authMessageColor.set(result.success ? 'green' : 'red');
      if (result.success) {
        this.clearForm();
      }
      return;
    }

    const result = this.authService.register(
      this.username,
      this.password,
      this.confirmPassword
    );
    this.authMessage.set(result.message);
    this.authMessageColor.set(result.success ? 'green' : 'red');
    if (result.success) {
      this.clearForm();
    }
  }

  logout() {
    this.authService.logout();
    this.authMessage.set('Has cerrado sesión.');
    this.authMessageColor.set('green');
  }

  private clearForm() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
