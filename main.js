import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let correoUsuario = ""; // Variable global para guardar el correo

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

    correoUsuario = correo; // Guardamos el correo aquí
    console.log("Correo guardado:", correoUsuario); // <-- Verifica en consola

    // Mostrar secciones
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("sugerenciasSection").style.display = "block";
    document.getElementById("encuestaSection").style.display = "block";
    document.getElementById("mejoraSection").style.display = "block";
    document.getElementById("carteleraSection").style.display = "block";
  });

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

  document.getElementById("encuestaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      correo: correoUsuario,  // <-- agregamos el correo
      sentimiento: document.getElementById("sentimiento").value.trim(),
      ambiente: document.getElementById("ambiente").value.trim(),
      situaciones: document.getElementById("situaciones").value.trim(),
      mejoras: document.getElementById("mejoras").value.trim(),
      fecha: new Date()
    };

    console.log("Datos a guardar en encuesta:", data); // <-- Verifica en consola

    try {
      await addDoc(collection(db, "encuestas"), data);
      alert("¡Encuesta enviada con éxito! Correo: " + correoUsuario);
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar encuesta:", error);
      alert("Hubo un error al enviar la encuesta.");
    }
  });

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
