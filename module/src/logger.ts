"use strict";
import {define, injectParam, singleton} from 'appolo';
import {ILogger} from "./ILogger";
import {IOptions} from "../../index";
import {Util} from "./util";
import Raven = require('raven');


@define()
@singleton()
export class Logger implements ILogger {

    private readonly _logger: ILogger;
    private static instance: ILogger;

    constructor(@injectParam() private moduleOptions: IOptions) {

        this._logger = Util.createLogger(moduleOptions.prettyInProduction);


        if (this.moduleOptions.sentry) {
            Raven.config(this.moduleOptions.sentry.dsn, this.moduleOptions.sentry.opts).install();
        }

        Logger.instance = this;
    }

    public info(msg: string, ...args: any[]): void {
        this._logger.info.apply(this._logger, arguments);
    }

    public debug(msg: string, ...args: any[]): void {
        this._logger.debug.apply(this._logger, arguments);
    }

    public warn(msg: string, ...args: any[]): void {
        this._logger.warn.apply(this._logger, arguments);
    }

    public error(msg: string, ...args: any[]): void {

        Util.prepareArgs(args);

        (this.moduleOptions.sentry) && (Util.wireToSentry(msg, args));

        this._logger.error.apply(this._logger, arguments);
    }

    public fatal(msg: string, ...args: any[]): void {

        Util.prepareArgs(arguments);

        (this.moduleOptions.sentry) && Util.wireToSentry(msg, args);


        this._logger.fatal.apply(this._logger, arguments);
    }

    public static info(msg: string, ...args: any[]): void {
        Logger.instance && Logger.instance.info.apply(Logger.instance, arguments)
    }

    public static debug(msg: string, ...args: any[]): void {
        Logger.instance && Logger.instance.debug.apply(Logger.instance, arguments)
    }

    public static warn(msg: string, ...args: any[]): void {
        Logger.instance && Logger.instance.warn.apply(Logger.instance, arguments)
    }

    public static error(msg: string, ...args: any[]): void {
        Logger.instance && Logger.instance.error.apply(Logger.instance, arguments)
    }

    public static fatal(msg: string, ...args: any[]): void {
        Logger.instance && Logger.instance.fatal.apply(Logger.instance, arguments)
    }
}

