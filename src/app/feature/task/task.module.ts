import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddEditTaskComponent,
    TasklistComponent
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [TasklistComponent , AddEditTaskComponent]
})
export class TaskModule { }
