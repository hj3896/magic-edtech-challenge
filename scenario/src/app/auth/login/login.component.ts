// No need to change this file
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../auth-types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected user: User = {
    username: '',
    password: '',
  };

  constructor(private loginService: AuthService) {}

  protected onSubmit(): void {
    this.loginService.login(this.user);
    this.user = {
      username: '',
      password: '',
    };
  }
}
