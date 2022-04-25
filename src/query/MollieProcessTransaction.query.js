import { Field } from 'Util/Query';

export class MollieProcessTransactionQuery {
    process(paymentToken) {
        const mutation = new Field('mollieProcessTransaction');
        mutation.addArgument('input', 'MollieProcessTransactionInput', {payment_token: paymentToken});
        mutation.addField(new Field('paymentStatus'));

        return mutation;
    }
}

export default new MollieProcessTransactionQuery();
