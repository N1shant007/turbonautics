$(document).ready(function () {

    $('#btn_request').on('click', function (e) {
        e.preventDefault();

        var error = false;

        // Get values
        var service  = $('#service').val();
        var location = $.trim($('#location').val());
        var date     = $.trim($('input[name="date"]').val());
        var name     = $.trim($('#name').val());
        var email    = $.trim($('#email').val());
        var phone    = $.trim($('#phone').val());

        // Remove error class when user interacts
        $('#service, #location, input[name="date"], #name, #email, #phone')
            .off('focus click change')
            .on('focus click change', function () {
                $(this).removeClass("error_input");
            });

        // Validation
        if (!service) {
            error = true;
            $('#service').addClass("error_input");
        }

        if (!location) {
            error = true;
            $('#location').addClass("error_input");
        }

        if (!date) {
            error = true;
            $('input[name="date"]').addClass("error_input");
        }

        if (!name) {
            error = true;
            $('#name').addClass("error_input");
        }

        // Email regex validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            error = true;
            $('#email').addClass("error_input");
        }

        if (!phone) {
            error = true;
            $('#phone').addClass("error_input");
        }

        // Submit if no error
        if (!error) {

            $('#btn_request')
                .prop('disabled', true)
                .text('Sending...');

            $.post("form-drone.php", $("#drone_form").serialize(), function (result) {

                if (result === 'sent') {
                    $('#drone_form').fadeOut(300);
                    $('#success_message').fadeIn(500);
                } else {
                    $('#mail_fail').fadeIn(500);
                    $('#btn_request')
                        .prop('disabled', false)
                        .text('Request Quotation');
                }

            }).fail(function () {
                $('#mail_fail').fadeIn(500);
                $('#btn_request')
                    .prop('disabled', false)
                    .text('Request Quotation');
            });
        }

    });

});
