"use strict";
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const logger_1 = require("./src/logger");
let LoggerModule = LoggerModule_1 = class LoggerModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {};
    }
    static for(options, moduleOptions = {}) {
        return { module: LoggerModule_1, options, moduleOptions };
    }
};
LoggerModule = LoggerModule_1 = tslib_1.__decorate([
    engine_1.module({ exports: [logger_1.Logger], immediate: true })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=loggerModule.js.map