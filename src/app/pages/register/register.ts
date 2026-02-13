// src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  showPassword = false;

  error = '';
  loading = false;
  returnUrl = '/user';

  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/user';
  }

  async onSubmit() {
    this.error = '';
    this.loading = true;

    // Leer idioma actual de la cookie (puesta por ngx-translate) o usar 'es'
    const idioma = this.cookie.get('idioma') ?? 'es';

    const res = await this.auth.register(
      this.username.trim(),
      this.email.trim(),
      this.password,
      idioma
    );

    this.loading = false;

    if (!res.ok) {
      this.error = res.message ?? 'Error al registrarte.';
      return;
    }

    this.router.navigateByUrl(this.returnUrl);
  }
}
