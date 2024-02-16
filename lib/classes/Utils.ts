import * as fs from 'node:fs';
import { Subir } from './Slash.ts'

function commandsWithSubdir (path: string, token: string) {
    // example of path: path = './commands/' or path = './commands'
    const slashcommands = new Map();
    fs.readdirSync(path + "/").forEach((dir) => {
        const slashcommandsFiles = fs.readdirSync(path + "/" + dir).filter(file => file.match(/\.(ts|js)$/));
        for (const file of slashcommandsFiles) {
            const slash = require(path + "/" + dir + "/" +  file)
            slashcommands.set(slash.data.name, slash)
        }
    });

    Subir(path, token)
}

