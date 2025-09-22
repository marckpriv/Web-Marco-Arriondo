// Año dinámico en el footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Estado del formulario (lee ?status=)
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  const msg = document.getElementById('form-status');
  if (msg && status) {
    if (status === 'ok') {
      msg.textContent = '¡Gracias! Tu mensaje fue enviado correctamente.';
      msg.classList.remove('error');
    } else {
      msg.textContent = 'No se pudo enviar el mensaje. Intentá nuevamente.';
      msg.classList.add('error');
    }
    // Limpia el querystring sin recargar desde el servidor
    if (history.replaceState) {
      const url = window.location.pathname + window.location.hash;
      history.replaceState({}, document.title, url);
    }
  }
});
