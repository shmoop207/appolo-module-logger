import _ = require("lodash");
import {IOptions} from "../../../index";
import {define, alias, singleton, inject, App} from 'appolo';
import {ITransport} from "./ITransport";
import winston = require("winston");
import {format} from "winston";
import {Level} from "../common/enums";
import  jsonStringify = require('fast-safe-stringify');

@define()
@alias("ITransport")
@singleton()
export class Winston implements ITransport {

    private _logger: winston.Logger;
    @inject() private app: App;

    @inject() private moduleOptions: IOptions;

    readonly DEFAULTS = {};

    public isSupported(): boolean {
        return true;
    }

    private _format(info): string {

        let remove = {level: undefined, message: undefined, splat: undefined, timestamp: undefined};

        let meta = jsonStringify.default(Object.assign({}, info, remove));

        meta = meta == '{}' ? "" : ` ${meta}`;

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

    public log(level: Level, msg: string, args: any[]) {

        this._logger[level].call(this._logger, msg, ...args);
    }

}
