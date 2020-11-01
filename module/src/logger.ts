"use strict";
import {define, inject, singleton} from '@appolo/inject';
import {ILogger, PlainObject} from "./ILogger";
import {Numbers} from "@appolo/utils";
import {ICustomTransport} from "./transports/ICustomTransport";
import {Level} from "./common/enums";


@define()
@singleton()
export class Logger implements ILogger {

    @inject() private transports: ICustomTransport[];

    public info(msg: string, meta?: PlainObject, options?:{ random?: number }): void {
        this._log(Level.info, msg, meta, options);
    }

    public debug(msg: string, meta?: PlainObject, options?:{ random?: number }): void {
        this._log(Level.debug, msg, meta, options);
    }

    public warn(msg: string, meta?: PlainObject,  options?:{ random?: number }): void {
        this._log(Level.warn, msg, meta, options);
    }

    public error(msg: string, meta?: PlainObject,  options?:{ random?: number }): void {

        this._log(Level.error, msg, meta, options);
    }


    private _log(level: Level, msg: string, meta: PlainObject, options: { random?: number }={}) {

        if (options && options.random && !Numbers.isValidRandom(options.random)) {
            return;
        }
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, meta)
        }
    }

}

