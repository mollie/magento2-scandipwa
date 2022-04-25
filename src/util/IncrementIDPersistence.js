import BrowserDatabase from 'Util/BrowserDatabase';
import { FIVE_MINUTES_IN_SECONDS } from 'Util/Request/QueryDispatcher';

const KEY = 'mollie_increment_id';

export const setIncrementId = (increment_id) => {
    BrowserDatabase.setItem(increment_id, KEY, FIVE_MINUTES_IN_SECONDS);
};

export const getIncrementId = () => {
    const token = BrowserDatabase.getItem(KEY);

    if (!Boolean(token)) {
        throw Error("No increment ID found in browser database")
    }

    return token
};

export const deleteIncrementId = () => {
    BrowserDatabase.deleteItem(KEY);
}
