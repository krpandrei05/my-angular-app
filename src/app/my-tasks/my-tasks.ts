import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService, Task } from '../services/task.service';
import { StatusTypeService } from '../services/status-type.service';

@Component({
  selector: 'app-my-tasks',
  imports: [],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private taskService = inject(TaskService);
  private statusTypeService = inject(StatusTypeService);

  tasks = signal<Task[]>([]);
  private statusMap = new Map<string, string>();

  ngOnInit(): void {
    forkJoin({
      tasks: this.taskService.getTasks(),
      statuses: this.statusTypeService.getStatuses(),
    }).subscribe(({ tasks, statuses }) => {
      this.statusMap = new Map(statuses.map((s) => [s.statusTypeId, s.statusName]));

      const sorted = [...tasks].sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
      );

      this.tasks.set(sorted);
    });
  }

  getStatusName(statusTypeId: string): string {
    return this.statusMap.get(statusTypeId) ?? statusTypeId;
  }
}
