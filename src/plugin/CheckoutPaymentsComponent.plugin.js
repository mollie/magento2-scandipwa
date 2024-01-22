import MollieIssuer from '../component/MollieIssuer';

const mollieIssuerRender = (method) => () => <MollieIssuer method={ method } />;

const paymentRenderMap = (originalMember) => ({
    ...originalMember,
    mollie_methods_applepay: mollieIssuerRender('mollie_methods_applepay').bind(this),
    mollie_methods_bancontact: mollieIssuerRender('mollie_methods_bancontact').bind(this),
    mollie_methods_banktransfer: mollieIssuerRender('mollie_methods_banktransfer').bind(this),
    mollie_methods_belfius: mollieIssuerRender('mollie_methods_belfius').bind(this),
    mollie_methods_creditcard: mollieIssuerRender('mollie_methods_creditcard').bind(this),
    mollie_methods_directdebit: mollieIssuerRender('mollie_methods_directdebit').bind(this),
    mollie_methods_eps: mollieIssuerRender('mollie_methods_eps').bind(this),
    mollie_methods_giftcard: mollieIssuerRender('mollie_methods_giftcard').bind(this),
    mollie_methods_giropay: mollieIssuerRender('mollie_methods_giropay').bind(this),
    mollie_methods_ideal: mollieIssuerRender('mollie_methods_ideal').bind(this),
    mollie_methods_in3: mollieIssuerRender('mollie_methods_in3').bind(this),
    mollie_methods_kbc: mollieIssuerRender('mollie_methods_kbc').bind(this),
    mollie_methods_klarnapaylater: mollieIssuerRender('mollie_methods_klarnapaylater').bind(this),
    mollie_methods_klarnapaynow: mollieIssuerRender('mollie_methods_klarnapaynow').bind(this),
    mollie_methods_klarnasliceit: mollieIssuerRender('mollie_methods_klarnasliceit').bind(this),
    mollie_methods_voucher: mollieIssuerRender('mollie_methods_voucher').bind(this),
    mollie_methods_mybank: mollieIssuerRender('mollie_methods_mybank').bind(this),
    mollie_methods_paypal: mollieIssuerRender('mollie_methods_paypal').bind(this),
    mollie_methods_paysafecard: mollieIssuerRender('mollie_methods_paysafecard').bind(this),
    mollie_methods_przelewy24: mollieIssuerRender('mollie_methods_przelewy24').bind(this),
    mollie_methods_sofort: mollieIssuerRender('mollie_methods_sofort').bind(this),
    mollie_methods_twint: mollieIssuerRender('mollie_methods_twint').bind(this)
});

export default {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap
        }
    }
};
