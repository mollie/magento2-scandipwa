import BrowserDatabase from 'Util/BrowserDatabase';
import { FIVE_MINUTES_IN_SECONDS } from 'Util/Request/Config';

export const KEY = 'mollie_increment_id';

/** @namespace Mollie/Scandipwa/Util/IncrementIDPersistence/setIncrementId */
export const setIncrementId = (increment_id) => {
    BrowserDatabase.setItem(increment_id, KEY, FIVE_MINUTES_IN_SECONDS);
};

/** @namespace Mollie/Scandipwa/Util/IncrementIDPersistence/getIncrementId */
export const getIncrementId = () => {
    const incrementId = BrowserDatabase.getItem(KEY);

    if (!incrementId) {
        throw Error('No increment ID found in browser database');
    }

    return incrementId;
};

/** @namespace Mollie/Scandipwa/Util/IncrementIDPersistence/deleteIncrementId */
export const deleteIncrementId = () => {
    BrowserDatabase.deleteItem(KEY);
};
