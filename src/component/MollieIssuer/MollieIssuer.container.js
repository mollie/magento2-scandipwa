import {PureComponent} from 'react';
import { getGuestQuoteId } from 'Util/Cart';
import {fetchQuery} from 'Util/Request';
import MollieIssuerComponent from './MollieIssuer.component'
import CheckoutQuery from 'Query/Checkout.query';
import PropTypes from 'prop-types';
import { setSelectedIssuer, getSelectedIssuer } from "../../util/SelectedIssuerPersistence";

export class MollieIssuerContainer extends PureComponent {
    static propTypes = {
        method: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

        let selectedIssuer = this.getSelectedIssuer();

        this.state = {
            methodList: [],
            selectedIssuer: this.getSelectedIssuer()
        };
    }

    componentDidMount() {
        this._getPaymentMethods();
    }

    setSelectedIssuer(code) {
        setSelectedIssuer(this.props.method, code);
        this.setState({ selectedIssuer: code });
    }

    getSelectedIssuer() {
        try {
            return getSelectedIssuer(this.props.method);
        } catch (Error) {}

        return null;
    }

    _getPaymentMethods() {
        fetchQuery(CheckoutQuery.getPaymentMethodsQuery(
            getGuestQuoteId()
        )).then(
            /** @namespace Route/Checkout/Container/CheckoutContainer/_getPaymentMethods/fetchQuery/then */
            ({ getPaymentMethods: paymentMethods }) => {
                this.setState({ isLoading: false, methodList: paymentMethods });
            },
            this._handleError
        );
    }

    render() {
        if (!this.state || !this.state.methodList.length) {
            return null;
        }

        const methodData = this.state.methodList.filter(method => method.code === this.props.method).shift();

        return (
            <MollieIssuerComponent
                method={this.props.method}
                data={methodData}
                selectedIssuer={this.state.selectedIssuer}
                setSelectedIssuer={this.setSelectedIssuer.bind(this)}
            />
        )
    }
}

export default MollieIssuerContainer
