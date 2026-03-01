class StarRating extends oc.ControlBase {
    connect() {
        this.$input = this.element.querySelector('input[type="hidden"]');
        this.maxStars = parseInt(this.config.maxStars, 10) || 5;
        this.starSize = parseInt(this.config.starSize, 10) || 20;
        this.value = parseInt(this.$input?.value, 10) || 0;

        this.buildWidget();

        this.listen('mousemove', this.onMouseMove);
        this.listen('mouseleave', this.onMouseLeave);
        this.listen('click', this.onClick);

        this.render(this.value);
    }

    disconnect() {
        this.$input = null;
        this.$fill = null;
    }

    buildWidget() {
        this.element.style.width = (this.starSize * this.maxStars) + 'px';
        this.element.style.height = this.starSize + 'px';
        this.element.style.backgroundSize = this.starSize + 'px';

        this.$fill = document.createElement('div');
        this.$fill.className = 'star-rating-fill';
        this.$fill.style.backgroundSize = this.starSize + 'px';
        this.element.appendChild(this.$fill);
    }

    onClick(ev) {
        this.value = this.getStarFromEvent(ev);
        if (this.$input) {
            this.$input.value = this.value;
        }
        this.render(this.value);
    }

    onMouseMove(ev) {
        this.render(this.getStarFromEvent(ev));
    }

    onMouseLeave() {
        this.render(this.value);
    }

    getStarFromEvent(ev) {
        var rect = this.element.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var star = Math.ceil(x / this.starSize);
        return Math.max(1, Math.min(star, this.maxStars));
    }

    render(rating) {
        var percent = (rating / this.maxStars) * 100;
        this.$fill.style.width = percent + '%';
    }
}

export default function() {
    oc.registerControl('star-rating', StarRating);
}
