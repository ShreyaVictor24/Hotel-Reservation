import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  userData = {
    username: '',
    phoneNumber: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      console.log('Form Data:', this.userData);

      this.http.post('https://hotel-booking-380ab-default-rtdb.firebaseio.com/newuser.json', this.userData).subscribe(
        response => {
          console.log('User created successfully:', response);
        },
        error => {
          console.error('Error creating user:', error);
        }
      );
    }
  }}
