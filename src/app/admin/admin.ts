import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  protected userService = inject(UserService);

  users = signal<User[]>([]);
  roles = ['USER', 'ADMIN'];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => this.users.set(users));
  }

  isCurrentUser(user: User): boolean {
    return user.email === this.userService.currentUser()?.email;
  }

  changeRole(user: User, roleName: string): void {
    this.userService.updateUserRole(user.userId, roleName).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Failed to update role', err),
    });
  }
}
