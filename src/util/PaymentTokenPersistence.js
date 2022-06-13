import BrowserDatabase from 'Util/BrowserDatabase';

export const TOKEN_KEY = 'mollie_payment_token';
export const ONE_HOUR_IN_SECONDS = 3600;

/** @namespace Mollie/Scandipwa/Util/PaymentTokenPersistence/setPaymentToken */
export const setPaymentToken = (token) => {
    BrowserDatabase.setItem(token, TOKEN_KEY, ONE_HOUR_IN_SECONDS);
};

/** @namespace Mollie/Scandipwa/Util/PaymentTokenPersistence/getPaymentToken */
export const getPaymentToken = () => {
    const token = BrowserDatabase.getItem(TOKEN_KEY);

    if (!token) {
        throw Error('No payment token found in browser database');
    }

    return token;
};
