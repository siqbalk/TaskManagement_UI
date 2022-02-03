import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from 'src/app/core/models/task-model';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskStatus } from 'src/app/shared/enums/task-enum';
import { NotificationService } from 'src/app/shared/services/notification.sevice';
import { TaskModule } from '../../task.module';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit ,OnChanges {
  public isSubmitted: boolean = false;
  @Output() loadTasks: EventEmitter<any> = new EventEmitter<any>();
  @Input() taskId: number = 0;
  public task: TaskModel | undefined;
  public createTaskForm: FormGroup = new FormGroup({
    taskName: new FormControl(null, [Validators.required]),
  });
  constructor(
    private taskService: TaskService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges() : void {
    if (this.taskId > 0) this.patchFormValue();
  }
  handleCreateTask() {
    this.isSubmitted = true;
    if (
      this.createTaskForm.invalid == true ||
      this.createTaskForm.status.toLowerCase() != 'valid'
    ) {
      this.createTaskForm.markAllAsTouched();
      return;
    }
    this.CreateUpdate();
  }

  patchFormValue() {
    this.getTask();
    this.createTaskForm.patchValue({
      taskName: this.task?.taskName,
    });
  }

  getTask() {
    this.taskService.getTask(this.taskId).subscribe(
      (response: any) => {
        this.task = response.responseData;
      },
      (err) => console.error(err)
    );
  }

  CreateUpdate() {
    let msg = '';
    let formObj = this.createTaskForm.value;
    var taskToCreate = {
      taskName: formObj.taskName,
      status: TaskStatus.Active,
      taskId: this.taskId,
    };
    this.taskService.createTask(taskToCreate).subscribe(
      (response) => {
        if (this.task?.taskEntityId == 0){
          msg = 'Task Created Successfully';
        }
        else {
          msg = 'Task Updated Successfully';
          this.taskId = 0;
        }

        this.notification.success(msg);
        this.loadTasks.emit();
      },
      (err) => {}
    );
  }
}
