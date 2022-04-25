import { Field } from 'Util/Query';

const _getOrderField = (args, callback, instance) => {
    return callback()
        .addFieldList([
            'mollie_redirect_url',
            'mollie_payment_token',
        ])
}

const _getPaymentMethodFields = (args, callback, instance) => ([
    ...callback(),
    new Field('mollie_meta').addFieldList([
        'image'
    ]),
    new Field('mollie_available_issuers').addFieldList([
        'name',
        'code',
        'image',
        'svg'
    ]),
])

export default {
    "Query/Checkout/Query": {
        "member-function": {
            _getOrderField: _getOrderField,
            _getPaymentMethodFields: _getPaymentMethodFields,
        }
    }
}
