import BrowserDatabase from 'Util/BrowserDatabase';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

const DATABASE_KEY = 'mollie_selected_issuer';

export const setSelectedIssuer = (method, code) => {
    BrowserDatabase.setItem(code, DATABASE_KEY + '_' + method, ONE_MONTH_IN_SECONDS);
};

export const getSelectedIssuer = (method) => {
    const issuer = BrowserDatabase.getItem(DATABASE_KEY + '_' + method);

    if (!Boolean(issuer)) {
        throw Error("No SelectedIssuer found in browser database")
    }

    return issuer
};
