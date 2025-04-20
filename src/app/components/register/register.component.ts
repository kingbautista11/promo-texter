import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator() }
  );

  showEmailError: boolean = false;
  showPasswordError: boolean = false;
  showNameError: boolean = false;
  showConfirmError: boolean = false;
  emailInvalid: boolean = false;

  nameErrorMessage: string = 'Name is required';
  emailErrorMessage: string = 'Email is required';
  passwordErrorMessage: string = 'Password is required';
  confirmErrorMessage: string = 'Passwords do not match';
  showPasswordRequirements: boolean = false;

  showPassword = false;
  showConfirmPassword = false;
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid) return;

    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(name ?? '', email ?? '', password ?? '').subscribe({
      next: () => {
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.snackBar.open(`Error: ${error.message}`, 'Close', {
          duration: 3000,
        });
      },
    });
  }
  onSignUp() {
    if (this.signUpForm.get('name')?.value === '') {
      this.showNameError = true;
    } else {
      this.showNameError = false;
    }

    if (this.signUpForm.get('email')?.value === '') {
      this.showEmailError = true;
      this.emailErrorMessage = 'Email is required';
    } else {
      this.showEmailError = false;
      this.emailErrorMessage = '';
    }

    if (this.signUpForm.get('password')?.value === '') {
      this.showPasswordError = true;
      this.passwordErrorMessage = 'Password is required';
    } else {
      this.showPasswordError = false;
      this.passwordErrorMessage = '';
    }

    if (this.signUpForm.get('confirmPassword')?.value === '') {
      this.showConfirmError = true;
    } else {
      this.showConfirmError = false;
    }

    if (
      this.signUpForm.get('password')?.value !==
      this.signUpForm.get('confirmPassword')?.value
    ) {
      this.showConfirmError = true;
    } else {
      this.showConfirmError = false;
    }

    if (this.signUpForm.get('email')?.value !== '') {
      if (
        !(this.signUpForm.get('email')?.value ?? '').match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
      ) {
        this.emailInvalid = true;
        this.emailErrorMessage = 'Invalid email address';
      } else {
        this.emailInvalid = false;
        this.emailErrorMessage = '';
      }
    }

    if (this.signUpForm.get('password')?.value !== '') {
      if (
        !(this.signUpForm.get('password')?.value ?? '').match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      ) {
        this.passwordErrorMessage = 'Invalid password format';
        this.showPasswordError = true;
      } else {
        this.passwordErrorMessage = '';
        this.showPasswordError = false;
      }
    }

    if (
      this.signUpForm.valid &&
      !this.showNameError &&
      !this.showEmailError &&
      !this.showPasswordError &&
      !this.showConfirmError &&
      !this.emailInvalid
    ) {
      const { name, email, password } = this.signUpForm.value;
      this.authService
        .signUp(name ?? '', email ?? '', password ?? '')
        .subscribe({
          next: () => {
            this.snackBar.open('Registration successful!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.snackBar.open(`Error: ${error.message}`, 'Close', {
              duration: 3000,
            });
          },
        });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
