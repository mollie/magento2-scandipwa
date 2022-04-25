import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import MOLLIE_METHODS from "../MollieSupportedMethods";
import { setPaymentToken } from "../util/PaymentTokenPersistence";
import { getSelectedIssuer } from "../util/SelectedIssuerPersistence";
import { fetchMutation } from 'Util/Request';
import CheckoutQuery from 'Query/Checkout.query';
import {DETAILS_STEP} from "Route/Checkout/Checkout.config";
import {deleteIncrementId, getIncrementId} from "../util/IncrementIDPersistence";

const __construct = (args, callback, instance) => {
    callback(...args);

    try {
        // If there is a Mollie increment ID set the current step to the succes page.
        instance.state.orderID = getIncrementId()
        instance.state.checkoutStep = DETAILS_STEP
    } catch (Error) {
    }
}

const componentDidMount = (args, callback, instance) => {
    try {
        const orderID = getIncrementId()

        instance.setDetailsStep(orderID)

        deleteIncrementId();
    } catch (Error) {
        return callback(...args)
    }
}

const savePaymentMethodAndPlaceOrder = async (args, callback, instance) => {
    let [paymentInformation] = args;

    // Check if the current method is a Mollie method. If not, call the original method instead.
    if (!MOLLIE_METHODS.includes(paymentInformation.paymentMethod.code)) {
        return await callback(...args);
    }

    let mollie_selected_issuer;
    try {
        mollie_selected_issuer = getSelectedIssuer(paymentInformation.paymentMethod.code);
    } catch (Error) {}

    const { paymentMethod: { code, additional_data, purchase_order_number } } = paymentInformation;
    const guest_cart_id = !isSignedIn() ? getGuestQuoteId() : '';

    try {
        await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
            guest_cart_id,
            payment_method: {
                code,
                [code]: additional_data,
                purchase_order_number,
                mollie_selected_issuer
            }
        }));

        const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));
        const { placeOrder: { order: { mollie_redirect_url, mollie_payment_token } } } = orderData;

        if (!Boolean(mollie_payment_token)) {
            throw Error('Expected mollie_payment_token in order data, none found', orderData)
        }

        if (!Boolean(mollie_redirect_url)) {
            throw Error('Expected mollie_redirect_url in order data, none found', orderData)
        }

        setPaymentToken(mollie_payment_token);
        window.location.href = mollie_redirect_url;
    } catch (e) {
        instance._handleError(e);
    }
};

export default {
    "Route/Checkout/Container": {
        "member-function": {
            __construct,
            componentDidMount,
            savePaymentMethodAndPlaceOrder,
        },
    },
}
