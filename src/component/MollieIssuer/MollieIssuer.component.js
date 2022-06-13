import PropTypes from 'prop-types';
import { Fragment, PureComponent } from 'react';

import './MollieIssuer.style.scss';

/** @namespace Mollie/Scandipwa/Component/MollieIssuer/Component */
export class MollieIssuerComponent extends PureComponent {
    static propTypes = {
        selectedIssuer: PropTypes.string.isRequired,
        setSelectedIssuer: PropTypes.func.isRequired,
        data: PropTypes.shape({
            mollie_available_issuers: PropTypes.arrayOf(
                PropTypes.shape({
                    code: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    };

    renderImage(issuer) {
        return <img className="mollie-issuer-logo" src={ issuer.svg } alt={ `Logo of ${ issuer.name}` } />;
    }

    renderInput(issuer) {
        const {
            selectedIssuer,
            setSelectedIssuer
        } = this.props;

        return (
            <>
                <input
                  name="mollie_issuer"
                  value={ issuer.code }
                  type="radio"
                  checked={ selectedIssuer === issuer.code }
                  onChange={ setSelectedIssuer }
                />
                <div className="input-control" />
            </>
        );
    }

    renderIssuer(issuer) {
        return (
            <div key={ issuer.code }>
                <div className="Field Field_type_radio">
                    { this.renderInput(issuer) }
                    { this.renderImage(issuer) }
                    { issuer.name }
                </div>
            </div>
        );
    }

    render() {
        const {
            data: {
                mollie_available_issuers
            }
        } = this.props;

        if (!mollie_available_issuers) {
            return null;
        }

        return (
            <div block="MollieIssuer">
                { mollie_available_issuers.map((issuer) => this.renderIssuer(issuer)) }
            </div>
        );
    }
}

export default MollieIssuerComponent;
