"use strict";
import {define, inject, injectParam, singleton} from 'appolo';
import {ILogger} from "./ILogger";
import {IOptions} from "../../index";
import {Util} from "./util";
import {ITransport} from "./transports/ITransport";
import {Level} from "./common/enums";


@define()
@singleton()
export class Logger implements ILogger {

    @inject() private transports: ITransport[];

    public info(msg: string, ...args: any[]): void {
        this._log(Level.info, msg, args);
    }

    public debug(msg: string, ...args: any[]): void {
        this._log(Level.debug, msg, args);
    }

    public warn(msg: string, ...args: any[]): void {
        this._log(Level.warn, msg, args);
    }

    public error(msg: string, ...args: any[]): void {

        this._log(Level.error, msg, args);
    }


    private _log(level: Level, msg: string, args: any[]) {

        args = Util.prepareArgs(args);

        for (let i = 0; i < this.transports.length; i++) {
            this.transports[i].log(level, msg, args)
        }
    }

}

