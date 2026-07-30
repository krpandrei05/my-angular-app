import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  protected userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      error: (err) => console.error('Failed to load current user', err),
    });
  }
}
