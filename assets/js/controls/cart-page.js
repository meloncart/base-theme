class CartPage extends oc.ControlBase {
    init() {
        this.updateTimer = null;
    }

    connect() {
        this.listen('change', '.quantity-field', this.onQuantityChange);
    }

    disconnect() {
        clearTimeout(this.updateTimer);
    }

    onQuantityChange() {
        this.element.classList.add('is-updating');

        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(async () => {
            await oc.request(this.element, 'onUpdateCart', {
                update: this.getUpdateTargets('cart', 'miniCart')
            });
            this.element.classList.remove('is-updating');
        }, 600);
    }

    getUpdateTargets(...keys) {
        const defaults = {
            cart: { partial: 'shop-checkout/cart-view', selector: '#cartPartial' },
            miniCart: { partial: 'shop-checkout/mini-cart', selector: '#miniCart' }
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
    oc.registerControl('cart-page', CartPage);
}
