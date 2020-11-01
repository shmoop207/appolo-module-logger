"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pino = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const pino = require("pino");
const jsonStringify = require("fast-safe-stringify");
const util_1 = require("../util");
let Pino = class Pino {
    constructor() {
        this.DEFAULTS = {};
    }
    isSupported() {
        return true;
    }
    _format(splat) {
        let meta = "";
        if (splat) {
            splat = util_1.Util.prepareMeta(splat);
            meta = jsonStringify.default(splat, null, 0);
            meta = meta == '{}' ? "" : ` ${meta}`;
        }
        return meta;
    }
    async initialize() {
        let isProduction = process.env.NODE_ENV === "production" || this.app.env.name == "production" || this.app.env.type == "production";
        this._logger = pino({
            prettyPrint: {
                colorize: !isProduction,
                levelFirst: false,
                translateTime: true, ignore: 'pid,hostname'
            },
        });
    }
    log(level, msg, args) {
        this._logger[level].call(this._logger, msg + this._format(args));
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Pino.prototype, "app", void 0);
tslib_1.__decorate([
    inject_1.inject()
], Pino.prototype, "moduleOptions", void 0);
Pino = tslib_1.__decorate([
    inject_1.define(),
    inject_1.alias("ICustomTransport"),
    inject_1.singleton()
], Pino);
exports.Pino = Pino;
//# sourceMappingURL=pino.js.map