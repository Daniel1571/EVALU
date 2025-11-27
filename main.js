import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ───── Guardar correo del usuario ─────
let correoUsuario = "";

// ───── Esperar que el DOM cargue ─────
document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById("loginForm");

  // ───── LOGIN ─────
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correoLogin").value.trim();
    const validacion = /^[0-9]+@cbtis122\.edu\.mx$/;

    if (!validacion.test(correo)) {
      alert("Correo inválido. Solo correos institucionales.");
      return;
    }

    correoUsuario = correo; // Guardamos el correo para enviarlo con la encuesta

    // Mostrar secciones
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("sugerenciasSection").style.display = "block";
    document.getElementById("encuestaSection").style.display = "block";
    document.getElementById("mejoraSection").style.display = "block";
    document.getElementById("carteleraSection").style.display = "block";
  });

  // ───── GUARDAR SUGERENCIAS ─────
  document.getElementById("sugerenciasForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!mensaje) {
      alert("Escribe un mensaje antes de enviar.");
      return;
    }

    await addDoc(collection(db, "sugerencias"), {
      correo: correoUsuario,
      mensaje,
      fecha: new Date()
    });

    alert("Sugerencia enviada");
    e.target.reset();
  });

  // ───── GUARDAR ENCUESTA ─────
  document.getElementById("encuestaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const sentimiento = document.getElementById("sentimiento").value.trim();
    const ambiente = document.getElementById("ambiente").value.trim();
    const situaciones = document.getElementById("situaciones").value.trim();
    const mejoras = document.getElementById("mejoras").value.trim();

    if (!sentimiento || !ambiente || !mejoras) {
      alert('Por favor, llena todos los campos requeridos.');
      return;
    }

    await addDoc(collection(db, "encuestas"), {
      correo: correoUsuario, // Aquí se guarda el correo del usuario
      sentimiento,
      ambiente,
      situaciones,
      mejoras,
      fecha: new Date()
    });

    alert("¡Encuesta enviada con éxito!");
    e.target.reset();
  });

  // ───── GUARDAR PROPUESTA ─────
  document.getElementById("mejoraForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const propuesta = document.getElementById("propuesta").value.trim();

    if (!propuesta) {
      alert("Escribe tu propuesta antes de enviar.");
      return;
    }

    await addDoc(collection(db, "propuestas"), {
      correo: correoUsuario,
      propuesta,
      fecha: new Date()
    });

    alert("Propuesta enviada");
    e.target.reset();
  });

});
