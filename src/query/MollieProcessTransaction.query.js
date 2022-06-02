import { Field } from 'Util/Query';

/** @namespace Mollie/Scandipwa/Query/MollieProcessTransaction/Query */
export class MollieProcessTransactionQuery {
    process(paymentToken) {
        const mutation = new Field('mollieProcessTransaction');
        mutation.addArgument('input', 'MollieProcessTransactionInput', { payment_token: paymentToken });
        mutation.addFieldList(this._transactionInputFields());

        return mutation;
    }

    _transactionInputFields() {
        return [
            'paymentStatus'
        ];
    }
}

export default new MollieProcessTransactionQuery();
