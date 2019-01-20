"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var Logger_1;
"use strict";
const appolo_1 = require("appolo");
const util_1 = require("./util");
const Raven = require("raven");
let Logger = Logger_1 = class Logger {
    constructor(moduleOptions) {
        this.moduleOptions = moduleOptions;
        this._logger = util_1.Util.createLogger(moduleOptions.prettyInProduction);
        if (this.moduleOptions.sentry) {
            Raven.config(this.moduleOptions.sentry.dsn, this.moduleOptions.sentry.opts).install();
        }
        Logger_1.instance = this;
    }
    info(msg, ...args) {
        this._logger.info.apply(this._logger, arguments);
    }
    debug(msg, ...args) {
        this._logger.debug.apply(this._logger, arguments);
    }
    warn(msg, ...args) {
        this._logger.warn.apply(this._logger, arguments);
    }
    error(msg, ...args) {
        util_1.Util.prepareArgs(args);
        (this.moduleOptions.sentry) && (util_1.Util.wireToSentry(msg, args));
        this._logger.error.apply(this._logger, arguments);
    }
    fatal(msg, ...args) {
        util_1.Util.prepareArgs(arguments);
        (this.moduleOptions.sentry) && util_1.Util.wireToSentry(msg, args);
        this._logger.fatal.apply(this._logger, arguments);
    }
    static info(msg, ...args) {
        Logger_1.instance && Logger_1.instance.info.apply(Logger_1.instance, arguments);
    }
    static debug(msg, ...args) {
        Logger_1.instance && Logger_1.instance.debug.apply(Logger_1.instance, arguments);
    }
    static warn(msg, ...args) {
        Logger_1.instance && Logger_1.instance.warn.apply(Logger_1.instance, arguments);
    }
    static error(msg, ...args) {
        Logger_1.instance && Logger_1.instance.error.apply(Logger_1.instance, arguments);
    }
    static fatal(msg, ...args) {
        Logger_1.instance && Logger_1.instance.fatal.apply(Logger_1.instance, arguments);
    }
};
Logger = Logger_1 = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    tslib_1.__param(0, appolo_1.injectParam())
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map