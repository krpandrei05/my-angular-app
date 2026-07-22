import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface User {
  userId: number;
  username: string;
  birthDate: Date;
  isInternal: number;
  createdBy: string;
  creationDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users');
  }
}
