import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';

const render = (args, callback, instance) => {
    const {
        isSelected,
        method: {
            title,
            code,
            mollie_meta
        }
    } = instance.props;

    if (!code.startsWith('mollie_')) {
        return callback(args);
    }

    return (
        <li block="CheckoutPayment">
            <button
              block="CheckoutPayment"
              mods={ { isSelected } }
              elem="Button"
              type="button"
              onClick={ instance.onClick }
            >
                <img className="mollie-issuer-logo" src={ mollie_meta.image } alt={ title } />

                <Field
                  type={ FieldType.checkbox }
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
        'member-function': {
            render
        }
    }
};
