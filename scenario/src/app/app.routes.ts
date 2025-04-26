// No need to change this file
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './auth.gaurd';
export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/tasks' },
];
