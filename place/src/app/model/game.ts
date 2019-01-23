import { Group } from './group';
import { Place } from './place';
import { Member } from './member';
// import * as firebase from 'firebase';

export class Game {
    id: string;
    title: string;
    dt: Date;
    dd: Date; // deadline

    min: number;
    max: number;
    deadline: number;
    play: number;
    // t: Date;
    group_id: string;
    group: Group;
    place_id: string;
    place: Place;
    members: Member[] = [];
    // dtd: Date;
    dtt: { 'hour': number; 'minute': number; 'second': number; };
    // ddd: Date;
    ddt: { 'hour': number; 'minute': number; 'second': number; };

    constructor(values: any = {}) {
        Object.assign(this, values);
        // INFO: special case for firebase.firestore.Timestamp
        if (values.dt && values.dt.seconds) { this.dt = new Date(values.dt.seconds * 1000); }
        if (values.dd && values.dd.seconds) { this.dd = new Date(values.dd.seconds * 1000); }
    }

    toJSON() {
        const r = Object.assign({}, this);
        // r.dtd = this.dt; // .toISOString();
        // r.ddd = this.dd; // .toISOString();
        return r;
    }

    public addMember(member) {
        this.members.push(member);
    }
}

