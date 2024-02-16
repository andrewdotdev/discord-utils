import * as fs from 'node:fs';
import * as path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as colors from 'colors';

export async function Subir(path: string, token: string, clientId: string) {
    const commands = new Array();

    fs.readdirSync(path + "/").forEach((dir) => {
        const slashcommandsFiles = fs.readdirSync(path + "/" + dir).filter(file => file.match(/\.(ts|js)$/));
        for (const file of slashcommandsFiles) {
            try {
                const slash = require(path + "/" + dir + "/" + file + "/");
                if (slash && slash.data) {
                    commands.push(slash.data.toJSON());
                } else {
                    const date = new Date();
                    throw new Error(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + ' ' + colors.red(__dirname) + colors.red(` Data is not defined on ${file}`))
                }
            } catch (err) {
                const date = new Date();
                throw new Error(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + ' ' + colors.red(__dirname) + colors.red(` I got an error pushing ${file}`))
            }
        }
    });
    const rest = new REST({ version: "9" }).setToken(token);

    createSlash();

    async function createSlash() {
        try {
            await rest.put(
                Routes.applicationCommands(clientId), {
                    body: commands
                }
            )
            const date = new Date();
            console.log(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + ' ' + colors.green(__dirname) + colors.green(' Slash Commands Uploaded'))
        } catch (err) {
            throw new Error(`${err}`)
        }
    }
}
