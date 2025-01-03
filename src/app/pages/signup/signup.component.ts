import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from '../../services/users.service';
import { NgIf } from '@angular/common';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, RouterLink],
  templateUrl: './signup.component.html',
  styles: ``,
})
export class SignupComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toast = inject(HotToastService);

  private usersService = inject(UsersService);

  inputType: { [key: string]: string } = {
    password: 'password',
    confirmPassword: 'password',
  };
  eyeIcon: { [key: string]: string } = {
    password: 'pi-eye-slash',
    confirmPassword: 'pi-eye-slash',
  };

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    const isText = this.inputType[field] === 'text';
    this.inputType[field] = isText ? 'password' : 'text';
    this.eyeIcon[field] = isText ? 'pi-eye-slash' : 'pi-eye';
  }

  signupForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_-]*$/),
        Validators.minLength(7),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[a-zA-Z0-9_-]*$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordsMatchValidator() }
  );

  get email() {
    return this.signupForm.get('email');
  }
  get username() {
    return this.signupForm.get('username');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  // loginWithGoogle() {
  //   this.authService.loginWithGoogle();
  // }


  submit() {
    const { username, email, password } = this.signupForm.value;

    if (!this.signupForm.valid || !username || !password || !email) {
      return;
    }

    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: username })
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `${message}`,
        }),tap((uid) => {
          // Store user data in local storage
          localStorage.setItem('user', JSON.stringify({ uid, email, username, password })); 
        })
      )      
      .subscribe(() => {
        this.router.navigate(['/site-list']);
      });
    console.log(this.signupForm.value);
  }
}
