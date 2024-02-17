import colors from 'colors';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

// import { recursiveFiles} from '../functions/RecursiveFIles';
import { searchFilesRecursive } from "taskwizard";

interface Config {
    slashFolder: string;
    token: string;
    clientId: string;
    eventsFolder?: string;
}


export class DiscordUtils {
    public slashFolder: string;
    public token: string;
    public clientId: string;
    
    /**
     * Los constuctores son metodos que se ejecutan al instanciar una clase es decir cuando haces:
     * const discordUtils = new DiscordUtils({slashFolder: './slash', token: 'token', clientId: 'clientId'})
     * eso que esta dento de los parentesis es el constuctor, y este se ejecuta cuando se instancia la clase
     * en nuestro caso lo que hace es:
     * 
     */
    constructor(config: Config) {
        // comprobar que los datos requeridos esten presentes
        if (!config.slashFolder) throw new Error('Slash Folder is required');
        if (!config.token) throw new Error("The bot token is required");
        
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
        this.clientId = config.clientId;
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
                console.log(colors.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + ' ' + colors.green(' Slash Commands Uploaded'))
            } catch (err) {
                throw new Error(`${err}`)
            }
        }
    }

    // aqui puedes añadir mas metodos
    
}