$(document).ready(function () {

    var MAIL_TO = 'info@turbonautics.com';

    $('#btn_request').on('click', function (e) {
        e.preventDefault();

        var error = false;

        // Get values
        var service      = $('#service').val();
        var organisation = $.trim($('#organisation').val());
        var sector       = $('#sector').val();
        var timeline     = $('#timeline').val();
        var name         = $.trim($('#name').val());
        var email        = $.trim($('#email').val());
        var phone        = $.trim($('#phone').val());
        var message      = $.trim($('#message').val());

        // Remove error class when user interacts
        $('#service, #name, #email, #phone')
            .off('focus click change')
            .on('focus click change', function () {
                $(this).removeClass("error_input");
            });

        // Validation
        if (!service) {
            error = true;
            $('#service').addClass("error_input");
        }

        if (!name) {
            error = true;
            $('#name').addClass("error_input");
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            error = true;
            $('#email').addClass("error_input");
        }

        if (!phone) {
            error = true;
            $('#phone').addClass("error_input");
        }

        if (error) {
            return;
        }

        // Build the email and open the visitor's email app
        var subject = 'Website Enquiry: ' + service + ' - ' + name;
        var body =
            'Name: ' + name + '\r\n' +
            'Email: ' + email + '\r\n' +
            'Phone: ' + phone + '\r\n' +
            'Organisation: ' + (organisation || '-') + '\r\n' +
            'Sector: ' + sector + '\r\n' +
            '\r\n' +
            'Interested In: ' + service + '\r\n' +
            'Expected Timeline: ' + timeline + '\r\n' +
            '\r\n' +
            'Requirement Details:\r\n' +
            (message || '-');

        window.location.href = 'mailto:' + MAIL_TO +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);

        $('#drone_form').fadeOut(300);
        $('#success_message').fadeIn(500);
    });

});
