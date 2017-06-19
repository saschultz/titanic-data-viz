import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class PassengerService {
  passengers: FirebaseListObservable<any[]>;

  getPassengers(){
  return this.passengers;
  }


  constructor(private database: AngularFireDatabase) {
    this.passengers = database.list('passengers');
  }

}
