import MollieIssuer from '../component/MollieIssuer';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';

const render = (callback, args, instance) => {
    const {
        isSelected,
        method: {
            title,
            code,
            mollie_meta
        }
    } = args.props;

    if (!code.startsWith('mollie_')) {
        return callback;
    }

    return () => (
        <li block="CheckoutPayment">
            <button
                block="CheckoutPayment"
                mods={ { isSelected } }
                elem="Button"
                type="button"
                onClick={ args.onClick }
            >
                <img className="mollie-issuer-logo" src={mollie_meta.image} alt={title} />

                <Field
                    type={ FIELD_TYPE.checkbox }
                    attr={ {
                        id: `option-${ title }`,
                        name: `option-${ title }`,
                        checked: isSelected
                    } }
                    label={ title }
                    isDisabled={ false }
                />
            </button>
        </li>
    );
};

export default {
    'Component/CheckoutPayment/Component': {
        'member-property': {
            render
        }
    }
};
