import PropTypes from 'prop-types';
import {BREADCRUMBS_NAME} from "./MollieCheckoutResponse.config";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MollieCheckoutResponseComponent from "./MollieCheckoutResponse.component";
import { fetchMutation } from 'Util/Request';
import MollieProcessTransactionQuery from "../../query/MollieProcessTransaction.query";
import { HistoryType } from 'Type/Router.type';
import { getQueryParam } from 'Util/Url';
import { DETAILS_STEP } from 'Route/Checkout/Checkout.config';
import {CHECKOUT_URL} from "@scandipwa/scandipwa/src/route/Checkout/Checkout.config";
import { appendWithStoreCode } from 'Util/Url';
import history from 'Util/History';
import {setIncrementId} from "../../util/IncrementIDPersistence";

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    )
});

export class MollieCheckoutResponseContainer extends PureComponent {
    static propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string
        }).isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        history: HistoryType.isRequired,
    }

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
        const paymentToken = getQueryParam('payment_token', location)
        if (!paymentToken) {
            throw Error('The URL argument "payment_token" is empty or does not exist');
        }

        const incrementId = getQueryParam('increment_id', location)
        if (!incrementId) {
            throw Error('The URL argument "payment_token" is empty or does not exist');
        }

        const { mollieProcessTransaction: { paymentStatus } } = await fetchMutation(MollieProcessTransactionQuery.process(paymentToken))

        const successfulStatuses = ['CREATED', 'PAID', 'AUTHORIZED', 'SHIPPING', 'COMPLETED'];
        if (successfulStatuses.includes(paymentStatus)) {
            history.push({
                pathname: appendWithStoreCode(`${ CHECKOUT_URL }/success`),
                state: {
                    isLoading: false,
                    paymentTotals: {},
                    checkoutStep: DETAILS_STEP,
                    orderID: 123,
                }
            });

            return;
        }

        setIncrementId(incrementId);

        location.href = '/cart';
    }

    render() {
        return <MollieCheckoutResponseComponent />
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MollieCheckoutResponseContainer));
