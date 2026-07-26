import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CurrentUser } from '../models/credentials.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private userService = inject(UserService);

  currentUser = signal<CurrentUser | null>(null);

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.currentUser.set(user),
      error: (err) => console.error('Failed to load current user', err),
    })
  }
}
