import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signin.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      Role: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formValue = { ...this.signupForm.value };
      formValue.dateOfBirth = this.formatDate(new Date(formValue.dateOfBirth));
      console.log(this.signupForm.value);

      this.signupService.register(formValue).subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/success']); // Navigate to a success page
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
