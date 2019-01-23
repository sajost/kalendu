import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { GameDataService } from '../data-service/game-data.service';
import { PlaceDataService } from '../data-service/place-data.service';
import { concatMap, map, tap, flatMap } from 'rxjs/operators';
import { GroupDataService } from '../data-service/group-data.service';

@Injectable()
export class ResolverMembersGame implements Resolve<Observable<any>> {

    constructor(
        private gameDataService: GameDataService,
        private placeDataService: PlaceDataService,
        private groupDataServer: GroupDataService
    ) {
    }

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.gameDataService
            .getGameById(route.paramMap.get('id'))
            .pipe(
                flatMap(game => {
                    return forkJoin(
                        of(game),
                        this.groupDataServer.getGroupById(game.group_id),
                        this.placeDataService.getPlaceById(game.place_id)
                    );
                })
            );
    }
}
