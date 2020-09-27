"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transports = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let Transports = class Transports {
    async get() {
        let transports = [].concat(this.moduleOptions.customTransports || [], this.transports);
        await Promise.all(transports.map(transport => transport.initialize()));
        return transports;
    }
};
tslib_1.__decorate([
    inject_1.injectAlias("ICustomTransport")
], Transports.prototype, "transports", void 0);
tslib_1.__decorate([
    inject_1.inject()
], Transports.prototype, "moduleOptions", void 0);
Transports = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.factory()
], Transports);
exports.Transports = Transports;
//# sourceMappingURL=transports.js.map