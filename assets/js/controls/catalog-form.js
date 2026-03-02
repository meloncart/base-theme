class CatalogForm extends oc.ControlBase {
    connect() {
        this.listen('change', '[data-filter-manufacturer]', this.onFilterProducts);
    }

    onFilterProducts() {
        const manufacturers = [];
        this.element.querySelectorAll('[data-filter-manufacturer]:checked').forEach(function(el) {
            manufacturers.push(el.value);
        });

        oc.request(this.element, 'onAction', {
            data: { manufacturers: manufacturers },
            update: {
                'shop-category/category-products': '#categoryProducts'
            }
        });
    }
}

export default function() {
    oc.registerControl('catalog-form', CatalogForm);
}
