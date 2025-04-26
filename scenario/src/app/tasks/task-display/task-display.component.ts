// No need to change this file
import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskAndId } from '../task-types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-display.component.html',
})
export class TaskDisplayComponent {
  protected tasks$: Observable<Array<TaskAndId>>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }
}
