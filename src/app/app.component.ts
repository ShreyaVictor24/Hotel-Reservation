import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,HomePageComponent,LoginComponent,ReservationFormComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'HotelBooking';
  constructor(private http:HttpClient){}

  ngOnInit(): void { }

  onCreatePost(postData: {title:string; content:string}) {
    this.http.post('https://hotel-booking-380ab-default-rtdb.firebaseio.com/post.json', postData).subscribe(responseData =>{
      console.log(responseData);
    });
  }

  onCreateReservation(reservationData: any) {
    this.http.post('https://hotel-booking-380ab-default-rtdb.firebaseio.com/reservation.json', reservationData)
      .subscribe(responseData => {
        console.log('Reservation Response:', responseData);
      }, error => {
        console.error('Error:', error);
      });
  }



  }

