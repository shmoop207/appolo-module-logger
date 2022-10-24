"use strict";
import {define, inject, singleton} from '@appolo/inject';
import {ILogger, ILoggerMsgOptions, ILoggerParams, PlainObject} from "./ILogger";
import {Numbers} from "@appolo/utils";
import {ICustomTransport} from "./transports/ICustomTransport";
import {Level} from "./common/enums";





@define()
@singleton()
export class Logger implements ILogger {

    @inject() private transports: ICustomTransport[];

    private _transform: (params: ILoggerParams) => ILoggerParams

    public info(msg: string, meta?: PlainObject, options?: ILoggerMsgOptions): void {
        this._log(Level.info, msg, meta, options);
    }

    public debug(msg: string, meta?: PlainObject, options?: ILoggerMsgOptions): void {
        this._log(Level.debug, msg, meta, options);
    }

    public warn(msg: string, meta?: PlainObject, options?: ILoggerMsgOptions): void {
        this._log(Level.warn, msg, meta, options);
    }

    public error(msg: string, meta?: PlainObject, options?: ILoggerMsgOptions): void {

        this._log(Level.error, msg, meta, options);
    }


    public setTransform(fn: (params: ILoggerParams) => ILoggerParams) {

        this._transform = fn;
    }

    public clone(): ILogger {
        let logger = new Logger()
        logger.transports = this.transports;
        logger._transform = this._transform;

        return logger;

    }

    protected _log(level: Level, msg: string, meta: PlainObject, options: ILoggerMsgOptions = {}) {

        if (this._transform) {
            ({level, msg, meta, options} = this._transform({level, msg, meta, options}));
        }


        if (options && options.random && !Numbers.isValidRandom(options.random)) {
            return;
        }
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, meta)
        }
    }

}

