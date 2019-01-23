import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../model/place';

@Component({
  selector: 'app-place-list-item',
  templateUrl: './place-list-item.component.html',
  styleUrls: ['./place-list-item.component.css']
})
export class PlaceListItemComponent implements OnInit {

  @Input() place: Place;

  constructor() { }

  ngOnInit() {
  }

}
