import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Page } from '../models/page.model';

export type FileFormat = 'CSV' | 'EXCEL';
export type SortBy = 'taskId' | 'user' | 'taskName' | 'dueDate';
export type SortDir = 'ASC' | 'DESC';

export interface PageParams {
  page: number;
  size: number;
  sortBy: SortBy;
  sortDir: SortDir;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  getTasks(pageParams: PageParams){
    const params = this.buildPageParams(pageParams);
    return this.http.get<Page<Task>>('/tasks', { params });
  }

  createTask(task: Task) {
    return this.http.post<Task>('/tasks', task);
  }

  updateTask(taskId: number, task: Task) {
    return this.http.put<Task>(`/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`/tasks/${taskId}`);
  }

  searchTasks(filters: {
    taskName?: string;
    statusName?: string;
    username?: string;
    dueDate?: string;
  }, pageParams: PageParams) {
    let params = this.buildPageParams(pageParams);
    if (filters.taskName) params = params.set('taskName', filters.taskName);
    if (filters.statusName) params = params.set('statusName', filters.statusName);
    if (filters.username) params = params.set('username', filters.username);
    if (filters.dueDate) params = params.set('dueDate', filters.dueDate);

    return this.http.get<Page<Task>>('/tasks/search', { params });
  }

  exportTasks(format: FileFormat) {
    const params = new HttpParams().set('format', format);
    return this.http.get('/tasks/export', {
      params,
      responseType: 'blob',
    });
  }

  importTasks(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('/tasks/import', formData);
  }

  private buildPageParams(pageParams: PageParams): HttpParams {
    return new HttpParams()
      .set('page', pageParams.page)
      .set('size', pageParams.size)
      .set('sortBy', pageParams.sortBy)
      .set('sortDir', pageParams.sortDir)
  }
}
