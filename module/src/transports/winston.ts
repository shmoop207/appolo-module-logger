import {IOptions} from "../../../index";
import {define, alias, singleton, inject, App} from 'appolo';
import {ICustomTransport} from "./ICustomTransport";
import winston = require("winston");
import {format} from "winston";
import {Level} from "../common/enums";
import  jsonStringify = require('fast-safe-stringify');
import {PlainObject} from "../ILogger";
import {Util} from "../util";

@define()
@alias("ICustomTransport")
@singleton()
export class Winston implements ICustomTransport {

    private _logger: winston.Logger;
    @inject() private app: App;

    @inject() private moduleOptions: IOptions;

    readonly DEFAULTS = {};

    public isSupported(): boolean {
        return true;
    }

    private _format(info): string {

        let splat = info[Symbol.for("splat")][0];

        let meta = "";

        if (splat) {
            splat = Util.prepareMeta(splat);
            meta = jsonStringify.default(splat, null, 0);
            meta = meta == '{}' ? "" : `${meta}`;
        }

        return `${info.timestamp} [${info.level}] ${info.message}${meta}`
    }

    public async initialize(): Promise<void> {
        let isProduction = process.env.NODE_ENV === "production" || this.app.env.name == "production" || this.app.env.type == "production";

        let transports = [new winston.transports.Console()].concat(this.moduleOptions.transports as any || []);

        let formatOptions = isProduction
            ? format.combine(format.timestamp(), format.printf(this._format))
            : format.combine(format.colorize(), format.timestamp(), format.printf(this._format));

        this._logger = winston.createLogger({
            transports: transports,
            format: formatOptions,
            level: this.moduleOptions.level || "silly"
        });
    }

    public log(level: Level, msg: string, args: PlainObject) {

        this._logger[level].call(this._logger, msg, args);
    }

}
