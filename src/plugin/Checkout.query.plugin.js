import { Field } from '@tilework/opus';

const _getOrderField = (args, callback) => callback(args)
    .addFieldList([
        'mollie_redirect_url',
        'mollie_payment_token'
    ]);

const _getPaymentMethodFields = (args, callback) => ([
    ...callback(args),
    new Field('mollie_meta').addFieldList([
        'image'
    ]),
    new Field('mollie_available_issuers').addFieldList([
        'name',
        'code',
        'image',
        'svg'
    ])
]);

export default {
    'Query/Checkout/Query': {
        'member-function': {
            _getOrderField,
            _getPaymentMethodFields
        }
    }
};
