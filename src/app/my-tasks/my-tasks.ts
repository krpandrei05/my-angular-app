import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { StatusTypeService } from '../../services/status-type.service';

export interface Task {
  taskId: number;
  taskName: string;
  statusTypeId: string;
  userId: number;
  dueDate: Date;
  createdBy: string;
  creationDate: Date;
}

export interface TaskView extends Task {
  statusName: string;
}

@Component({
  selector: 'app-my-tasks',
  imports: [],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private taskService = inject(TaskService);
  private statusTypeService = inject(StatusTypeService);

  tasks = signal<TaskView[]>([]);

  ngOnInit(): void {
    forkJoin({
      tasks: this.taskService.getTasks(),
      statuses: this.statusTypeService.getStatuses(),
    }).subscribe(({ tasks, statuses }) => {
      const statusMap = new Map(statuses.map((s) => [s.statusTypeId, s.statusName]));

      const tasksWithStatus: TaskView[] = tasks.map((task) => ({
        ...task,
        statusName: statusMap.get(task.statusTypeId) ?? task.statusTypeId,
      }));

      tasksWithStatus.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

      this.tasks.set(tasksWithStatus);
    });
  }
}
