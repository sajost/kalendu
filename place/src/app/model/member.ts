export class Member {
    id: string;
    nick = '';
    email = '';
    play = 0;  // 1-play, 0-not play, 3-maybe, 9-decline
    camisole = false;
    ball = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
