import BrowserDatabase from 'Util/BrowserDatabase';

export const DATABASE_KEY = 'mollie_selected_issuer';
export const ONE_HOUR_IN_SECONDS = 3600;

/** @namespace Mollie/Scandipwa/Util/SelectedIssuerPersistence/setSelectedIssuer */
export const setSelectedIssuer = (method, code) => {
    BrowserDatabase.setItem(code, `${DATABASE_KEY }_${ method}`, ONE_HOUR_IN_SECONDS);
};

/** @namespace Mollie/Scandipwa/Util/SelectedIssuerPersistence/getSelectedIssuer */
export const getSelectedIssuer = (method) => {
    const issuer = BrowserDatabase.getItem(`${DATABASE_KEY }_${ method}`);

    if (!issuer) {
        throw Error('No SelectedIssuer found in browser database');
    }

    return issuer;
};
