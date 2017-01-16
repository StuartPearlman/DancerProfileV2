var transparent = true;

$(document).ready(function () {
    $.material.init();

    if ($('.navbar-color-on-scroll').length !== 0) {
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
    }

    $('.copyright').text('\u00A9' + new Date().getFullYear() + ', ' + 'Carissa Pearlman');

    if (/(android)/i.test(navigator.userAgent)) {
        // Chrome mobile font-boosting override
        $('.etude').css({ 'font-size': $('.description.text-center p').first().css('font-size') });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

materialKit = {
    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > 250) {
            if (transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }

        if (!isElementInView($('.title'), true)) {
            $('.navbar-brand').fadeIn(150);
        } else {
            $('.navbar-brand').fadeOut(150);
        }
    }, 2)
};

function isElementInView (element, fullyInView) {
    var pageTop = $(window).scrollTop() + 45;
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce (func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}
