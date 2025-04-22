function checkOverlayVisible() {
    var overlay = $('.hero-overlay');
    var windowBottom = $(window).scrollTop() + $(window).height();
    var overlayTop = overlay.offset().top;

    if (windowBottom > overlayTop + 50) {
      overlay.addClass('show');
    }
}


$(document).ready(function () {
    $(window).on('scroll', checkOverlayVisible);

    checkOverlayVisible();
});