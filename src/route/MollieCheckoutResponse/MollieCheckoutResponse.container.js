import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import history from 'Util/History';
import { fetchMutation } from 'Util/Request/Mutation';
import { appendWithStoreCode, getQueryParam } from 'Util/Url';

import MollieProcessTransactionQuery from '../../query/MollieProcessTransaction.query';
import { setIncrementId } from '../../util/IncrementIDPersistence';
import MollieCheckoutResponseComponent from './MollieCheckoutResponse.component';
import { BREADCRUMBS_NAME } from './MollieCheckoutResponse.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Mollie/Scandipwa/Route/MollieCheckoutResponse/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Mollie/Scandipwa/Route/MollieCheckoutResponse/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    )
});

/** @namespace Mollie/Scandipwa/Route/MollieCheckoutResponse/Container */
export class MollieCheckoutResponseContainer extends PureComponent {
    static propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string
        }).isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.updateBreadcrumbs();
        this.checkTransactionStatus();
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs, location: { pathname } } = this.props;

        updateBreadcrumbs([{
            url: pathname,
            name: BREADCRUMBS_NAME
        }]);
    }

    async checkTransactionStatus() {
        const paymentToken = getQueryParam('payment_token', location);
        if (!paymentToken) {
            throw Error('The URL argument "payment_token" is empty or does not exist');
        }

        const incrementId = getQueryParam('increment_id', location);
        if (!incrementId) {
            throw Error('The URL argument "increment_id" is empty or does not exist');
        }

        const {
            mollieProcessTransaction: {
                paymentStatus
            }
        } = await fetchMutation(MollieProcessTransactionQuery.process(paymentToken));

        const successfulStatuses = ['CREATED', 'PAID', 'AUTHORIZED', 'SHIPPING', 'COMPLETED'];
        if (!successfulStatuses.includes(paymentStatus)) {
            location.href = '/cart';

            return;
        }

        setIncrementId(incrementId);
        history.push({
            pathname: appendWithStoreCode(`${ CheckoutStepUrl.CHECKOUT_URL }/success`),
            state: {
                isLoading: false,
                paymentTotals: {},
                checkoutStep: CheckoutSteps.DETAILS_STEP,
                orderID: incrementId
            }
        });
    }

    render() {
        return <MollieCheckoutResponseComponent />;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MollieCheckoutResponseContainer));
