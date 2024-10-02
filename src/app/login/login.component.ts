import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define an interface for your form data
interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const postData: LoginForm = form.value; // Type the postData variable
      console.log('onSubmit called with', postData);

      this.http.post('https://hotel-booking-380ab-default-rtdb.firebaseio.com/post.json', postData)
        .subscribe(
          responseData => {
            console.log('Response Data:', responseData);
          },
          error => {
            console.error('Error:', error);
          }
        );
    }
  }

  togglePasswordVisibility(event: Event): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if ((event.target as HTMLInputElement).checked) {
        passwordInput.type = 'text'; // Show password
    } else {
        passwordInput.type = 'password'; // Hide password
    }
}

}
