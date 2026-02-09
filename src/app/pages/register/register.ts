// src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  returnUrl = '/user';

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/user';
  }

  onSubmit() {
    this.error = '';
    const res = this.auth.register(this.username.trim(), this.email.trim(), this.password);

    if (!res.ok) {
      this.error = res.message ?? 'Error al registrarte.';
      return;
    }

    this.router.navigateByUrl(this.returnUrl);
  }
}
