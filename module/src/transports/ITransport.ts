import {Level} from "../common/enums";

export interface ITransport {

    isSupported(): boolean

    initialize(): Promise<void>

    log(level: Level, msg: string, args: any[])
}
