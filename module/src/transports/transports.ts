import {define, aliasFactory, singleton, alias, factory, inject} from '@appolo/inject';
import {ICustomTransport} from "./ICustomTransport";
import {IOptions} from "../../../index";

@define()
@singleton()
@factory()
export class Transports {
    @alias("ICustomTransport") transports: ICustomTransport[];
    @inject() moduleOptions: IOptions;

    public async get() {

        let transports = [].concat(this.moduleOptions.transports || [], this.transports);

        await Promise.all(transports.map(transport => transport.initialize()));

        return transports

    }
}
