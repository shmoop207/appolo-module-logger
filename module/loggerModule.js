"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
const logger_1 = require("./src/logger");
let LoggerModule = class LoggerModule extends index_1.Module {
    constructor(opts) {
        super(opts);
        this.Defaults = {};
    }
};
LoggerModule = tslib_1.__decorate([
    index_1.module({ exports: [logger_1.Logger], immediate: true })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=loggerModule.js.map