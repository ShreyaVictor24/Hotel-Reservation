import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;  // To track loading state

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const postData = form.value;
      this.loading = true;  // Set loading to true while waiting for the response

      this.http.post<any>('https://hotel-booking-380ab-default-rtdb.firebaseio.com/post.json', postData)
      .subscribe(
        response => {
          this.loading = false;  // Reset loading when the response is received

          // Show popup regardless of success or failure
          if (response.success) {
            alert('Login successful!');
          } else {
            alert('Login successful!');
          }

          // Navigate to home page regardless of the result
          this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
          console.error('Error occurred during login:', error);

          // Show generic popup for any error
          alert('An error occurred. Please try again.');

          // Navigate to home page regardless of the error
          this.router.navigate(['/home']);
        }
      );
    }
  }

  togglePasswordVisibility(event: Event): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if ((event.target as HTMLInputElement).checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
