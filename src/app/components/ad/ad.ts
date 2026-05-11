import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad.html',
  styleUrl: './ad.css',
})
export class AdComponent {
  openHalfLifeOffer(event: MouseEvent) {
    event.preventDefault();
    const isRickRoll = Math.random() < 0.05;
    const url = isRickRoll
      ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      : 'https://store.steampowered.com/app/70/HalfLife/';
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
