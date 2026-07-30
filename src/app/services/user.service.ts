import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Credentials, CurrentUser, RegisterCredentials } from '../models/credentials.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import LocalStorageUtils from '../utils/local-storage-utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  private http = inject(HttpClient);

  currentUser = signal<CurrentUser | null>(null);

  getUsers() {
    return this.http.get<User[]>('/users');
  }

  updateUserRole(userId: number, roleName: string) {
    return this.http.put<User>(`/users/${userId}/role`, { roleName });
  }

  login(credentials: Credentials) {
    const encoded = {
      email: btoa(credentials.email),
      password: btoa(credentials.password),
    };
    return this.http.post('/auth/login', encoded, { responseType: 'text' });
  }

  register(credentials: RegisterCredentials) {
    const payload = {
      username: btoa(credentials.username),
      email: btoa(credentials.email),
      password: btoa(credentials.password),
      birthDate: credentials.birthDate,
      isInternal: 0,
      createdBy: credentials.username,
    };
    return this.http.post('/auth/register', payload, { responseType: 'text' });
  }

  logout() {
    LocalStorageUtils.deleteItem(LocalStorageUtils.tokenKey);
    this.router.navigate(['/auth']);
  }

  getCurrentUser() {
    return this.http.get<CurrentUser>('/auth/me').pipe(tap((user) => this.currentUser.set(user)));
  }
}
