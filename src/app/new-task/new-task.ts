import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task, TaskService } from '../services/task.service';
import { StatusType, StatusTypeService } from '../services/status-type.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask implements OnInit {
  private taskService = inject(TaskService);
  private statusTypeService = inject(StatusTypeService);
  private userService = inject(UserService);
  activeModal = inject(NgbActiveModal);

  @Input() task?: Task;

  statuses = signal<StatusType[]>([]);
  users = signal<User[]>([]);

  formModel: Task = {
    taskName: '',
    statusTypeId: '',
    userId: 0,
    dueDate: '',
  };

  get isEditMode(): boolean {
    return !!this.task;
  }

  ngOnInit(): void {
    this.statusTypeService.getStatuses().subscribe((res) => this.statuses.set(res));
    this.userService.getUsers().subscribe((res) => this.users.set(res));

    if (this.task) {
      this.formModel = {
        ...this.task,
        dueDate: this.task.dueDate ? this.task.dueDate.substring(0, 16) : '',
      };
    }
  }

  save(): void {
    const payload: Task = {
      ...this.formModel,
      userId: Number(this.formModel.userId),
    };

    if (this.isEditMode && this.task?.taskId) {
      this.taskService.updateTask(this.task.taskId, payload).subscribe((result) => {
        this.activeModal.close(result);
      });
    } else {
      this.taskService.createTask(payload).subscribe((result) => {
        this.activeModal.close(result);
      });
    }
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
