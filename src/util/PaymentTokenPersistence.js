import BrowserDatabase from 'Util/BrowserDatabase';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

const TOKEN_KEY = 'mollie_payment_token';

export const setPaymentToken = (token) => {
    BrowserDatabase.setItem(token, TOKEN_KEY, ONE_MONTH_IN_SECONDS);
};

export const getPaymentToken = () => {
    const token = BrowserDatabase.getItem(TOKEN_KEY);

    if (!Boolean(token)) {
        throw Error("No payment token found in browser database")
    }

    return token
};
