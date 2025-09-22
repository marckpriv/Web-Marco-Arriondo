<?php
/* Ruta: /contact.php
 * Requisitos: PHP mail() habilitado en el hosting.
 * Ajustá el correo de destino en $TO_EMAIL.
 */

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: /#contacto');
  exit;
}

// Honeypot simple
if (!empty($_POST['website'])) {
  header('Location: /?status=error#contacto');
  exit;
}

function clean($v) {
  $v = trim($v ?? '');
  $v = str_replace(["\r","\n","%0a","%0d"], ' ', $v);
  return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name    = clean($_POST['name'] ?? '');
$email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
  header('Location: /?status=error#contacto');
  exit;
}

// CONFIGURAR:
$TO_EMAIL = 'contacto@marcoarriondo.com'; // <-- Cambiá a la casilla real
$SUBJECT  = "Nuevo mensaje desde el sitio — $name";

// Cuerpo de correo
$body  = "Nombre: $name\n";
$body .= "Email: $email\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/D') . "\n";
$body .= "Fecha: " . date('Y-m-d H:i:s') . "\n\n";
$body .= "Mensaje:\n$message\n";

// Cabeceras
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: Sitio Marco Arriondo <no-reply@{$_SERVER['SERVER_NAME']}>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "X-Mailer: PHP/" . PHP_VERSION;

$sent = @mail($TO_EMAIL, $SUBJECT, $body, implode("\r\n", $headers));

if ($sent) {
  header('Location: /?status=ok#contacto');
} else {
  header('Location: /?status=error#contacto');
}
exit;
