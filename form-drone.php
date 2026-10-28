<?php

$subject = 'New Enquiry from Turbonautics Website';
$to      = 'info@turbonautics.com'; // Enquiries are delivered to this address

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize & clean inputs
    function clean_input($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }

    $name         = clean_input($_POST['name'] ?? '');
    $email        = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone        = clean_input($_POST['phone'] ?? '');
    $service      = clean_input($_POST['service'] ?? '');
    $organisation = clean_input($_POST['organisation'] ?? '');
    $sector       = clean_input($_POST['sector'] ?? '');
    $timeline     = clean_input($_POST['timeline'] ?? '');
    $msg          = clean_input($_POST['message'] ?? '');

    // Basic validation
    if (!$name || !$email || !$phone || !$service) {
        echo 'failed';
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'failed';
        exit;
    }

    // Email headers
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: Turbonautics Website <no-reply@turbonautics.com>\r\n";
    $headers .= "Reply-To: ".$name." <".$email.">\r\n";

    // Email body
    $message  = "=== NEW ENQUIRY - TURBONAUTICS WEBSITE ===\n\n";

    $message .= "CONTACT INFORMATION\n";
    $message .= "Name         : $name\n";
    $message .= "Email        : $email\n";
    $message .= "Phone        : $phone\n";
    $message .= "Organisation : $organisation\n\n";

    $message .= "ENQUIRY DETAILS\n";
    $message .= "Interested In: $service\n";
    $message .= "Sector       : $sector\n";
    $message .= "Timeline     : $timeline\n\n";

    $message .= "REQUIREMENT DETAILS\n";
    $message .= $msg . "\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo 'sent';
    } else {
        echo 'failed';
    }

} else {
    echo 'failed';
}
?>
