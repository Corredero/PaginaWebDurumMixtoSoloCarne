import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent {
  constructor(public songService: SongService) {}
}
