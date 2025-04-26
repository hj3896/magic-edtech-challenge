// No need to change this file
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../auth-types';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  protected user: User = {
    username: '',
    password: '',
  };

  protected repassword: string = '';

  constructor(private loginService: AuthService) {}

  protected onSubmit(): void {
    if (this.repassword !== this.user.password) {
      //error
      return;
    }

    this.loginService.register(this.user);
    this.user = {
      username: '',
      password: '',
    };
    this.repassword = '';
  }
}
