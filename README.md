# Mollie for ScandiPWA
## version 1.0.1

This module is created as a support for https://github.com/mollie/magento2

## Magento backend changes

For this module to properly work you need to change the return URL within the Mollie configuration settings in the Magento backend.

Go to: `Mollie -> Advanced -> PWA Storefront Integration -> Use custom return URL -> yes`

And change the `Custom return url` to:

```
https://<your-scandipwa-store.url>/mollie/checkout/response?payment_token={{payment_token}}&increment_id={{increment_id}}
```
