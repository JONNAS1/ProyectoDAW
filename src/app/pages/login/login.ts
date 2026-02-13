// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  error = '';
  loading = false;
  returnUrl = '/user';

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/user';
  }

  async onSubmit() {
    this.error = '';
    this.loading = true;

    const res = await this.auth.login(this.email.trim(), this.password);

    this.loading = false;

    if (!res.ok) {
      this.error = res.message ?? 'Error al iniciar sesion.';
      return;
    }

    this.router.navigateByUrl(this.returnUrl);
  }
}
