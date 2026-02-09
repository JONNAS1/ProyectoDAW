// src/app/shared/components/header/header.ts
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  q = '';

  constructor(public auth: AuthService, private router: Router) {}

  goSearch() {
    const query = this.q.trim();
    if (!query) return;
    this.router.navigate(['/chuletas'], { queryParams: { q: query } });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
