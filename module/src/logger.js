"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const enums_1 = require("./common/enums");
let Logger = class Logger {
    info(msg, meta, random) {
        this._log(enums_1.Level.info, msg, meta, random);
    }
    debug(msg, meta, random) {
        this._log(enums_1.Level.debug, msg, meta, random);
    }
    warn(msg, meta, random) {
        this._log(enums_1.Level.warn, msg, meta, random);
    }
    error(msg, meta, random) {
        this._log(enums_1.Level.error, msg, meta, random);
    }
    _log(level, msg, meta, random) {
        if (random && !utils_1.Numbers.isValidRandom(random)) {
            return;
        }
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, meta);
        }
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Logger.prototype, "transports", void 0);
Logger = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map