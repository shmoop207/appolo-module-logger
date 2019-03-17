import {define, aliasFactory, singleton, injectAlias, factory} from 'appolo';
import {ITransport} from "./ITransport";
import _ = require('lodash');

@define()
@singleton()
@factory()
export class Transports {
    @injectAlias("ITransport") transports: ITransport[];

    public async get() {

        let transports = [];

        _.forEach(this.transports, transport => {
            if (transport.isSupported()) {
                transports.push(transport);
            }
        });

        await Promise.all(transports.map(transport => transport.initialize()));

        return transports

    }
}
