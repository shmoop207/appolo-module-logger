"use strict";
import {define, inject, injectParam, singleton} from 'appolo';
import {ILogger, PlainObject} from "./ILogger";
import {IOptions} from "../../index";
import {Util} from "./util";
import {ICustomTransport} from "./transports/ICustomTransport";
import {Level} from "./common/enums";


@define()
@singleton()
export class Logger implements ILogger {

    @inject() private transports: ICustomTransport[];

    public info(msg: string, meta?: PlainObject): void {
        this._log(Level.info, msg, meta);
    }

    public debug(msg: string, meta?: PlainObject): void {
        this._log(Level.debug, msg, meta);
    }

    public warn(msg: string, meta?: PlainObject): void {
        this._log(Level.warn, msg, meta);
    }

    public error(msg: string, meta?: PlainObject): void {

        this._log(Level.error, msg, meta);
    }


    private _log(level: Level, msg: string, meta: PlainObject) {

        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, meta)
        }
    }

}

