class CartFlyout extends oc.ControlBase {
    init() {
        this.handler = this.config.handler;
        this.offcanvasEl = this.element.closest('.offcanvas');
    }

    connect() {
        if (this.offcanvasEl) {
            this.onShowBound = this.onShow.bind(this);
            this.offcanvasEl.addEventListener('show.bs.offcanvas', this.onShowBound);
        }
    }

    disconnect() {
        if (this.offcanvasEl && this.onShowBound) {
            this.offcanvasEl.removeEventListener('show.bs.offcanvas', this.onShowBound);
            this.onShowBound = null;
        }
    }

    async onShow() {
        await oc.request(this.element, this.handler);
    }
}

export default function() {
    oc.registerControl('cart-flyout', CartFlyout);
}
