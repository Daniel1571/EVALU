import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let correoUsuario = ""; // ← Aquí guardaremos el correo al hacer login

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

    correoUsuario = correo; // ← guardamos el correo globalmente

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

    if (!correoUsuario) {
      alert("Debes iniciar sesión con tu correo institucional primero.");
      return;
    }

    const mensaje = document.getElementById("mensaje").value.trim();
    if (!mensaje) {
      alert("Por favor escribe un mensaje");
      return;
    }

    try {
      await addDoc(collection(db, "sugerencias"), {
        correo: correoUsuario,
        mensaje,
        fecha: new Date()
      });
      alert("Sugerencia enviada");
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar sugerencia:", error);
      alert("Hubo un error al enviar la sugerencia.");
    }
  });

  // ───── GUARDAR ENCUESTA ─────
  document.getElementById("encuestaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión con tu correo institucional primero.");
      return;
    }

    const sentimiento = document.getElementById("sentimiento").value.trim();
    const ambiente = document.getElementById("ambiente").value.trim();
    const situaciones = document.getElementById("situaciones").value.trim();
    const mejoras = document.getElementById("mejoras").value.trim();

    if (!sentimiento || !ambiente || !mejoras) {
      alert('Por favor, llena todos los campos requeridos.');
      return;
    }

    try {
      await addDoc(collection(db, "encuestas"), {
        correo: correoUsuario,
        sentimiento,
        ambiente,
        situaciones,
        mejoras,
        fecha: new Date()
      });
      alert("¡Encuesta enviada!");
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar encuesta:", error);
      alert("Hubo un error al enviar la encuesta.");
    }
  });

  // ───── GUARDAR PROPUESTA ─────
  document.getElementById("mejoraForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión con tu correo institucional primero.");
      return;
    }

    const propuesta = document.getElementById("propuesta").value.trim();
    if (!propuesta) {
      alert("Por favor escribe una propuesta");
      return;
    }

    try {
      await addDoc(collection(db, "propuestas"), {
        correo: correoUsuario,
        propuesta,
        fecha: new Date()
      });
      alert("Propuesta enviada");
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar propuesta:", error);
      alert("Hubo un error al enviar la propuesta.");
    }
  });

});
