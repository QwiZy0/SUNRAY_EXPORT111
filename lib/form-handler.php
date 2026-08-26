<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$comment = trim($_POST['comment'] ?? '');

if ($name === '' || $phone === '') {
	echo json_encode([
		"status" => "error",
		"message" => "Имя и телефон обязательны для заполнения"
	]);
	exit;
}

$mail = new PHPMailer(true);
try {
	// Настройки сервера
	$mail->isSMTP();
	$mail->Host = 'smtp.mail.ru'; 
	$mail->SMTPAuth = true;
	$mail->Username = 'Yustes1970@mail.ru'; //изменить почту

	$mail->Password = '';//пароль приложения (создать)

	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->SMTPAutoTLS = false;
	$mail->Port = 465;
	$mail->CharSet = 'UTF-8';

	$mail->setFrom('Yustes1970@mail.ru', 'Запрос цены с сайта');//от кого
	$mail->addAddress('Yustes1970@mail.ru', 'Получатель'); //кому

	$mail->isHTML(true);
	$mail->Subject = 'Запрос цены с сайта';

	$mail->Body = "Запрос цены с сайта:<br><br>" .
		"<b>Имя:</b> " . htmlspecialchars($name) . "<br>" .
		"<b>Телефон:</b> " . htmlspecialchars($phone) . "<br>" .
		"<b>Комментарий:</b> " . htmlspecialchars($comment);

	$mail->AltBody = "Запрос цены с сайта:\n\n" .
		"Имя: " . $name . "\n" .
		"Телефон: " . $phone . "\n" .
		"Комментарий: " . $comment;

	$mail->send();

	echo json_encode([
		"status" => "success",
		"message" => "Письмо успешно отправлено! Мы свяжемся с вами в ближайшее время."
	]);
	exit;

} catch (Exception $e) {
	$errorMessage = "[" . date('Y-m-d H:i:s') . "] Ошибка: " . $e->getMessage() . " | Подробности: " . $mail->ErrorInfo . PHP_EOL;
	file_put_contents("../mail_exception.txt", $errorMessage, FILE_APPEND);

	echo json_encode([
		"status" => "error",
		"message" => "Произошла ошибка при отправке письма. Попробуйте позже."
		// "debug": $mail->ErrorInfo // Раскомментируй эту строку для отладки, но убери на реальном сайте!
	]);
	exit;
}