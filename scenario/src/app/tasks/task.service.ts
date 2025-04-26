import { Injectable } from '@angular/core';
import { Task, TaskAndId } from './task-types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  private tasksSubject = new BehaviorSubject<Array<TaskAndId>>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getTasks(): Observable<Array<TaskAndId>> {
    this.refreshTasks();
    return this.tasks$;
  }

  refreshTasks() {
    this.http.get<Array<TaskAndId>>(this.apiUrl).subscribe({
      next: (tasks) => this.tasksSubject.next(tasks),
    });
  }

  /*
   * This is the only function that you'll need to change in this service.
   * It should update an already existing task entry with new information entered by the user
   */
  updateTask(id: string, task: Task): void {
    this.http.put(`${this.apiUrl}/${id}`, { task: task }).subscribe({
      next: () => {
        this.refreshTasks();
      },
    });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  createTask(newTask: Task): void {
    this.http.post(this.apiUrl, { task: newTask }).subscribe({
      next: () => {
        this.refreshTasks();
      },
    });
  }

  deleteTask(index: string): void {
    this.http.delete(`${this.apiUrl}/${index}`).subscribe({
      next: () => {
        this.refreshTasks();
      },
    });
  }
}
