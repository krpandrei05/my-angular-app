import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Credentials, RegisterCredentials, UserResponse } from '../models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users');
  }

  login(credentials: Credentials) {
    return this.http.post<UserResponse>('http://localhost:8080/users/login', credentials);
  }

  register(credentials: RegisterCredentials) {
    const payload = { ...credentials, isInternal: 0, createdBy: credentials.username };
    return this.http.post<User>('http://localhost:8080/users', payload);
  }
}
