import { Component, inject, signal } from '@angular/core';
import { TextInput } from '../../../../core/components/text-input/text-input';
import { form, required } from '@angular/forms/signals';
import { AuthStore } from '../../store/auth.store';
import { PasswordInput } from '../../../../core/components/password-input/password-input';

@Component({
  selector: 'app-login',
  imports: [TextInput, PasswordInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly authStore = inject(AuthStore);

  private readonly loginModel = signal({
    username: '',
    password: '',
  });
  protected readonly loginForm = form(this.loginModel, (schemePath) => {
    required(schemePath.username, { message: 'Username is required!' });
    required(schemePath.password, { message: 'Password is required!' });
  });

  onLogin() {
    const { username, password } = this.loginForm().value();

    this.authStore.login({
      username,
      password,
    });
  }
}
