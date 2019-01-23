import { Place } from './place';

export class Group {
    id: string;
    title = '';
    min: number;
    max: number;
    deadline: number;
    place_id: string;
    place: Place;
    camisole = false;
    ball = false;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
