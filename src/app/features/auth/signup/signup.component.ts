import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewUser } from '../../../shared/models/new-user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FloatLabelModule,
    FluidModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.loading = true;

    const newUser = new NewUser();

    newUser.firstName = this.signupForm.value.firstName;
    newUser.lastName = this.signupForm.value.lastName;
    newUser.email = this.signupForm.value.email;
    newUser.password = this.signupForm.value.password;

    this.authService
      .signup(newUser)
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Account Created',
            detail: 'Your account has been created successfully. Please login.',
          });

          this.router.navigate(['login']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status)
            this.messageService.add({
              severity: 'error',
              summary: 'Request Failed',
              detail: 'Something went wrong, please try again later.',
            });
        },
      })
      .add(() => {
        this.loading = false;
      });

    console.log(this.signupForm.value);
  }
}
