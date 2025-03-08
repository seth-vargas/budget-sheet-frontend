import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    DividerModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    FluidModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loading = true;

    this.authService
      .login(credentials)
      .subscribe({
        next: (token) => {
          localStorage.setItem('token', JSON.stringify(token));

          this.messageService.add({
            severity: 'success',
            summary: 'Login',
            detail: 'Login successful',
          });

          this.router.navigate(['']);
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandlerService.handleError(error);
        },
      })
      .add(() => (this.loading = false));
  }
}
