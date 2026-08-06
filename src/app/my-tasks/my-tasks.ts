import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageParams, SortBy, SortDir, TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { StatusTypeService } from '../services/status-type.service';
import { NewTask } from '../new-task/new-task';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { StatusType } from '../models/status-type.model';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-my-tasks',
  imports: [FormsModule],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private taskService = inject(TaskService);
  private statusTypeService = inject(StatusTypeService);
  protected userService = inject(UserService);
  private modalService = inject(NgbModal);

  tasks = signal<Task[]>([]);
  statusTypes = signal<StatusType[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  sortBy = signal<SortBy>('dueDate');
  sortDir = signal<SortDir>('DESC');

  filters = {
    taskName: '',
    statusName: '',
    username: '',
    dueDate: '',
  };

  private statusMap = new Map<string, string>();
  private userMap = new Map<number, string>();

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    forkJoin({
      tasksPage: this.fetchTasksPage(),
      statuses: this.statusTypeService.getStatuses(),
      users: this.userService.getUsers(),
    }).subscribe(({ tasksPage, statuses, users }) => {
      this.statusMap = new Map(statuses.map((s) => [s.statusTypeId, s.statusName]));
      this.statusTypes.set(statuses);
      this.userMap = new Map(users.map((u) => [u.userId, u.username]));
      this.applyTasksPage(tasksPage);
    });
  }

  search(): void {
    this.currentPage.set(0);
    this.reloadTasksOnly();
  }

  resetFilters(): void {
    this.filters = { taskName: '', statusName: '', username: '', dueDate: '' };
    this.currentPage.set(0);
    this.reloadTasksOnly();
  }

  getStatusName(statusTypeId: string): string {
    return this.statusMap.get(statusTypeId) ?? statusTypeId;
  }

  getUserName(userId: number): string {
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

  private reloadTasksOnly(): void {
    this.fetchTasksPage().subscribe((tasksPage) => this.applyTasksPage(tasksPage));
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.reloadTasksOnly();
  }

  changeSort(sortBy: SortBy, sortDir: SortDir): void {
    this.sortBy.set(sortBy);
    this.sortDir.set(sortDir);
    this.currentPage.set(0);
    this.reloadTasksOnly();
  }

  private pageParams(): PageParams {
    return {
      page: this.currentPage(),
      size: 20,
      sortBy: this.sortBy(),
      sortDir: this.sortDir(),
    };
  }

  private hasActiveFilters(): boolean {
    return !!(
      this.filters.taskName ||
      this.filters.statusName ||
      this.filters.username ||
      this.filters.dueDate
    );
  }
  private fetchTasksPage() {
    return this.hasActiveFilters()
      ? this.taskService.searchTasks(this.filters, this.pageParams())
      : this.taskService.getTasks(this.pageParams());
  }

  private applyTasksPage(tasksPage: Page<Task>): void {
    const isPastLastPage =
      tasksPage.content.length === 0 &&
      tasksPage.totalPages > 0 &&
      this.currentPage() >= tasksPage.totalPages;

    if (isPastLastPage) {
      this.currentPage.set(tasksPage.totalPages - 1);
      this.reloadTasksOnly();
      return;
    }

    this.tasks.set(tasksPage.content);
    this.totalPages.set(tasksPage.totalPages);
  }
}
