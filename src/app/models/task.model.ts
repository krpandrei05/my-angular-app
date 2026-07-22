export interface Task {
  taskId?: number;
  taskName: string;
  statusTypeId: string;
  userId: number;
  dueDate: string;
  createdBy?: string;
  creationDate?: string;
}
