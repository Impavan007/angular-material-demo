import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,   // This is required for mat-error to work
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        response => {
          console.log('User logged in successfully:', response);

          // Save only the session token from the response
          const token = response.token; // Extract the token from the response
          if (token) {
            localStorage.setItem('sessionToken', token); 

            // Check if the token is successfully stored and navigate
            if (localStorage.getItem('sessionToken')) {
              this.router.navigate(['/homepage']);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        error => {
          console.error('Error logging in:', error);
        }
      );
    }
  }
}
