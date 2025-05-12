$(document).ready(function() {
    $('.hover-reddish-yellow').hover(
        function() {
            $('#text-reddish-yellow').css('display', 'block');  // Show text on hover
        },
        function() {
            $('#text-reddish-yellow').css('display', 'none');  // Hide text when hover ends
        }
    );

    // Hover effect for Light Yellow ellipse
    $('.hover-light-yellow').hover(
        function() {
            $('#text-light-yellow').css('display', 'block');  // Show text on hover
        },
        function() {
            $('#text-light-yellow').css('display', 'none');  // Hide text when hover ends
        }
    );

    // Hover effect for Silver Grey ellipse
    $('.hover-silver-grey').hover(
        function() {
            $('#text-silver-grey').css('display', 'block');  // Show text on hover
        },
        function() {
            $('#text-silver-grey').css('display', 'none');  // Hide text when hover ends
        }
    );
});