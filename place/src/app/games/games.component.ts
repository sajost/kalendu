import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game';
import { ActivatedRoute } from '@angular/router';
import { map, tap, flatMap, mergeMap, concatMap } from 'rxjs/operators';
import { Place } from '../model/place';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  place: Place;

  constructor(
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.route.data
        .pipe(
          map(data => {
            const rdata = data['data'];
            // let rdata = data['games'];
            return rdata;
          }),
          // tap(data => console.log(data)),
        )
        .subscribe(
          (data) => {
            this.place = data[0];
            this.games = data[1];
          }
        );
    }

}
