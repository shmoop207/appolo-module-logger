import {Level} from "../common/enums";
import {PlainObject} from "../ILogger";

export interface ITransport {

    isSupported(): boolean

    initialize(): Promise<void>

    log(level: Level, msg: string, args: PlainObject)
}
