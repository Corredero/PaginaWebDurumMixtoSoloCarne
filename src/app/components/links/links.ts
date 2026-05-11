import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExternalLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
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
}
