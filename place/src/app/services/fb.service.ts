import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, from, forkJoin } from 'rxjs';
import { Place } from '../model/place';
import { Injectable } from '@angular/core';
import { map, mergeMap, combineLatest, tap, first, switchMap, concatMap } from 'rxjs/operators';
import { Group } from '../model/group';
import { Game } from '../model/game';
import { Member } from '../model/member';



@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor(
    private afs: AngularFirestore) {
  }

  public uid(): string {
    return this.afs.createId();
  }

  // API: GET /places
  public getAllPlaces2(): Observable<Place[]> {
    return this.afs.collection<Place>('places').snapshotChanges()
      .pipe(
        map(docs => docs.map(doc => {
          // console.log(doc);
          const data = doc.payload.doc.data() as Place;
          const id = doc.payload.doc.id;
          const r = { id, ...data };
          // console.log(`places/${id}/sports`);
          // console.log(r);
          const place = new Place(r);
          // console.log(place);
          this.afs
            .collection<any>(`places/${id}/sports`)
            .valueChanges().pipe(
              map(sports => {
                // console.log(sports);
                place.sports = sports;
                return place;
                // return { ...r, sports: sports };
              })
            ).subscribe();
          // return r;
          // const places = res as Place[];
          // return places.map((place) => new Place(place));
          return place;
        })),
        first(),
        // tap(data => console.log(data))
      );
  }

  // API: GET /places/:id
  public getPlaceById(placeId: string): Observable<Place> {
    return this.afs.doc<Place>('places/' + placeId).snapshotChanges().pipe(
      map(doc => {
        // console.log(doc);
        const data = doc.payload.data();
        const id = doc.payload.id;
        const r = { id, ...data };
        const place = new Place(r);
        // console.log(`places/${id}/sports`);
        console.log(r);
        return place;
      }),
      first()
    );
  }

  public getAllPlaces(): Observable<any> {
    return this.afs.collection<any>('places').snapshotChanges().pipe(
      map(docs => {
        const res = docs.map(doc => {
          // console.log(doc);
          const data = doc.payload.doc.data(); // as Place;
          const id = doc.payload.doc.id;
          const r = { id, ...data };
          // console.log(`places/${id}/sports`);
          // console.log(r);
          // const place = new Place(r);
          // console.log(place);
          return r;
          // const places = res as Place[];
          // return places.map((place) => new Place(place));
          // return place;
        });
        return res;
        // return concatMap(...res);
      }),
      concatMap(places => {
        // console.log(result);
        // return of([new Place()]);
        // return result;
        const placeObservables = places.map(place => {
          return this.afs
            .collection<any>(`places/${place.id}/sports`)
            .valueChanges().pipe(
              map(sports => {
                // console.log(sports);
                // place.sports = sports;
                // return place;
                const rr = { ...place, sports: sports };
                // console.log(rr);
                return rr;
                // return Object.assign(r, {sports});
              }),
              first()
            );
        });
        return forkJoin(...placeObservables);
      }),
      first()
    );
  }

  // API: GET /groups/:id/places/:id
  public getPlaceByGroupId(groupId: string): Observable<Place> {
    return this.afs.doc<Group>('groups/' + groupId).snapshotChanges().pipe(
      map(doc => {
        const data = doc.payload.data();
        const placeId = data.place_id;
        return placeId;
      }),
      mergeMap(placeId => {
        return this.afs.doc<Place>('places/' + placeId).snapshotChanges().pipe(
          map(doc => {
            // console.log(doc);
            const data = doc.payload.data();
            const id = doc.payload.id;
            const r = { id, ...data };
            const place = new Place(r);
            // console.log(`places/${id}/sports`);
            console.log(r);
            return place;
          })
        );
      }),
      first()
    );
  }


  // ######################################################################
  // ######################################################################
  // API: GET /groups
  public getAllGroupsByPlace(placeId: string): Observable<Group[]> {
    // return this.db.doc<Place>('places/' + placeId).collection<Group>('groups').snapshotChanges().pipe(
    return this.afs.collection<Group>('groups', ref => ref.where('place_id', '==', placeId)).snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        // console.log(doc);
        const data = doc.payload.doc.data() as Group;
        const id = doc.payload.doc.id;
        const r = { id, ...data };
        const group = new Group(r);
        // console.log(r);
        return group;
      })),
      first()
    );
  }

  // API: GET /groups/:id
  public getGroupById(groupId: string): Observable<Group> {
    return this.afs.doc<Group>('groups/' + groupId).snapshotChanges().pipe(
      map(doc => {
        const data = doc.payload.data();
        const id = doc.payload.id;
        const r = { id, ...data };
        return new Group(r);
      }),
      first()
    );
  }

  // API: GET /games/:group_id
  public getAllGamesByGroupId(groupId: string): Observable<Game[]> {
    // console.log('groupId' + groupId);
    return this.afs.collection<Game>('games', ref =>
      ref.where('group_id', '==', groupId)).snapshotChanges().pipe(
        map(docs => docs.map(doc => {
          console.log('getAllGamesByGroupId');
          console.log(doc.payload.doc.data());
          const data = doc.payload.doc.data() as Game;
          // console.log(doc.payload.doc.data());
          const id = doc.payload.doc.id;
          const r = { id, ...data };
          const game = new Game(r);

          console.log(game);
          return game;
        })),
        first()
      );
  }

  // API: GET /games/:id
  public getGameById(gameId: string): Observable<Game> {
    // return this.db.doc<Game>('places/' + gameId).collection<Member>('members').snapshotChanges().pipe(
    return this.afs.doc<Game>('games/' + gameId).snapshotChanges().pipe(
      map(doc => {
        // map(docs => docs.map(doc => {
        const data = doc.payload.data();
        const id = doc.payload.id;
        const r = { id, ...data };
        const game = new Game(r);
        this.afs
          .collection<Member>(`games/${id}/members`)
          .snapshotChanges().pipe(
            map(members => {
              // console.log(sports);
              game.members = members.map((member) => {
                // tslint:disable-next-line:no-shadowed-variable
                const id = member.payload.doc.id;
                return new Member({ id, ...member.payload.doc.data() });
              });
              return game;
              // return { ...r, sports: sports };
            })
          ).subscribe();
        return game;
      }),
      first()
    );
  }

  // API: PUT /games/:id/
  public createGame(game: Game): Observable<Game> {
    this.afs.collection<Game>('games').doc(game.id).set(game.toJSON());
    return of();
  }

  // API: PUT /game/:id
  public updateGame(game: Game): Observable<Game> {
    this.afs.collection<Game>('games').doc(game.id).update(game.toJSON());
    return of();
    // return this.http
    //   .put(API_URL + '/games/' + game.id, game, options)
    //   .pipe(
    //     map(res => {
    //       return new Game(res);
    //     }),
    //     catchError(this.handleError)
    //   );
  }

  // API: PUT /game/:id
  public removeGame(gameId: string): Observable<Game> {
    this.afs.collection<Game>('games').doc(gameId).delete();
    return of();
  }

  // API: PUT /games/:id/members/:id
  public updateMember(game: Game, member: Member): Observable<Game> {
    // console.log(Object.assign({}, member))
    this.afs.collection<Game>('games').doc(game.id).collection('members').doc(member.id).update(Object.assign({}, member));
    return of();
  }

  // API: PUT /games/:id/members/:id
  public createMember(game: Game, member: Member): Observable<Game> {
    // console.log(Object.assign({}, member))
    this.afs.collection<Game>('games').doc(game.id).collection('members').doc(member.id).set(Object.assign({}, member));
    return of();
  }

  // private handleError(error: HttpErrorResponse | any) {
  //     console.error('ApiService::handleError', error);
  //     return throwError(error);
  // }

}
