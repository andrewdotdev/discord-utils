"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUtils = void 0;
var colors_1 = __importDefault(require("colors"));
var rest_1 = require("@discordjs/rest");
var v9_1 = require("discord-api-types/v9");
var taskwizard_1 = require("taskwizard");
var discord_js_1 = require("discord.js");
var DiscordUtils = /** @class */ (function (_super) {
    __extends(DiscordUtils, _super);
    /**
     * Los constuctores son metodos que se ejecutan al instanciar una clase es decir cuando haces:
     * const discordUtils = new DiscordUtils({slashFolder: './slash', token: 'token', clientId: 'clientId'})
     * eso que esta dento de los parentesis es el constuctor, y este se ejecuta cuando se instancia la clase
     * en nuestro caso lo que hace es:
     *
     */
    function DiscordUtils(config) {
        var _a;
        var _this = _super.call(this, config) || this;
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
        _this.slashFolder = config.slashFolder;
        _this.token = _this.token;
        _this.clientId = (_a = _this.application) === null || _a === void 0 ? void 0 : _a.id;
        return _this;
    }
    DiscordUtils.prototype.login = function (token) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var date, date, err_1, date;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.login.call(this, token)];
                    case 1:
                        _b.sent();
                        if (this.user) {
                            date = new Date();
                            console.log(colors_1.default.cyan("[".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "]")) + colors_1.default.green(" Logged in as ".concat(this.user.username)));
                        }
                        else {
                            date = new Date();
                            console.log(colors_1.default.cyan("[".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "]")) + colors_1.default.red(' Logged in'));
                        }
                        this.clientId = (_a = this.application) === null || _a === void 0 ? void 0 : _a.id;
                        this.token = token;
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        date = new Date();
                        throw new Error(colors_1.default.cyan("[".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "]")) + colors_1.default.red(" Logging failed. More information: ".concat(err_1)));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DiscordUtils.prototype.slashCreate = function () {
        return __awaiter(this, void 0, void 0, function () {
            function createSlash() {
                return __awaiter(this, void 0, void 0, function () {
                    var date_1, err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, rest.put(v9_1.Routes.applicationCommands(clientId), {
                                        body: commands
                                    })];
                            case 1:
                                _a.sent();
                                date_1 = new Date();
                                console.log(colors_1.default.cyan("[".concat(date_1.getHours(), ":").concat(date_1.getMinutes(), ":").concat(date_1.getSeconds(), "]")) + '' + colors_1.default.green(' Slash Commands Uploaded'));
                                return [3 /*break*/, 3];
                            case 2:
                                err_2 = _a.sent();
                                throw new Error(colors_1.default.red("".concat(err_2)));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
            var _a, slashFolder, token, clientId, commands, date, rest, commandsFiles, _i, commandsFiles_1, file, command;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, slashFolder = _a.slashFolder, token = _a.token, clientId = _a.clientId;
                        commands = [];
                        date = new Date();
                        if (!token)
                            throw new Error(colors_1.default.cyan("[".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), "]")) + colors_1.default.red(' First login with "<DUtils>.login(token)"'));
                        rest = new rest_1.REST({ version: "10" }).setToken(token);
                        return [4 /*yield*/, (0, taskwizard_1.searchFilesRecursive)(slashFolder)];
                    case 1:
                        commandsFiles = _b.sent();
                        _i = 0, commandsFiles_1 = commandsFiles;
                        _b.label = 2;
                    case 2:
                        if (!(_i < commandsFiles_1.length)) return [3 /*break*/, 5];
                        file = commandsFiles_1[_i];
                        return [4 /*yield*/, Promise.resolve("".concat(file)).then(function (s) { return __importStar(require(s)); }).catch(function () { })];
                    case 3:
                        command = _b.sent();
                        if (!(command === null || command === void 0 ? void 0 : command.data))
                            return [3 /*break*/, 4];
                        commands.push(command.data.toJSON());
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, createSlash()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DiscordUtils;
}(discord_js_1.Client));
exports.DiscordUtils = DiscordUtils;
