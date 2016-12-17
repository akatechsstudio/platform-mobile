import { Component, Output, EventEmitter } from '@angular/core';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'field-location',
  templateUrl: 'location.html',
  inputs: ['attribute', 'formGroup']
})
export class LocationComponent {

  key: string = "AIzaSyBjDgMqF6GOdirXn3iFtI6Jlt8jEoWhSq4";
  attribute: any = {};
  latitude: number = 0;
  longitude: number = 0;
  mapPlaceholder: string = "/assets/images/placeholder-map.jpg";
  mapImage: string = null;

  @Output() changeLocation = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.detectLocation();
  }

  detectLocation() {
    console.log(`Location detectLocation`);
    Geolocation.getCurrentPosition().then(
      (position) => {
        console.log(`Location ${JSON.stringify(position)}`);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.mapImage = `https://maps.googleapis.com/maps/api/staticmap`
          + `?center=${this.latitude},${this.longitude}`
          + `&zoom=15&size=300x200&maptype=roadmap&markers=color:red%7C`
          + `${this.latitude},${this.longitude}&key=${this.key}`;
      },
      (error) => {
        console.error(`Location ${JSON.stringify(error)}`);
        this.latitude = null;
        this.longitude = null;
        this.mapImage = null;
      });
  }

  mapClicked(event) {
    console.log(`Location inputClicked`);
    this.changeLocation.emit({
      latitude: this.latitude,
      longitude: this.longitude});
  }
}
