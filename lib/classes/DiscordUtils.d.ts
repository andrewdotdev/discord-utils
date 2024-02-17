import { Client, ClientOptions } from 'discord.js';
interface Config extends ClientOptions {
    slashFolder: string;
    eventsFolder?: string;
}
export declare class DiscordUtils extends Client {
    slashFolder: string;
    eventsFolder?: string;
    id: any;
    clientId: any;
    /**
     * Los constuctores son metodos que se ejecutan al instanciar una clase es decir cuando haces:
     * const discordUtils = new DiscordUtils({slashFolder: './slash', token: 'token', clientId: 'clientId'})
     * eso que esta dento de los parentesis es el constuctor, y este se ejecuta cuando se instancia la clase
     * en nuestro caso lo que hace es:
     *
     */
    constructor(config: Config);
    login(token: string): Promise<any>;
    slashCreate(): Promise<void>;
}
export {};
