"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Raven = require("raven");
const pino = require("pino");
class Util {
    static prepareStack() {
        let old = Error.prepareStackTrace;
        Error.prepareStackTrace = (err, stackTraces) => {
            Error.prepareStackTrace = old;
            stackTraces.splice(0, 2);
            let lines = [];
            lines.push(err.toString());
            for (let i = 0, len = stackTraces.length; i < len; i++) {
                lines.push("    at " + stackTraces[i].toString());
            }
            return lines.join("\n");
        };
    }
    static prepareArgs(args) {
        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            if (arg instanceof Error) {
                args[i] = arg.stack || arg.toString();
            }
            else if (_.isPlainObject(arg)) {
                let keys = Object.keys(arg);
                for (let j = 0, len2 = keys.length; j < len2; j++) {
                    let key = keys[j], value = arg[key];
                    if (value instanceof Error) {
                        arg[key] = value.stack || value.toString();
                    }
                }
            }
        }
        return args;
    }
    static prepareSentry(args) {
        let extra = {};
        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            if (!_.isPlainObject(arg)) {
                extra[i] = arg;
                continue;
            }
            let keys = Object.keys(arg);
            for (let j = 0, len2 = keys.length; j < len2; j++) {
                let key = keys[j];
                extra[key] = arg[key];
            }
        }
        return extra;
    }
    static wireToSentry(msg, args) {
        Util.prepareStack();
        let err = new Error(msg);
        let extra = Util.prepareSentry(args);
        Raven.captureException(err, { 'level': 'error', extra: extra });
    }
    static createLogger(prettyInProduction) {
        let isPod = process.env.NODE_ENV == "production";
        if (isPod && !prettyInProduction) {
            return pino({ base: null });
        }
        return pino({
            base: null,
            crlf: true,
            serializers: {
                err: pino.stdSerializers.err,
                e: pino.stdSerializers.err,
                error: pino.stdSerializers.err
            },
            prettyPrint: { crlf: true, translateTime: true, errorLikeObjectKeys: ['err', 'error', 'e'], colorize: true }
        });
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map