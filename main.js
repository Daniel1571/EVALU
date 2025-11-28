import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let correoUsuario = ""; // Guardamos el correo después del login

document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById("loginForm");

  // ───────────────────────────────
  // LOGIN
  // ───────────────────────────────
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correoLogin").value.trim();
    const validacion = /^[0-9]+@cbtis122\.edu\.mx$/;

    if (!validacion.test(correo)) {
      alert("Correo inválido. Usa tu correo institucional.");
      return;
    }

    correoUsuario = correo;

    // Mostrar secciones después de login
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("sugerenciasSection").style.display = "block";
    document.getElementById("encuestaSection").style.display = "block";
    document.getElementById("evalDocenteSection").style.display = "block";
    document.getElementById("ambienteEscolarSection").style.display = "block";
    document.getElementById("servicioEscolarSection").style.display = "block";
  });

  // ───────────────────────────────
  // BUZÓN DE SUGERENCIAS
  // ───────────────────────────────
  document.getElementById("sugerenciasForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión primero.");
      return;
    }

    const mensaje = document.getElementById("mensaje").value.trim();
    if (!mensaje) {
      alert("Escribe tu sugerencia.");
      return;
    }

    try {
      await addDoc(collection(db, "sugerencias"), {
        correo: correoUsuario,
        mensaje,
        fecha: new Date()
      });
      alert("Sugerencia enviada.");
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar sugerencia:", error);
      alert("Hubo un error.");
    }
  });

  // ───────────────────────────────
  // ENCUESTA MENSUAL
  // ───────────────────────────────
  document.getElementById("encuestaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión.");
      return;
    }

    const sentimiento = document.getElementById("sentimiento").value.trim();
    const ambiente = document.getElementById("ambiente").value.trim();
    const situaciones = document.getElementById("situaciones").value.trim();
    const bullying = document.getElementById("bullying").value.trim(); // nuevo campo opcional

    if (!sentimiento || !ambiente) {
      alert("Llena todos los campos obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "encuesta_mensual"), {
        correo: correoUsuario,
        sentimiento,
        ambiente,
        situaciones,
        bullying,
        fecha: new Date()
      });

      alert("Encuesta enviada.");
      e.target.reset();

    } catch (error) {
      console.error("Error al enviar encuesta:", error);
      alert("Hubo un error.");
    }
  });

  // ───────────────────────────────
  // EVALUACIÓN AL DOCENTE
  // ───────────────────────────────
  document.getElementById("evalDocenteForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión.");
      return;
    }

    const nombreDocente = document.getElementById("nombreDocente").value.trim();
    const materiaDocente = document.getElementById("materiaDocente").value.trim();
    const explicar = document.getElementById("explicar").value.trim();
    const horarios = document.getElementById("horarios").value.trim();
    const trato = document.getElementById("trato").value.trim();
    const dominio = document.getElementById("dominio").value.trim();

    if (!nombreDocente || !materiaDocente || !explicar || !horarios || !trato || !dominio) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "evaluacion_docente"), {
        correo: correoUsuario,
        nombreDocente,
        materiaDocente,
        explicar,
        horarios,
        trato,
        dominio,
        fecha: new Date()
      });

      alert("Evaluación enviada.");
      e.target.reset();

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo enviar la evaluación.");
    }
  });

  // ───────────────────────────────
  // EVALUACIÓN DEL AMBIENTE ESCOLAR
  // ───────────────────────────────
  document.getElementById("ambienteEscolarForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión.");
      return;
    }

    const grupo = document.getElementById("grupo").value.trim();
    const ambGrupo = document.getElementById("ambGrupo").value.trim();
    const respeto = document.getElementById("respeto").value.trim();
    const talleres = document.getElementById("talleres").value.trim();
    const seguridad = document.getElementById("seguridad").value.trim();

    if (!grupo || !ambGrupo || !respeto || !talleres || !seguridad) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "evaluacion_ambiente_escolar"), {
        correo: correoUsuario,
        grupo,
        ambGrupo,
        respeto,
        talleres,
        seguridad,
        fecha: new Date()
      });

      alert("Evaluación enviada.");
      e.target.reset();

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo enviar la evaluación.");
    }
  });

  // ───────────────────────────────
  // EVALUACIÓN DEL SERVICIO ESCOLAR
  // ───────────────────────────────
  document.getElementById("servicioEscolarForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!correoUsuario) {
      alert("Debes iniciar sesión.");
      return;
    }

    const prefectura = document.getElementById("prefectura").value.trim();
    const controlEscolar = document.getElementById("controlEscolar").value.trim();
    const biblioteca = document.getElementById("biblioteca").value.trim();
    const medicos = document.getElementById("medicos").value.trim();
    const vigilancia = document.getElementById("vigilancia").value.trim();

    if (!prefectura || !controlEscolar || !biblioteca || !medicos || !vigilancia) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "evaluacion_servicio_escolar"), {
        correo: correoUsuario,
        prefectura,
        controlEscolar,
        biblioteca,
        medicos,
        vigilancia,
        fecha: new Date()
      });

      alert("Evaluación enviada.");
      e.target.reset();

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo enviar la evaluación.");
    }
  });

});
