import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Group } from '../model/group';
import { GroupDataService } from '../data-service/group-data.service';
import { PlaceDataService } from '../data-service/place-data.service';

@Injectable()
export class ResolverGroups implements Resolve<Observable<Group[]>> {

    constructor(
        private groupDataService: GroupDataService,
        private placeDataService: PlaceDataService
    ) {
    }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        // console.log(route.queryParams['place_id']);
        // console.log(this.groupDataService.getAllGroupsByPlace(route.queryParams['place_id']));
        return forkJoin([
            this.placeDataService.getPlaceById(route.queryParams['place_id']),
            this.groupDataService.getAllGroupsByPlace(route.queryParams['place_id']),
        ])
        // return this.groupDataService.getAllGroupsByPlace(route.queryParams['place_id']);
    }
}
