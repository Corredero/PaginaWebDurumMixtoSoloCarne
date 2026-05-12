import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mensaje {
  texto: string;
  fecha: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  mensaje = signal('');

  mensajes = signal<Mensaje[]>([
    {
      texto: 'Bienvenidos al chat, respetad y diviértanse.',
      fecha: this.obtenerFecha()
    }
  ]);

  obtenerFecha(): string {
    const ahora = new Date();
    return ahora.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  publicar(): void {
    const texto = this.mensaje().trim();
    if (!texto) {
      return;
    }

    this.mensajes.update(current => [
      ...current,
      {
        texto,
        fecha: this.obtenerFecha()
      }
    ]);

    this.mensaje.set('');
  }
}
