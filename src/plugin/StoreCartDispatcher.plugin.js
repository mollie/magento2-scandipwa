const updateInitialCartData = async (args, callback, instance) => {
    if (location.pathname.indexOf('mollie/checkout/response') === -1) {
        return callback(...args);
    }

    console.info('Not fetching cart data, we are on the Mollie response page');
}

export default {
    'Store/Cart/Dispatcher': {
        'member-function': {
            updateInitialCartData
        }
    }
};
