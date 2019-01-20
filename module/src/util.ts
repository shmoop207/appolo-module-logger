import _ = require('lodash');
import Raven = require('raven');
import pino = require("pino");
import {ILogger} from "./ILogger";

export class Util {
    public static prepareStack() {
        let old = Error.prepareStackTrace;

        Error.prepareStackTrace = (err: Error, stackTraces: NodeJS.CallSite[]) => {

            Error.prepareStackTrace = old;
            stackTraces.splice(0, 2);

            let lines = [];

            lines.push(err.toString());

            for (let i = 0, len = stackTraces.length; i < len; i++) {
                lines.push("    at " + stackTraces[i].toString());
            }

            return lines.join("\n");

        }
    }

    public static prepareArgs(args: any): any {

        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];

            if (arg instanceof Error) {
                args[i] = arg.stack || arg.toString();
            } else if (_.isPlainObject(arg)) {
                let keys = Object.keys(arg);
                for (let j = 0, len2 = keys.length; j < len2; j++) {
                    let key = keys[j], value = arg[key];
                    if (value instanceof Error) {
                        arg[key] = value.stack || value.toString()
                    }


                }
            }
        }

        return args;
    }

    public static prepareSentry(args: any): any {
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
                extra[key] = arg[key]
            }
        }

        return extra;
    }

    public static wireToSentry( msg: string, args: any[]) {

        Util.prepareStack();
        let err = new Error(msg);

        let extra = Util.prepareSentry(args);

        Raven.captureException(err as any, {'level': 'error', extra: extra});
    }

    public static createLogger(prettyInProduction: boolean): ILogger {
        let isPod = process.env.NODE_ENV == "production";

        if (isPod && !prettyInProduction) {
            return pino({base: null});
        }

        return pino({
            base: null,
            crlf: true,
            serializers: {
                err: pino.stdSerializers.err,
                e: pino.stdSerializers.err,
                error: pino.stdSerializers.err
            },
            prettyPrint: {crlf: true, translateTime: true, errorLikeObjectKeys: ['err', 'error', 'e'], colorize: true}
        } as pino.LoggerOptions);

    }
}