"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUtils = void 0;
const colors_1 = __importDefault(require("colors"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const taskwizard_1 = require("taskwizard");
const discord_js_1 = require("discord.js");
class DiscordUtils extends discord_js_1.Client {
    slashFolder;
    eventsFolder;
    id;
    clientId;
    /**
     * Los constuctores son metodos que se ejecutan al instanciar una clase es decir cuando haces:
     * const discordUtils = new DiscordUtils({slashFolder: './slash', token: 'token', clientId: 'clientId'})
     * eso que esta dento de los parentesis es el constuctor, y este se ejecuta cuando se instancia la clase
     * en nuestro caso lo que hace es:
     *
     */
    constructor(config) {
        super(config);
        // comprobar que los datos requeridos esten presentes
        if (!config.slashFolder)
            throw new Error(colors_1.default.red('Slash Folder is required'));
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
    async login(token) {
        try {
            await super.login(token);
            if (this.user) {
                const date = new Date();
                console.log(colors_1.default.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors_1.default.green(` Logged in as ${this.user.username}`));
            }
            else {
                const date = new Date();
                console.log(colors_1.default.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors_1.default.red(' Logged in'));
            }
            this.clientId = this.application?.id;
            this.token = token;
        }
        catch (err) {
            const date = new Date();
            throw new Error(colors_1.default.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors_1.default.red(` Logging failed. More information: ${err}`));
        }
    }
    async slashCreate() {
        const { slashFolder, token, clientId } = this;
        const commands = [];
        const date = new Date();
        if (!token)
            throw new Error(colors_1.default.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + colors_1.default.red(' First login with "<DUtils>.login(token)"'));
        const rest = new rest_1.REST({ version: "10" }).setToken(token);
        const commandsFiles = await (0, taskwizard_1.searchFilesRecursive)(slashFolder);
        for (const file of commandsFiles) {
            const command = await Promise.resolve(`${file}`).then(s => __importStar(require(s))).catch(() => { });
            if (!command?.data)
                continue;
            commands.push(command.data.toJSON());
        }
        await createSlash();
        async function createSlash() {
            try {
                await rest.put(v9_1.Routes.applicationCommands(clientId), {
                    body: commands
                });
                const date = new Date();
                console.log(colors_1.default.cyan(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`) + '' + colors_1.default.green(' Slash Commands Uploaded'));
            }
            catch (err) {
                throw new Error(colors_1.default.red(`${err}`));
            }
        }
    }
}
exports.DiscordUtils = DiscordUtils;
