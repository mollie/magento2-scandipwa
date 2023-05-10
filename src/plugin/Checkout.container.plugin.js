import CheckoutQuery from 'Query/Checkout.query';
import { CheckoutSteps } from 'Route/Checkout/Checkout.config';
import { isSignedIn } from 'Util/Auth/IsSignedIn';
import { getCartId } from 'Util/Cart';
import { fetchMutation } from 'Util/Request/Mutation';

import { deleteIncrementId, getIncrementId } from '../util/IncrementIDPersistence';
import MOLLIE_METHODS from '../util/MollieSupportedMethods';
import { setPaymentToken } from '../util/PaymentTokenPersistence';
import { getSelectedIssuer } from '../util/SelectedIssuerPersistence';

const __construct = (args, callback, instance) => {
    callback(...args);

    try {
        // If there is a Mollie increment ID set the current step to the succes page.
        instance.setState({
            orderID: getIncrementId(),
            checkoutStep: CheckoutSteps.DETAILS_STEP
        });
    } catch (Error) {
        // No Mollie increment ID set, continue with the original flow.
    }
};

const componentDidMount = (args, callback, instance) => {
    try {
        const orderID = getIncrementId();

        instance.setDetailsStep(orderID);

        deleteIncrementId();
    } catch (Error) {
        callback(...args);
    }
};

const savePaymentMethodAndPlaceOrder = async (args, callback, instance) => {
    const [paymentInformation] = args;

    // Check if the current method is a Mollie method. If not, call the original method instead.
    if (!MOLLIE_METHODS.includes(paymentInformation.paymentMethod.code)) {
        return callback(...args);
    }

    let mollie_selected_issuer; // eslint-disable-line fp/no-let
    try {
        mollie_selected_issuer = getSelectedIssuer(paymentInformation.paymentMethod.code);
    } catch (Error) {
        // No selected issuer found, continue with the original flow.
    }

    const { paymentMethod: { code, additional_data, purchase_order_number } } = paymentInformation;
    const cart_id = !isSignedIn() ? getCartId() : '';

    try {
        await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
            cart_id,
            payment_method: {
                code,
                [code]: additional_data,
                purchase_order_number,
                mollie_selected_issuer
            }
        }));

        const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(cart_id));
        const { placeOrder: { order: { mollie_redirect_url, mollie_payment_token } } } = orderData;

        if (!mollie_payment_token) {
            throw Error('Expected mollie_payment_token in order data, none found', orderData);
        }

        if (!mollie_redirect_url) {
            throw Error('Expected mollie_redirect_url in order data, none found', orderData);
        }

        setPaymentToken(mollie_payment_token);
        window.location.href = mollie_redirect_url;
        return {};
    } catch (e) {
        instance._handleError(e);
    }

    return callback(...args);
};

export default {
    'Route/Checkout/Container': {
        'member-function': {
            __construct,
            componentDidMount,
            savePaymentMethodAndPlaceOrder
        }
    }
};
