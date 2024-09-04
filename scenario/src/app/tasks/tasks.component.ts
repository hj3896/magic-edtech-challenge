// No need to change this file
import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDisplayComponent } from './task-display/task-display.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { TaskUpdateComponent } from './task-update/task-update.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskCreateComponent, TaskDeleteComponent, TaskDisplayComponent, TaskUpdateComponent],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {

}
