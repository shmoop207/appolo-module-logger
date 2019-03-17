"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Util {
    static prepareStack() {
        let old = Error.prepareStackTrace;
        Error.prepareStackTrace = (err, stackTraces) => {
            Error.prepareStackTrace = old;
            stackTraces.splice(0, 3);
            let lines = [];
            lines.push(err.toString());
            for (let i = 0, len = stackTraces.length; i < len; i++) {
                lines.push("    at " + stackTraces[i].toString());
            }
            return lines.join("\n");
        };
    }
    static prepareArgs(args) {
        let output = [];
        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            output[i] = arg;
            if (arg instanceof Error) {
                output[i] = arg.stack || arg.toString();
            }
            else if (_.isPlainObject(arg)) {
                output[i] = {};
                let keys = Object.keys(arg);
                for (let j = 0, len2 = keys.length; j < len2; j++) {
                    let key = keys[j], value = arg[key];
                    if (value instanceof Error) {
                        output[i][key] = value.stack || value.toString();
                    }
                    else {
                        output[i][key] = value;
                    }
                }
            }
        }
        return output;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map