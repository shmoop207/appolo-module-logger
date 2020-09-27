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

    public info(msg: string, meta?: PlainObject, random?: number): void {
        this._log(Level.info, msg, meta, random);
    }

    public debug(msg: string, meta?: PlainObject, random?: number): void {
        this._log(Level.debug, msg, meta, random);
    }

    public warn(msg: string, meta?: PlainObject, random?: number): void {
        this._log(Level.warn, msg, meta, random);
    }

    public error(msg: string, meta?: PlainObject, random?: number): void {

        this._log(Level.error, msg, meta,random);
    }


    private _log(level: Level, msg: string, meta: PlainObject, random?: number) {

        if (random && !Numbers.isValidRandom(random)) {
            return;
        }
        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, meta)
        }
    }

}

