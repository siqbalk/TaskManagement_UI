import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endPoint = 'TaskManagement';
  constructor(private api: ApiService) {}
  getTask(id: number): Observable<any> {
    return this.api.get(`${this.endPoint}/task/?id=${id}`);
  }

  createTask(userObject: any) {
    return this.api.post(`${this.endPoint}/addUpdate`, userObject);
  }

  deleteTask(id: number) {
    return this.api.delete(`${this.endPoint}/DeleteTask/?id=${id}`);
  }

  getTaskList() {
    return this.api.get(`${this.endPoint}/taskList`);
  }

  updateTask(userObject: any): Observable<any> {
    return this.api.post(`${this.endPoint}/addUpdate`, userObject);
  }
}
