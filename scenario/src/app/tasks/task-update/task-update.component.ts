import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-update.component.html',
})
export class TaskUpdateComponent {
  /*
   * Implement your update functionality in this component
   */

  constructor(private taskService: TaskService) {}
}
