import { Component, inject } from '@angular/core';
import { MyTasks } from '../my-tasks/my-tasks';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-homepage',
  imports: [MyTasks],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  private userService = inject(UserService);

  onLogout(): void {
    this.userService.logout();
  }
}
