export class Sport {
    id: number;
    title: string = '';
    typ: string = "soccer"

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
