// Bundle radio: show/hide parameters for selected product
document.addEventListener('change', function(event) {
    var input = event.target;
    if (!input.matches('.bundle-slot input[type="radio"]')) {
        return;
    }

    var slot = input.closest('.bundle-slot');
    slot.querySelectorAll('.bundle-product-parameters').forEach(function(el) {
        el.classList.add('d-none');
    });

    if (input.value) {
        var params = slot.querySelector('[data-bundle-params="' + input.value + '"]');
        if (params) {
            params.classList.remove('d-none');
        }
    }
});

// Bundle checkbox: toggle parameters for checked/unchecked products
document.addEventListener('change', function(event) {
    var input = event.target;
    if (!input.matches('.bundle-slot input[type="checkbox"]')) {
        return;
    }

    var slot = input.closest('.bundle-slot');
    var params = slot.querySelector('[data-bundle-params="' + input.value + '"]');
    if (params) {
        params.classList.toggle('d-none', !input.checked);
    }
});
