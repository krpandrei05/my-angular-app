import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Task {
  taskId?: number;
  taskName: string;
  statusTypeId: string;
  userId: number;
  dueDate: string;
  createdBy?: string;
  creationDate?: string;
}

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
}
