"use strict";
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const enums_1 = require("./common/enums");
let Logger = Logger_1 = class Logger {
    info(msg, meta, options) {
        this._log(enums_1.Level.info, msg, meta, options);
    }
    debug(msg, meta, options) {
        this._log(enums_1.Level.debug, msg, meta, options);
    }
    warn(msg, meta, options) {
        this._log(enums_1.Level.warn, msg, meta, options);
    }
    error(msg, meta, options) {
        this._log(enums_1.Level.error, msg, meta, options);
    }
    setTransform(fn) {
        this._transform = fn;
    }
    clone() {
        let logger = new Logger_1();
        logger.transports = this.transports;
        logger._transform = this._transform;
        return logger;
    }
    _log(level, msg, meta, options = {}) {
        if (this._transform) {
            ({ level, msg, meta, options } = this._transform({ level, msg, meta, options }));
        }
        if (options && options.random && !utils_1.Numbers.isValidRandom(options.random)) {
            return;
        }
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, meta);
        }
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], Logger.prototype, "transports", void 0);
Logger = Logger_1 = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map