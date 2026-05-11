import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';
import { MenuComponent } from '../menu/menu';
import { StatsComponent } from '../stats/stats';
import { LinksComponent } from '../links/links';
import { AdComponent } from '../ad/ad';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuComponent, StatsComponent, LinksComponent, AdComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public songService: SongService) {}
}
