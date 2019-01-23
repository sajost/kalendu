import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { GameDataService } from '../data-service/game-data.service';
import { PlaceDataService } from '../data-service/place-data.service';

@Injectable()
export class ResolverGames implements Resolve<Observable<any>> {

    constructor(
        private gameDataService: GameDataService,
        private placeDataService: PlaceDataService
    ) {
    }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return forkJoin([
            this.placeDataService.getPlaceById(route.queryParams['place_id']),
            this.gameDataService.getAllGamesByPlace(route.queryParams['place_id'])
        ]);
        // return this.placeDataService.getPlaceById(route.queryParams['place_id'])
        // .pipe(
        //     concatMap(place => {
        //         return this.gameDataService.getAllGamesByPlace(route.queryParams['place_id'])
        //         .pipe(
        //             map(games => {
        //                 games = games.sort(function(a, b) {return b.dt>a.dt ? -1 : b.dt<a.dt ? 1 : 0;}); //FIXME: sort by HTTP-Request
        //                 return {"place":place, "games":games}
        //             }
        //             )
        //         )
        //     }
        //     )
        // )
        // let place = this.placeDataService.getPlaceById(route.queryParams['place_id'])
        // let games = this.gameDataService.getAllGamesByPlace(route.queryParams['place_id']);
        // let data = {place: place, games: games};
        // return of(data);
        // return this.gameDataService.getAllGamesByPlace(route.queryParams['place_id']);
    }
}
