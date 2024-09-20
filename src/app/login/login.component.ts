import { Observable } from 'rxjs';
import { Component, OnInit }from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  //providers: [provideHttpClient(withInterceptorsFromDi())],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private http:HttpClient){}

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const postData = form.value; // { username: 'value', password: 'value' }
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

};

