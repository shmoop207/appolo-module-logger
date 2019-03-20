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
        let output = {};
        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            if (arg instanceof Error) {
                output[i.toString()] = arg.stack || arg.toString();
            }
            else if (_.isPlainObject(arg)) {
                let keys = Object.keys(arg);
                for (let j = 0, len2 = keys.length; j < len2; j++) {
                    let key = keys[j], value = arg[key];
                    if (value instanceof Error) {
                        output[key] = value.stack || value.toString();
                    }
                    else {
                        output[key] = value;
                    }
                }
            }
            else {
                output[i.toString()] = arg;
            }
        }
        return output;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map