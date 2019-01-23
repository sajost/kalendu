import { Component, OnInit } from '@angular/core';
import { Place } from '../model/place';

import { map, tap, first } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { PlaceDataService } from '../data-service/place-data.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places: Place[] = [];

  constructor(
    private route: ActivatedRoute,
    private placeDataService: PlaceDataService
  ) {

    console.log('places - constructor');
  }

  ngOnInit() {
    console.log('places - ngOnInit');
    // this.placeDataService.getAllPlaces()
    this.route.data
      .pipe(
        // tap(data => console.log('data1')),
        tap(data => console.log(data)),
        map(data => data['places']),
        tap(data => console.log(data)),
      )
      .subscribe(
        (places) => {
          // console.log('subscribe'),
          this.places = places;
        }
      );
    console.log('places - ngOnInit2');
  }

}
