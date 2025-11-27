import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ───── LOGIN ─────
document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correoLogin").value.trim();

    const validacion = /^[0-9]+@cbtis122\.edu\.mx$/;

    if (!validacion.test(correo)) {
      alert("Correo inválido. Solo correos institucionales.");
      return;
    }

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

    await addDoc(collection(db, "sugerencias"), {
      mensaje,
      fecha: new Date()
    });

    alert("Sugerencia enviada");
    e.target.reset();
  });

  // ───── GUARDAR ENCUESTA ─────
  document.getElementById("encuestaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      sentimiento: document.getElementById("sentimiento").value.trim(),
      ambiente: document.getElementById("ambiente").value.trim(),
      situaciones: document.getElementById("situaciones").value.trim(),
      mejoras: document.getElementById("mejoras").value.trim(),
      fecha: new Date()
    };

    await addDoc(collection(db, "encuestas"), data);

    alert("Encuesta enviada");
    e.target.reset();
  });

  // ───── GUARDAR PROPUESTA ─────
  document.getElementById("mejoraForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const propuesta = document.getElementById("propuesta").value.trim();

    await addDoc(collection(db, "propuestas"), {
      propuesta,
      fecha: new Date()
    });

    alert("Propuesta enviada");
    e.target.reset();
  });

});
