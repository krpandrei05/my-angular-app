import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface StatusType {
  statusTypeId: string;
  statusName: string;
  createdBy: string;
  creationDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class StatusTypeService {
  private http = inject(HttpClient);

  getStatuses() {
    return this.http.get<StatusType[]>('http://localhost:8080/statuses');
  }
}
