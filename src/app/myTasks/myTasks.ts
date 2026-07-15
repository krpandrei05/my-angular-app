import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasksService';

export interface Task {
    taskId: number;
    taskName: string;
    statusTypeId: string;
    userId: number;
    dueDate: Date;
    createdBy: string;
    creationDate: Date;
}

@Component({
  selector: 'app-my-tasks',
  imports: [],
  templateUrl: './myTasks.html',
  styleUrl: './myTasks.css',
})
export class MyTasks implements OnInit{
  private taskService = inject(TasksService)

  users = [];
  tasks: Task[] = [];

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => { this.tasks = res; })
  }
}
