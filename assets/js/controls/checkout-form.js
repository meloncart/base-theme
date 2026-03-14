class CheckoutForm extends oc.ControlBase {
    connect() {
        this.listen('change', '[name=city],[name=zip],[name=state_id],[name=country_id]', this.onChangeContactDetails);
        this.listen('change', '[name=shipping_method]', this.onChangeShippingMethod);
        this.listen('change', '[name=payment_method]', this.onChangePaymentMethod);
        this.listen('change', '[name=address_book_id]', this.onChangeAddressBook);
        addEventListener('pay:fetch-invoice', this.proxy(this.onFetchInvoiceHash));
    }

    disconnect() {
        removeEventListener('pay:fetch-invoice', this.proxy(this.onFetchInvoiceHash));
    }

    onFetchInvoiceHash(event) {
        event.detail.fetchFunc = async () => {
            const data = await oc.request(this.element, 'onPrepareOrder', { async: true });
            return data.invoice_hash;
        };
    }

    onChangeAddressBook() {
        oc.request(this.element, 'onRefreshCheckout', {
            data: {
                post_address_book_preset: true,
                skip_validation: true
            },
            update: this.getUpdateTargets('details', 'shipping', 'payment', 'summary')
        });
    }

    onChangeContactDetails() {
        oc.request(this.element, 'onRefreshCheckout', {
            data: {
                post_contact_details: true,
                skip_validation: true
            },
            update: this.getUpdateTargets('shipping', 'payment', 'summary')
        });
    }

    onChangeShippingMethod() {
        oc.request(this.element, 'onRefreshCheckout', {
            data: {
                post_shipping_method: true,
                skip_validation: true
            },
            update: this.getUpdateTargets('payment', 'summary')
        });
    }

    onChangePaymentMethod() {
        oc.request(this.element, 'onRefreshCheckout', {
            data: {
                post_payment_method: true,
                skip_validation: true
            },
            update: this.getUpdateTargets('paymentForm', 'summary')
        });
    }

    getUpdateTargets(...keys) {
        const defaults = {
            details: { partial: 'shop-checkout/checkout-step-details', selector: '#shopCheckoutStepDetails' },
            shipping: { partial: 'shop-checkout/checkout-step-shipping', selector: '#shopCheckoutStepShipping' },
            payment: { partial: 'shop-checkout/checkout-step-payment', selector: '#shopCheckoutStepPayment' },
            paymentForm: { partial: 'shop-checkout/payment-form', selector: '#shopPaymentForm' },
            summary: { partial: 'shop-checkout/order-summary', selector: '#shopCheckoutOrderSummary' }
        };

        const result = {};
        for (const key of keys) {
            const config = defaults[key];
            const attrKey = key.charAt(0).toUpperCase() + key.slice(1);
            const partial = this.element.dataset[`partial${attrKey}`] || config.partial;
            const selector = this.element.dataset[`selector${attrKey}`] || config.selector;
            result[partial] = selector;
        }
        return result;
    }
}

export default function() {
    oc.registerControl('checkout-form', CheckoutForm);
}
