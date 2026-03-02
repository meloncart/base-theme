class ProductForm extends oc.ControlBase {
    connect() {
        this.listen('change', '.bundle-slot input[type="radio"]', this.onChangeBundleRadio);
        this.listen('change', '.bundle-slot input[type="checkbox"]', this.onChangeBundleCheckbox);
    }

    onChangeBundleRadio(ev) {
        const slot = ev.target.closest('.bundle-slot');
        slot.querySelectorAll('.bundle-product-parameters').forEach(function(el) {
            el.classList.add('d-none');
        });

        if (ev.target.value) {
            const params = slot.querySelector('[data-bundle-params="' + ev.target.value + '"]');
            if (params) {
                params.classList.remove('d-none');
            }
        }
    }

    onChangeBundleCheckbox(ev) {
        const slot = ev.target.closest('.bundle-slot');
        const params = slot.querySelector('[data-bundle-params="' + ev.target.value + '"]');
        if (params) {
            params.classList.toggle('d-none', !ev.target.checked);
        }
    }
}

export default function() {
    oc.registerControl('product-form', ProductForm);
}
