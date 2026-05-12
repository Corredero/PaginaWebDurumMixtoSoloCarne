import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ExternalLink {
  label: string;
  href: string;
}

interface ValidationErrors {
  nombre?: string;
  apellidos?: string;
  email?: string;
}

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './links.html',
  styleUrl: './links.css',
})
export class LinksComponent {
  links: ExternalLink[] = [
    { label: 'Myspace', href: 'https://www.myspace.com' },
    { label: 'Fotolog', href: 'https://www.fotolog.com' },
    { label: 'MSN Groups', href: 'https://www.msn.com' },
    { label: 'Napster', href: 'https://www.napster.com' },
  ];

  showPopup = signal(false);
  nombre = signal('');
  apellidos = signal('');
  email = signal('');
  errors = signal<ValidationErrors>({});
  successMessage = signal('');

  openPopup() {
    this.showPopup.set(true);
    this.successMessage.set('');
    this.errors.set({});
  }

  closePopup() {
    this.showPopup.set(false);
  }

  submitForm() {
    const errors: ValidationErrors = {};
    const nombre = this.nombre().trim();
    const apellidos = this.apellidos().trim();
    const email = this.email().trim();

    if (!nombre) {
      errors.nombre = 'Debes ingresar tu nombre.';
    }
    if (!apellidos) {
      errors.apellidos = 'Debes ingresar tus apellidos.';
    }
    if (!email) {
      errors.email = 'Debes ingresar un correo electrónico.';
    } else if (!this.validateEmail(email)) {
      errors.email = 'El correo no tiene un formato válido.';
    }

    this.errors.set(errors);

    if (Object.keys(errors).length > 0) {
      this.successMessage.set('');
      return;
    }

    this.successMessage.set('¡Gracias! Te has suscrito correctamente.');
    this.nombre.set('');
    this.apellidos.set('');
    this.email.set('');
  }

  private validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
