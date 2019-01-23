import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../model/group';
import { Place } from '../model/place';

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  styleUrls: ['./group-list-item.component.css']
})
export class GroupListItemComponent implements OnInit {

  @Input() group: Group;
  @Input() place: Place;

  constructor() { }

  ngOnInit() {
  }

}
