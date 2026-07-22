import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Credentials, RegisterCredentials } from '../models/credentials.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
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
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/homepage']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
    } else {
      this.userService.register(this.registerForm).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/homepage']);
        },
        error: (err) => {
          console.error('Register failed', err);
        },
      });
    }
  }
}
