import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  getTasks() {
    return this.http.get<Task[]>('http://localhost:8080/tasks');
  }

  createTask(task: Task) {
    return this.http.post<Task>('http://localhost:8080/tasks', task);
  }

  updateTask(taskId: number, task: Task) {
    return this.http.put<Task>(`http://localhost:8080/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`http://localhost:8080/tasks/${taskId}`);
  }

  searchTasks(filters: {
    taskName?: string;
    statusName?: string;
    username?: string;
    dueDate?: string;
  }) {
    let params = new HttpParams();
    if (filters.taskName) params = params.set('taskName', filters.taskName);
    if (filters.statusName) params = params.set('statusName', filters.statusName);
    if (filters.username) params = params.set('username', filters.username);
    if (filters.dueDate) params = params.set('dueDate', filters.dueDate);

    return this.http.get<Task[]>('http://localhost:8080/tasks/search', { params });
  }
}
