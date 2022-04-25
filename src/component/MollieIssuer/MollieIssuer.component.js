import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './MollieIssuer.style.scss'

export class MollieIssuerComponent extends PureComponent
{
    static propTypes = {
        setSelectedIssuer: PropTypes.func.isRequired,
    }

    setSelectedIssuer = (event) => {
        this.props.setSelectedIssuer(event.target.value)
    }

    render() {
        if (!this.props.data.mollie_available_issuers) {
            return null;
        }

        return (
            <div block="MollieIssuer">
                {this.props.data.mollie_available_issuers.map( issuer => (
                    <div key={issuer.code}>
                        <div className="Field Field_type_radio">
                            <input
                                name="mollie_issuer"
                                value={issuer.code}
                                type="radio"
                                checked={this.props.selectedIssuer === issuer.code}
                                onChange={this.setSelectedIssuer}
                            />
                            <div className="input-control"></div>

                            <img className='mollie-issuer-logo' src={issuer.svg} alt={'Logo of ' + issuer.name} />
                            {issuer.name}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default MollieIssuerComponent
