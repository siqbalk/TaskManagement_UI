import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/core/models/task-model';
import { TaskService } from 'src/app/core/services/task.service';
import { NotificationService } from 'src/app/shared/services/notification.sevice';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent implements OnInit {
  public tasks: TaskModel[] = [];
  public tasksCount: number = 0;
  public taskId: number = 0;
  constructor(
    private taskService: TaskService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTaskList().subscribe(
      (response: any) => {
        this.tasks = response.responseData;
        this.tasksCount = response.responseData.resultsCount;
      },
      (err) => console.error(err)
    );
  }

  editTask(task: number) {
    this.taskId = task;
  }

  hanldeLoadTaskEvent() {
    this.getTaskList();
  }

  deleteTask(taskId: number) {
    this.notification.delete().then(async (result) => {
      if (result.value) {
        this.taskService.deleteTask(taskId).subscribe(
          (Response: any) => {
            this.notification.success('Task has been deleted successfully');
            this.getTaskList();
          },
          (error) => {}
        );
      }
    });
  }
}
