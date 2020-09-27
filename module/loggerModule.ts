import {Module, module, IModuleParams, IModuleOptions} from "@appolo/engine";
import {Logger} from "./src/logger";
import {IOptions} from "../index";


@module({exports: [Logger], immediate: true})
export class LoggerModule extends Module<IOptions> {

    protected readonly Defaults: Partial<IOptions> = {};

    public static for(options: IOptions, moduleOptions: IModuleOptions = {}): IModuleParams {
        return {module: LoggerModule, options, moduleOptions}
    }
}
