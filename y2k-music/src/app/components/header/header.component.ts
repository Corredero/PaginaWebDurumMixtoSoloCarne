import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  visits = '001337';

  constructor(private songService: SongService) {}

  ngOnInit() {
    const count = parseInt(localStorage.getItem('visit_count') || '1337');
    const next = count + 1;
    localStorage.setItem('visit_count', String(next));
    this.visits = String(next).padStart(6, '0');
  }
}
