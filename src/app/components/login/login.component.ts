import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CheckboxModule, MatFormFieldModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  showEmailError: boolean = false;
  showPasswordError: boolean = false;

  emailInvalid: boolean = false;
  showPassword = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.get('email')?.value === '') {
      this.showEmailError = true;
    } else {
      this.showEmailError = false;
    }

    if (this.loginForm.get('password')?.value === '') {
      this.showPasswordError = true;
    } else {
      this.showPasswordError = false;
    }
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';
    this.authService.login(email, password).subscribe(
      () => {
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['/home']);
      },
      (error) => {
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
