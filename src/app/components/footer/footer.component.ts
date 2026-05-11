import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';


@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public songService: SongService) {}
}
