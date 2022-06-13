import { PureComponent } from 'react';

import Loader from 'Component/Loader';

/** @namespace Mollie/Scandipwa/Route/MollieCheckoutResponse/Component */
export class MollieCheckoutResponseComponent extends PureComponent {
    render() {
        return (
            <div
              block="MollieProcessReturn"
              className="ContentWrapper"
            >
                <Loader />
            </div>
        );
    }
}

export default MollieCheckoutResponseComponent;
