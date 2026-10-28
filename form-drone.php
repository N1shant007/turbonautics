<?php

$subject = 'New Drone Service Inquiry';
$to      = 'contact@designesia.com'; // Ganti dengan email tujuan

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize & clean inputs
    function clean_input($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }

    $name     = clean_input($_POST['name'] ?? '');
    $email    = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone    = clean_input($_POST['phone'] ?? '');
    $service  = clean_input($_POST['service'] ?? '');
    $location = clean_input($_POST['location'] ?? '');
    $area     = clean_input($_POST['area'] ?? '');
    $date     = clean_input($_POST['date'] ?? '');
    $time     = clean_input($_POST['time'] ?? '');
    $permit   = clean_input($_POST['permit'] ?? '');
    $output   = clean_input($_POST['output'] ?? '');
    $budget   = clean_input($_POST['budget'] ?? '');
    $msg      = clean_input($_POST['message'] ?? '');

    // Basic validation
    if (!$name || !$email || !$phone || !$service || !$location || !$date) {
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
    $headers .= "From: ".$name." <".$email.">\r\n";
    $headers .= "Reply-To: ".$email."\r\n";

    // Email body
    $message  = "=== NEW DRONE SERVICE REQUEST ===\n\n";

    $message .= "CLIENT INFORMATION\n";
    $message .= "Name           : $name\n";
    $message .= "Email          : $email\n";
    $message .= "Phone          : $phone\n\n";

    $message .= "PROJECT DETAILS\n";
    $message .= "Service Type   : $service\n";
    $message .= "Location       : $location\n";
    $message .= "Area Size      : $area\n";
    $message .= "Preferred Date : $date\n";
    $message .= "Preferred Time : $time\n";
    $message .= "Permit Required: $permit\n";
    $message .= "Deliverables   : $output\n";
    $message .= "Estimated Budget: $budget\n\n";

    $message .= "ADDITIONAL NOTES\n";
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