import { slashCreate } from './classes/Slash.ts';

export class Util {
    constructor() {
        // void
    }

    slashCreate(path: string, token: string, clientId: string) {
        slashCreate(path, token, clientId)
    }
}

