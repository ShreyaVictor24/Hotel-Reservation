import { Component, OnInit } from '@angular/core'; // Add OnInit
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit { // Implement OnInit interface
  reservationData = {
    checkInDate: '',
    checkOutDate: '',
    adultCount: 1,
    childrenCount: 0,
    roomType: 'single-room'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // This method will be called when the component is initialized
    console.log('ReservationComponent initialized');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const postData = form.value; // Extract the form values
      console.log('Reservation Data:', postData);

      this.http.post('https://hotel-booking-380ab-default-rtdb.firebaseio.com/reservation.json', postData)
        .subscribe(
          response => {
            console.log('Response:', response);
          },
          error => {
            console.error('Error:', error);
          }
        );
    }
  }
  onFetchReservations() {
    this.http.get<{ [key: string]: any }>('https://hotel-booking-380ab-default-rtdb.firebaseio.com/reservation.json')
      .subscribe(reservations => {
        const reservationArray = [];
        for (const key in reservations) {
          if (reservations.hasOwnProperty(key)) {
            reservationArray.push({ ...reservations[key], id: key });
          }
        }
        console.log('Fetched Reservations:', reservationArray);
      }, error => {
        console.error('Error fetching reservations:', error);
      });
  }
}
