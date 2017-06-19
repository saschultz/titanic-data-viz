import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { PassengerService } from './passenger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PassengerService]
})
export class AppComponent {

 passengers: FirebaseListObservable<any[]>;

 constructor(private passengerService: PassengerService) {}

  ngOnInit() {
  this.passengers = this.passengerService.getPassengers();
}

  title = 'titanic page';
}
