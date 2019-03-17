"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const util_1 = require("./util");
const enums_1 = require("./common/enums");
let Logger = class Logger {
    info(msg, ...args) {
        this._log(enums_1.Level.info, msg, args);
    }
    debug(msg, ...args) {
        this._log(enums_1.Level.debug, msg, args);
    }
    warn(msg, ...args) {
        this._log(enums_1.Level.warn, msg, args);
    }
    error(msg, ...args) {
        this._log(enums_1.Level.error, msg, args);
    }
    _log(level, msg, args) {
        args = util_1.Util.prepareArgs(args);
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, args);
        }
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], Logger.prototype, "transports", void 0);
Logger = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton()
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map