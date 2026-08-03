import { Component, inject, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { User } from '../models/user.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, NgbDropdownModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  protected userService = inject(UserService);
  protected taskService = inject(TaskService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

  exportTasks(format: 'CSV' | 'EXCEL'): void {
    this.taskService.exportTasks(format).subscribe({
      next: (blob) => this.downloadBlob(blob, format),
      error: (err) => console.error('Failed to export tasks', err),
    });
  }

  triggerImport(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.taskService.importTasks(file).subscribe({
      next: () => console.log('Tasks imported successfully'),
      error: (err) => console.error('Failed to import tasks', err),
    });

    input.value = ''; // reset, ca să poți re-selecta același fișier ulterior
  }

  private downloadBlob(blob: Blob, format: 'CSV' | 'EXCEL'): void {
    const extension = format === 'CSV' ? 'csv' : 'xlsx';
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
