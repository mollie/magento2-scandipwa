import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CheckoutQuery from 'Query/Checkout.query';
import { getGuestQuoteId } from 'Util/Cart';
import { fetchQuery } from 'Util/Request';

import { getSelectedIssuer, setSelectedIssuer } from '../../util/SelectedIssuerPersistence';
import MollieIssuerComponent from './MollieIssuer.component';

/** @namespace Mollie/Scandipwa/Component/MollieIssuer/Container/mapStateToProps */
export const mapStateToProps = () => ({});
/** @namespace Mollie/Scandipwa/Component/MollieIssuer/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Mollie/Scandipwa/Component/MollieIssuer/Container */
export class MollieIssuerContainer extends PureComponent {
    static propTypes = {
        method: PropTypes.string.isRequired
    };

    containerFunctions = {
        setSelectedIssuer: this.setSelectedIssuer.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            methodList: [],
            selectedIssuer: this.getSelectedIssuer()
        };

        this._getPaymentMethods();
    }

    setSelectedIssuer(event) {
        const code = event.target.value;
        const { method } = this.props;
        setSelectedIssuer(method, code);
        this.setState({ selectedIssuer: code });
    }

    getSelectedIssuer() {
        try {
            const { method } = this.props;
            return getSelectedIssuer(method);
        } catch (Error) {
            return null;
        }
    }

    _getPaymentMethods() {
        fetchQuery(CheckoutQuery.getPaymentMethodsQuery(
            getGuestQuoteId()
        )).then(
            /** @namespace Mollie/Scandipwa/Component/MollieIssuer/Container/MollieIssuerContainer/_getPaymentMethods/fetchQuery/then */
            ({ getPaymentMethods: paymentMethods }) => {
                this.setState({ methodList: paymentMethods });
            },
            this._handleError
        );
    }

    containerProps() {
        const { method } = this.props;
        const {
            methodList,
            selectedIssuer
        } = this.state;

        const methodData = methodList.filter((listMethod) => listMethod.code === method).shift();

        return {
            method,
            data: methodData,
            selectedIssuer
        };
    }

    render() {
        const { methodList } = this.state;

        if (!methodList.length) {
            return null;
        }

        return (
            <MollieIssuerComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MollieIssuerContainer);
