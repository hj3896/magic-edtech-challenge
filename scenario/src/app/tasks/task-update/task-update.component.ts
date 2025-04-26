import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-update.component.html',
})
export class TaskUpdateComponent {
  protected taskId: string = '';

  protected task: Task = {
    name: '',
    due: new Date().toISOString().substring(0, 10),
    description: '',
    complete: false,
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.updateTask(this.taskId, this.task);
    this.task = {
      name: '',
      due: new Date().toISOString().substring(0, 10),
      description: '',
      complete: false,
    };
  }

  fetchData(): void {
    this.taskService.getTask(this.taskId).subscribe((task) => {
      this.task = {
        ...task,
      };
      this.task.due = new Date(this.task.due).toISOString().substring(0, 10);
    });
  }
}
