// Esperar que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // Referencias a secciones y formularios
  const loginSection = document.getElementById('loginSection');
  const sugerenciasSection = document.getElementById('sugerenciasSection');
  const encuestaSection = document.getElementById('encuestaSection');
  const mejoraSection = document.getElementById('mejoraSection');
  const carteleraSection = document.getElementById('carteleraSection');

  const loginForm = document.getElementById('loginForm');
  const sugerenciasForm = document.getElementById('sugerenciasForm');
  const encuestaForm = document.getElementById('encuestaForm');
  const mejoraForm = document.getElementById('mejoraForm');

  // Manejar login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = document.getElementById('correoLogin').value.trim();

    // Validación: solo números antes de @cbtis122.edu.mx
    const correoPermitido = /^[0-9]+@cbtis122\.edu\.mx$/;

    if (!correoPermitido.test(correo)) {
      alert('Correo inválido. Solo se permiten correos institucionales válidos con números.');
      return;
    }

    // Login exitoso: ocultar login y mostrar otras secciones
    loginSection.style.display = 'none';
    sugerenciasSection.style.display = 'block';
    encuestaSection.style.display = 'block';
    mejoraSection.style.display = 'block';
    carteleraSection.style.display = 'block';
  });

  // Prevenir recarga y manejar envíos de formularios restantes
  sugerenciasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mensaje = document.getElementById('mensaje').value.trim();
    if (!mensaje) {
      alert('Por favor, escribe un mensaje.');
      return;
    }
    alert('Gracias por tus sugerencias.');
    sugerenciasForm.reset();
  });

  encuestaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sentimiento = document.getElementById('sentimiento').value.trim();
    const ambiente = document.getElementById('ambiente').value.trim();
    const mejoras = document.getElementById('mejoras').value.trim();

    if (!sentimiento || !ambiente || !mejoras) {
      alert('Por favor, llena todos los campos requeridos de la encuesta.');
      return;
    }

    alert('¡Encuesta enviada con éxito! Gracias por participar.');
    encuestaForm.reset();
  });

  mejoraForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const propuesta = document.getElementById('propuesta').value.trim();
    if (!propuesta) {
      alert('Por favor, escribe una propuesta.');
      return;
    }
    alert('Gracias por tu propuesta.');
    mejoraForm.reset();
  });
});
