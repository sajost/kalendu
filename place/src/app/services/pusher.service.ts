import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


@Injectable()
export class PusherService {

  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub: any, gid: string) {
    console.log('http-sub -> ', sub);
    return this.http.post(environment.pushurl + '/subscription?group=' + gid, sub);
  }

  sendNotifications(sub: any) {
    console.log('post sendNotifications1 - ' + environment.pushurl + '/sendnotifications');
    return this.http.post(environment.pushurl + '/sendnotifications', sub);
    // console.log('post sendNotifications2 - ' + environment.pushurl + '/sendnotifications');
  }
}
