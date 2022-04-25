import MollieIssuer from '../component/MollieIssuer';

const MollieIssuerRender = (method) => () => <MollieIssuer method={method} />

const paymentRenderMap = (originalMember) => ({
    ...originalMember,
    ['mollie_methods_applepay']: MollieIssuerRender('mollie_methods_applepay').bind(this),
    ['mollie_methods_bancontact']: MollieIssuerRender('mollie_methods_bancontact').bind(this),
    ['mollie_methods_banktransfer']: MollieIssuerRender('mollie_methods_banktransfer').bind(this),
    ['mollie_methods_belfius']: MollieIssuerRender('mollie_methods_belfius').bind(this),
    ['mollie_methods_creditcard']: MollieIssuerRender('mollie_methods_creditcard').bind(this),
    ['mollie_methods_directdebit']: MollieIssuerRender('mollie_methods_directdebit').bind(this),
    ['mollie_methods_eps']: MollieIssuerRender('mollie_methods_eps').bind(this),
    ['mollie_methods_giftcard']: MollieIssuerRender('mollie_methods_giftcard').bind(this),
    ['mollie_methods_giropay']: MollieIssuerRender('mollie_methods_giropay').bind(this),
    ['mollie_methods_ideal']: MollieIssuerRender('mollie_methods_ideal').bind(this),
    ['mollie_methods_kbc']: MollieIssuerRender('mollie_methods_kbc').bind(this),
    ['mollie_methods_klarnapaylater']: MollieIssuerRender('mollie_methods_klarnapaylater').bind(this),
    ['mollie_methods_klarnapaynow']: MollieIssuerRender('mollie_methods_klarnapaynow').bind(this),
    ['mollie_methods_klarnasliceit']: MollieIssuerRender('mollie_methods_klarnasliceit').bind(this),
    ['mollie_methods_voucher']: MollieIssuerRender('mollie_methods_voucher').bind(this),
    ['mollie_methods_mybank']: MollieIssuerRender('mollie_methods_mybank').bind(this),
    ['mollie_methods_paypal']: MollieIssuerRender('mollie_methods_paypal').bind(this),
    ['mollie_methods_paysafecard']: MollieIssuerRender('mollie_methods_paysafecard').bind(this),
    ['mollie_methods_przelewy24']: MollieIssuerRender('mollie_methods_przelewy24').bind(this),
    ['mollie_methods_sofort']: MollieIssuerRender('mollie_methods_sofort').bind(this),
});

export default {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap
        }
    }
};
