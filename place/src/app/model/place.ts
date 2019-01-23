import {Sport} from './sport';

export class Place {
    id: string;
    title = '';
    info = '';
    city = '';
    zip = '';
    state = '';
    street = '';
    nr = '';
    status = 1;
    sports: Sport[] = [];

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}


