import colors from 'colors';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import "discord.js";
import { searchFilesRecursive } from "taskwizard";
import { Client } from 'discord.js';

interface Config {
    slashFolder: string;
    token: string;
    clientDjs: Client<boolean>;
    clientId: string;
    eventsFolder?: string;
}


export class DiscordUtils {
    public slashFolder: string;
    public token: string;
    public clientId: string;
    public clientDjs: Client<boolean>;
    
    /**
     * Los constuctores son metodos que se ejecutan al instanciar una clase es decir cuando haces:
     * const discordUtils = new DiscordUtils({slashFolder: './slash', token: 'token', clientId: 'clientId'})
     * eso que esta dento de los parentesis es el constuctor, y este se ejecuta cuando se instancia la clase
     * en nuestro caso lo que hace es:
     * 
     */
    constructor(config: Config) {
        // comprobar que los datos requeridos esten presentes
        if(!config.clientDjs) throw new Error(colors.red("The Client<boolean> of Discord.js is required"))
        if (!(config.clientDjs instanceof Client) || typeof config.clientDjs.options.intents === "undefined") {
            throw new Error(colors.red("clientDjs must be an instance of Client<boolean>"));
        }
        
        if (!config.slashFolder) throw new Error(colors.red('Slash Folder is required'));
        if (!config.token) throw new Error(colors.red("The bot token is required"));
        if (!config.clientId) throw new Error(colors.red("The clientId is required"));
        // if (!(typeof config.clientId === "number")) throw new Error(colors.red("The clientId needs to be a Int"))

        /**
         * asignar VALORES a las propiedades de la clase
         * esto es lo equivalente a hacer:
         * const objetc =  {}
         * object.slashFolder = config.slashFolder
         * 
         * pero claro aqui lo hacemos en una clase
         * y this hace referencia a la instancia de la clase, es como:
         * DiscordUtils.slashFolder = config.slashFolder pero claro solo se coloca this
         */ 
        this.slashFolder = config.slashFolder;
        this.token = config.token;
        this.clientDjs = config.clientDjs;
        this.clientId = config.clientId;
    }

    public async login(): Promise<void> {
        const { token, clientDjs } = this;
        try {
            await clientDjs.login(token);
            if (clientDjs.user) {
                const date = new Date();
                console.log(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.green(` Logged in as ${clientDjs.user.username}`));
            } else {
                const date = new Date();
                throw new Error(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.red(' Logged in'));
            }
        } catch (err) {
            const date = new Date();
            throw new Error(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.red(` Logging failed. More information: ${err}`));
        }
    }
    

    public async slashCreate(): Promise<void> {
        const { slashFolder, token, clientId } = this;
        const commands: any[] = [];
        
        const rest = new REST({ version: "10" }).setToken(token);
        const commandsFiles = await searchFilesRecursive(slashFolder);
        for (const file of commandsFiles) {
            const command = await import(file).catch(() => {});
            if (!command?.data) continue;
            commands.push(command.data.toJSON());
         
        }
        await createSlash();
    
        async function createSlash() {
            try {
                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: commands
                    }
                )
                const date = new Date();
                console.log(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + '' + colors.green(' Slash Commands Uploaded'))
            } catch (err) {
                throw new Error(`${err}`)
            }
        }
    }

    // aqui puedes añadir mas metodos
    
}