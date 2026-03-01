import noUiSlider from '../../vendor/nouislider/nouislider.esm.js';

class PriceSlider extends oc.ControlBase {
    init() {
        this.sliderEl = this.element.querySelector('[data-price-range-slider]');
        this.valueEl = this.element.querySelector('[data-price-range-text]');
        this.minInput = this.element.querySelector('input[name="price_min"]');
        this.maxInput = this.element.querySelector('input[name="price_max"]');
    }

    connect() {
        var min = parseInt(this.config.min) || 0,
            max = parseInt(this.config.max) || 1000,
            startMin = parseInt(this.config.startMin) || min,
            startMax = parseInt(this.config.startMax) || max,
            prefix = this.config.prefix || '$';

        noUiSlider.create(this.sliderEl, {
            connect: true,
            behaviour: 'tap',
            start: [startMin, startMax],
            range: {
                'min': [min],
                'max': [max]
            },
            format: wNumb({
                decimals: 1,
                thousand: '.',
                prefix: prefix
            })
        });

        this.sliderEl.noUiSlider.on('update', this.proxy(this.onSliderUpdate));
        this.sliderEl.noUiSlider.on('change', this.proxy(this.onSliderChange));
    }

    disconnect() {
        if (this.sliderEl && this.sliderEl.noUiSlider) {
            this.sliderEl.noUiSlider.destroy();
        }
        this.sliderEl = null;
        this.valueEl = null;
        this.minInput = null;
        this.maxInput = null;
    }

    onSliderUpdate(values) {
        if (this.valueEl) {
            this.valueEl.innerHTML = values.join(' - ');
        }
    }

    onSliderChange(values) {
        if (this.minInput) {
            this.minInput.value = values[0];
        }
        if (this.maxInput) {
            this.maxInput.value = values[1];
        }
    }
}

export default function() {
    oc.registerControl('price-slider', PriceSlider);
}
