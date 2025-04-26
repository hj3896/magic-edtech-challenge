// No need to change this file
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, TasksComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {}
