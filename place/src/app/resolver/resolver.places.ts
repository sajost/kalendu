import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Place } from '../model/place';
import { PlaceDataService } from '../data-service/place-data.service';

@Injectable()
export class ResolverPlaces implements Resolve<Observable<Place[]>> {

    constructor(
        private placeDataService: PlaceDataService
    ) {
    }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Place[]> {
        // return of([new Place()]);
        console.log('ResolverPlaces');
        const r = this.placeDataService.getAllPlaces();
        console.log(r);
        return r;
    }
}
