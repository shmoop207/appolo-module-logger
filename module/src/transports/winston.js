"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const winston = require("winston");
const winston_1 = require("winston");
const jsonStringify = require("fast-safe-stringify");
let Winston = class Winston {
    constructor() {
        this.DEFAULTS = {};
    }
    isSupported() {
        return true;
    }
    _format(info) {
        let remove = { level: undefined, message: undefined, splat: undefined, timestamp: undefined };
        let meta = jsonStringify.default(Object.assign({}, info, remove));
        meta = meta == '{}' ? "" : ` ${meta}`;
        return `${info.timestamp} [${info.level}] ${info.message}${meta}`;
    }
    async initialize() {
        let isProduction = process.env.NODE_ENV === "production" || this.app.env.name == "production" || this.app.env.type == "production";
        let transports = [new winston.transports.Console()].concat(this.moduleOptions.transports || []);
        let formatOptions = isProduction
            ? winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(this._format))
            : winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(this._format));
        this._logger = winston.createLogger({
            transports: transports,
            format: formatOptions,
            level: this.moduleOptions.level || "silly"
        });
    }
    log(level, msg, args) {
        this._logger[level].call(this._logger, msg, ...args);
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], Winston.prototype, "app", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], Winston.prototype, "moduleOptions", void 0);
Winston = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.alias("ITransport"),
    appolo_1.singleton()
], Winston);
exports.Winston = Winston;
//# sourceMappingURL=winston.js.map