import { Injectable } from '@angular/core';
import { Place } from '../model/place';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { FbService } from '../services/fb.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  // lastId = 0;

  // places: Place[] = [];

  constructor(
    private api: ApiService,
    private fb: FbService
  ) {

  }

  uid(): string {
    return this.fb.uid();
  }

  // Simulate POST /places
  addPlace(place: Place): Observable<Place> {
    return this.api.createPlace(place);
  }

  // Simulate DELETE /places/:id
  deletePlaceById(placeId: number): Observable<Place> {
    return this.api.deletePlaceById(placeId);
  }

  // Simulate PUT /places/:id
  updatePlace(place: Place): Observable<Place> {
    return this.api.updatePlace(place);
  }

  // GET /places
  getAllPlaces(): Observable<Place[]> {
    console.log('place-data-all');
    const r = this.fb.getAllPlaces();
    console.log(r);
    return r;
  }

  // Simulate GET /places/:id
  getPlaceById(placeId: string): Observable<Place> {
    return this.fb.getPlaceById(placeId);
  }

  // Simulate GET /groups/:id/places/:id
  getPlaceByGroupId(groupId: string): Observable<Place> {
    return this.fb.getPlaceByGroupId(groupId);
  }

  // Toggle complete
  togglePlaceStatus(place: Place, status: number) {
    place.status = status;
    return this.api.updatePlace(place);
  }
}
