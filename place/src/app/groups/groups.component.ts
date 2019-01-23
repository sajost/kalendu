import { Component, OnInit } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Group } from '../model/group';
import { Place } from '../model/place';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];
  place: Place;

  constructor(
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.route.data
        .pipe(
          tap(data => console.log(data)),
          map(data => (data['data'])),
          // tap(data => console.log(data))
        )
        .subscribe(
          (data) => {
            this.place = data[0];
            this.groups = data[1];
          }
        );
    }

}
