class CatalogForm extends oc.ControlBase {
    connect() {
        this.listen('change', '[data-filter-manufacturer]', this.onFilterProducts);
        this.listen('change', '[data-filter-rating]', this.onFilterProducts);
    }

    onFilterProducts() {
        const data = {};

        const manufacturers = [];
        this.element.querySelectorAll('[data-filter-manufacturer]:checked').forEach(function(el) {
            manufacturers.push(el.value);
        });
        if (manufacturers.length) {
            data.manufacturers = manufacturers;
        }

        const ratings = [];
        this.element.querySelectorAll('[data-filter-rating]:checked').forEach(function(el) {
            ratings.push(el.value);
        });
        if (ratings.length) {
            data.ratings = ratings;
        }

        oc.request(this.element, 'onAction', {
            data: data,
            update: {
                'shop-category/category-products': '#categoryProducts'
            }
        });
    }
}

export default function() {
    oc.registerControl('catalog-form', CatalogForm);
}
