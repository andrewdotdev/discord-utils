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
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveFiles = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
async function recursiveFiles(path) {
    let paths = [];
    path = (0, node_path_1.resolve)(path);
    console.log(path);
    for (const i of (0, node_fs_1.readdirSync)(path, { withFileTypes: true })) {
        if (i.isDirectory())
            paths = paths.concat(await recursiveFiles((0, node_path_1.join)(path, i.name)));
        else {
            if (!i.name.match(/\.(ts|js)$/))
                continue;
            const file = await Promise.resolve(`${i.path}`).then(s => __importStar(require(s))).catch(() => { });
            if (file?.data)
                paths.push(file);
        }
    }
    return paths;
}
exports.recursiveFiles = recursiveFiles;
