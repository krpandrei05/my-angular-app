import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Credentials, RegisterCredentials } from '../models/credentials.model';
import LocalStorageUtils from '../utils/local-storage-utils';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private userService = inject(UserService);
  private router = inject(Router);

  isLoginMode = true;

  loginForm: Credentials = {
    email: '',
    password: '',
  };

  registerForm: RegisterCredentials = {
    username: '',
    email: '',
    password: '',
    birthDate: '',
  };

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.userService.login(this.loginForm).subscribe({
        next: (token) => {
          LocalStorageUtils.setItem(LocalStorageUtils.tokenKey, token);
          this.router.navigate(['/homepage']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
    } else {
      this.userService.register(this.registerForm).subscribe({
        next: () => {
          this.isLoginMode = true;
        },
        error: (err) => {
          console.error('Register failed', err);
        },
      });
    }
  }
}
