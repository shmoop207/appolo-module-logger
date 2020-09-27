"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static prepareStack(deleteCount = 0) {
        let old = Error.prepareStackTrace;
        Error.prepareStackTrace = (err, stackTraces) => {
            Error.prepareStackTrace = old;
            stackTraces.splice(0, deleteCount);
            let lines = [];
            lines.push(err.toString());
            for (let i = 0, len = stackTraces.length; i < len; i++) {
                lines.push("    at " + stackTraces[i].toString());
            }
            return lines.join("\n");
        };
    }
    static prepareMeta(meta) {
        let output = {};
        if (!Util.isPlainObject(meta)) {
            return output;
        }
        let keys = Object.keys(meta);
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i], value = meta[key];
            output[key] = (value instanceof Error) ? value.stack || value.toString() : value;
        }
        return output;
    }
}
exports.Util = Util;
Util.isPlainObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
//# sourceMappingURL=util.js.map