"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const _ = require("lodash");
let Transports = class Transports {
    async get() {
        let transports = [];
        _.forEach(this.transports, transport => {
            if (transport.isSupported()) {
                transports.push(transport);
            }
        });
        await Promise.all(transports.map(transport => transport.initialize()));
        return transports;
    }
};
tslib_1.__decorate([
    appolo_1.injectAlias("ITransport")
], Transports.prototype, "transports", void 0);
Transports = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    appolo_1.factory()
], Transports);
exports.Transports = Transports;
//# sourceMappingURL=transports.js.map