import _ = require('lodash');

export class Util {
    public static prepareStack() {
        let old = Error.prepareStackTrace;

        Error.prepareStackTrace = (err: Error, stackTraces: NodeJS.CallSite[]) => {

            Error.prepareStackTrace = old;
            stackTraces.splice(0, 3);

            let lines = [];

            lines.push(err.toString());

            for (let i = 0, len = stackTraces.length; i < len; i++) {
                lines.push("    at " + stackTraces[i].toString());
            }

            return lines.join("\n");

        }
    }

    public static prepareArgs(args: any): any {

        let output = [];

        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            output[i] = arg;
            if (arg instanceof Error) {
                output[i] = arg.stack || arg.toString();
            } else if (_.isPlainObject(arg)) {

                output[i] = {};

                let keys = Object.keys(arg);
                for (let j = 0, len2 = keys.length; j < len2; j++) {
                    let key = keys[j], value = arg[key];

                    if (value instanceof Error) {
                        output[i][key] = value.stack || value.toString()
                    } else {
                        output[i][key] = value
                    }
                }
            }
        }

        return output;
    }





}
