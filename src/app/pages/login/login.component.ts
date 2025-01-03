import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgIf } from '@angular/common';
import { SiteListComponent } from '../site-list/site-list.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  inputType: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'pi-eye-slash';

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'pi-eye') : (this.eyeIcon = 'pi-eye-slash');
    this.isText ? (this.inputType = 'text') : (this.inputType = 'password');
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  authService = inject(AuthService);
  router = inject(Router);
  toast = inject(HotToastService);

  submit() {
    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: (message) => `Login failed: ${message}`,
        }),
        tap(() => {
          // Store user data in local storage
          localStorage.setItem('user', JSON.stringify({ email, password }));
        })
      )
      .subscribe(() => {
        this.router.navigate(['/site-list']);
      });
    console.log(this.loginForm.value);
  }

  // async submit() {
  //   if (this.loginForm.valid) {
  //     try {
  //       const { email, password } = this.loginForm.value;
  //       this.authService.login(email, password);
  //       this.router.navigate(['/home']);
  //     } catch (error) {
  //       console.error('Login failed:', error);
  //     }
  //   }
  // }
}
