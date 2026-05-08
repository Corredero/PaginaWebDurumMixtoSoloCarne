import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public songService: SongService) {}
}
