import PhotoSwipeLightbox from '../../vendor/photoswipe/photoswipe-lightbox.esm.min.js';
import PhotoSwipeModule from '../../vendor/photoswipe/photoswipe.esm.min.js';
import PhotoSwipeDynamicCaption from '../../vendor/photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.esm.js';

class GallerySlider extends oc.ControlBase {
    init() {
        this.$thumbs = this.element.querySelector('[data-slider-thumbs]') || this.element;
        this.$previews = this.element.querySelector('[data-slider-previews]');
    }

    connect() {
        this.connectSlickThumbs();
        if (this.$previews) {
            this.connectSlickPreviews();
        }

        this.connectLightbox();
        setTimeout(() => {
            this.prepareLightbox();
        }, 1);
    }

    disconnect() {
        if (this.lightbox) {
            this.lightbox.destroy();
            this.lightbox = null;
        }

        $(this.$thumbs).slick('unslick');
        this.$thumbs = null;

        if (this.$previews) {
            $(this.$previews).slick('unslick');
            this.$previews = null;
        }
    }

    connectSlickPreviews() {
        $(this.$previews).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: this.$thumbs
        });
    }

    connectSlickThumbs() {
        $(this.$thumbs).slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            focusOnSelect: !!this.$previews,
            asNavFor: this.$previews,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    connectLightbox() {
        this.lightbox = new PhotoSwipeLightbox({
            gallery: this.$previews || this.$thumbs,
            children: '.slick-slide',
            pswpModule: PhotoSwipeModule,
            showHideAnimationType: 'none'
        });

        new PhotoSwipeDynamicCaption(this.lightbox, {
            type: 'auto'
        });

        this.lightbox.init();
    }

    prepareLightbox() {
        this.element.querySelectorAll('.slick-slide a').forEach(function(link) {
            var image = new Image();
            image.src = link.getAttribute('href');
            image.onload = function() {
                link.setAttribute('data-pswp-width', image.naturalWidth);
                link.setAttribute('data-pswp-height', image.naturalHeight);
            };
        });
    }
}

export default function() {
    oc.registerControl('gallery-slider', GallerySlider);
}
