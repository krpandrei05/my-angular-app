import { HttpClient } from '@angular/common/http';
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
}
