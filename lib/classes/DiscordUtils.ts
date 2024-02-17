import colors from 'colors';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { searchFilesRecursive } from "taskwizard";
import { Client, ClientOptions } from 'discord.js';

interface Config extends ClientOptions {
    slashFolder: string;
    eventsFolder?: string;
}



export class DiscordUtils extends Client {
    public slashFolder: string;
    public eventsFolder?: string;
    public id: any;
    public clientId: any;
    
    /**
     * Los constuctores son metodos que se ejecutan al instanciar una clase es decir cuando haces:
     * const discordUtils = new DiscordUtils({slashFolder: './slash', token: 'token', clientId: 'clientId'})
     * eso que esta dento de los parentesis es el constuctor, y este se ejecuta cuando se instancia la clase
     * en nuestro caso lo que hace es:
     * 
     */

    constructor(config: Config) {
        super(config as ClientOptions);
        // comprobar que los datos requeridos esten presentes
        if (!config.slashFolder) throw new Error(colors.red('Slash Folder is required'));
        // if (!this.token) throw new Error(colors.red("The bot token is required"));
        // if (!this.id) throw new Error(colors.red("The clientId is required"));
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
        this.token = this.token;
        this.clientId = this.application?.id;
    }

    public override async login(token: string): Promise<any> {
        try {
            await super.login(token);
            if (this.user) {
                const date = new Date();
                console.log(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.green(` Logged in as ${this.user.username}`));
            } else {
                const date = new Date();
                console.log(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.red(' Logged in'));
            }
            this.clientId = this.application?.id;
            this.token = token;
        } catch (err) {
            const date = new Date();
            throw new Error(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.red(` Logging failed. More information: ${err}`));
        }
    }
    

    public async slashCreate(): Promise<void> {
        const { slashFolder, token, clientId } = this;
        const commands: any[] = [];
        const date = new Date();
        if(!token) throw new Error(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors.red(' First login with "<DUtils>.login(token)"'))
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
                throw new Error(colors.red(`${err}`))
            }
        }
    }

    // aqui puedes añadir mas metodos
    
}