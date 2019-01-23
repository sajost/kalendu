import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from '../services/api.service';
import { switchMap, mergeMap, flatMap, tap, map, filter } from 'rxjs/operators';
import { FbService } from '../services/fb.service';
import { Member } from '../model/member';
import { fbind } from 'q';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  // Gameholder for last id so we can simulate
  // automatic incrementing of ids
  lastId = 0;

  games: Game[] = [];

  constructor(private api: ApiService, private fb: FbService) {

  }

  uid(): string {
    return this.fb.uid();
  }

  // POST /games/:id
  createGame(game: Game): Observable<Game> {
    return this.fb.createGame(game);
  }

  // PUT /games/:id
  updateGame(game: Game): Observable<Game> {
    return this.api.updateGame(game);
  }

  // DELETE /games/:id
  removeGame(gameId: string): Observable<Game> {
    return this.fb.removeGame(gameId);
  }

  // Simulate GET /games
  getAllGamesByPlace(place_id: string): Observable<Game[]> {
    return this.api.getAllGamesByPlace(place_id)
      .pipe(
        // tap(data => console.log("1")),
        // tap(data => console.log(data)),
        map(data => {
          // let datas = data['games'];
          let rdata = [];
          data.forEach(da => {
            rdata = rdata.concat(da);
          });
          rdata = rdata.sort(function (a, b) { return b.dt > a.dt ? -1 : b.dt < a.dt ? 1 : 0; });
          rdata = rdata.filter(function (a) { return new Date() < a.dt; });
          // console.log(finalResult)
          return rdata;
        }),
        // tap(data => console.log("2")),
        // tap(data => console.log(data)),
      );
    // .pipe(
    //   flatMap(games => {
    //     // map every user into an array of observable requests
    //     let gamesObservables: Observable<Game>[] = [];
    //     gamesObservables = games.map(game => this.api.getGroupById(game.group_id));
    //     return forkJoin(...gamesObservables);
    //   })
    // );
  }


  // GET /games
  getAllGamesByGroupId(group_id: string): Observable<Game[]> {
    return this.fb.getAllGamesByGroupId(group_id)
      .pipe(
        map(data => {
          // console.log('getAllGamesByGroupId');
          data = data.sort(function (a, b) { return b.dt > a.dt ? -1 : b.dt < a.dt ? 1 : 0; });
          // console.log(data);
          data = data.filter(function (a) { return new Date() < a.dt; });
          // console.log(data);
          return data;
        }),
      );
  }

  // FIXME: better with HTTP request filter!!!
  getLastGameByGroupId(group_id: string): Observable<Game[]> {
    return this.fb.getAllGamesByGroupId(group_id)
      .pipe(
        map(data => {
          const rdata = [];
          if (data.length > 0) {
            data = data.sort(function (a, b) { return b.dt > a.dt ? -1 : b.dt < a.dt ? 1 : 0; });
            data = data.filter(function (a) { return new Date() > a.dt; });
            rdata.push(data[data.length - 1]);
          }
          return rdata;
        }),
      );
  }

  // Simulate GET /games/:id
  getGameById(gameId: string): Observable<Game> {
    return this.fb.getGameById(gameId);
  }

  // Add Member to game
  addMember1(game: Game) {
    return this.fb.updateGame(game);
  }

  // Add Member to game
  updateMember(game: Game, member: Member) {
    return this.fb.updateMember(game, member);
  }

  // Add Member to game
  createMember(game: Game, member: Member) {
    return this.fb.createMember(game, member);
  }

}
