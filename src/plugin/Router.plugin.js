import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withStoreRegex } from 'Component/Router/Router.component';

export const MollieCheckoutResponse = lazy(() => import(
    '../route/MollieCheckoutResponse'
));

export const ROUTE_NAME = 'MOLLIE_CHECKOUT_RESPONSE';

const SWITCH_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
    {
        component: <Route path={ withStoreRegex('/mollie/checkout/response') } render={ (props) => <MollieCheckoutResponse { ...props } /> } />,
        position: 90,
        name: ROUTE_NAME
    }
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
