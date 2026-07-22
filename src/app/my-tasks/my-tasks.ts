import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { StatusTypeService } from '../services/status-type.service';
import { NewTask } from '../new-task/new-task';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-tasks',
  imports: [],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private taskService = inject(TaskService);
  private statusTypeService = inject(StatusTypeService);
  private userService = inject(UserService);
  private modalService = inject(NgbModal);

  tasks = signal<Task[]>([]);
  private statusMap = new Map<string, string>();
  private userMap = new Map<number, string>();

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    forkJoin({
      tasks: this.taskService.getTasks(),
      statuses: this.statusTypeService.getStatuses(),
      users: this.userService.getUsers(),
    }).subscribe(({ tasks, statuses, users }) => {
      this.statusMap = new Map(statuses.map((s) => [s.statusTypeId, s.statusName]));
      this.userMap = new Map(users.map((u) => [u.userId, u.username]));
      const sorted = [...tasks].sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
      );

      this.tasks.set(sorted);
    });
  }

  getStatusName(statusTypeId: string): string {
    return this.statusMap.get(statusTypeId) ?? statusTypeId;
  }

  getUserName(userId: number): string{
    return this.userMap.get(userId) ?? String(userId);
  }

  openNewTaskModal(): void {
    const modalRef = this.modalService.open(NewTask);
    modalRef.result.then(
      () => this.loadTasks(),
      () => {},
    );
  }

  openEditTaskModal(task: Task): void {
    const modalRef = this.modalService.open(NewTask);
    modalRef.componentInstance.task = task;
    modalRef.result.then(
      () => this.loadTasks(),
      () => {},
    );
  }

  deleteTask(task: Task): void {
    if (!task.taskId) {
      return;
    }
    this.taskService.deleteTask(task.taskId).subscribe(() => this.loadTasks());
  }
}
