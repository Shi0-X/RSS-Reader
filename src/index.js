import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import i18next from "./i18n.js";
import { fetchRss, updateFeeds } from "./rss.js";
import initWatchers from "./watchers.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM completamente cargado");

  const form = document.getElementById("rss-form");
  const input = document.getElementById("rss-input");
  const feedback = document.getElementById("rss-feedback");
  const feedsContainer = document.getElementById("rss-feeds");
  const postsContainer = document.getElementById("rss-posts");

  // 🔹 Estado de la aplicación
  const state = {
    feeds: [],
    posts: [],
    errors: null,
    readPosts: new Set(), // 🔹 Almacena los posts leídos
  };

  window.state = state;

  const watchedState = initWatchers(state, { input, feedback, feedsContainer, postsContainer });

  // 🔹 Esquema de validación con Yup
  const schema = yup.object().shape({
    url: yup.string().url(i18next.t("form.errors.invalid")).required(i18next.t("form.errors.required")),
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("✅ Formulario enviado");

    const url = input.value.trim();

    schema
      .validate({ url })
      .then(() => {
        if (state.feeds.some((feed) => feed.url === url)) {
          throw new Error(i18next.t("form.errors.duplicate"));
        }
        return fetchRss(url);
      })
      .then(({ title, description, posts }) => {
        watchedState.feeds.push({ url, title, description });

        // ✅ Agregar nuevos posts al inicio de la lista (manteniendo orden correcto)
        watchedState.posts = [...posts, ...watchedState.posts];

        watchedState.errors = null;

        // ✅ Mostrar mensaje de éxito esperado por las pruebas
        let successMessage = document.getElementById("rss-success-message");
        if (!successMessage) {
          successMessage = document.createElement("p");
          successMessage.id = "rss-success-message";
          input.insertAdjacentElement("afterend", successMessage);
        }
        successMessage.textContent = "RSS has been loaded";
        successMessage.style.color = "green";

        // ✅ Resetear input y feedback al éxito
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        feedback.textContent = "";
        feedback.style.display = "none";

        console.log("✅ Feed agregado correctamente:", { title, description, posts });

        form.reset();
        input.focus();

        // 🔹 Iniciar la actualización automática
        if (state.feeds.length === 1) {
          updateFeeds(state, watchedState);
        }
      })
      .catch((err) => {
        watchedState.errors = err.message;

        // 🔹 Ocultar mensaje de éxito si hay un error
        const successMessage = document.getElementById("rss-success-message");
        if (successMessage) {
          successMessage.textContent = "";
        }

        // 🔹 Mostrar error visualmente en el input y feedback
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        feedback.textContent = err.message;
        feedback.style.display = "block";

        console.error("❌ Error al agregar feed:", err.message);
      });
  });

  // 🔹 Evento para detectar clics en los posts y marcarlos como leídos
  postsContainer.addEventListener("click", (event) => {
    if (event.target.dataset.postLink) {
      const postLink = event.target.dataset.postLink;
      state.readPosts.add(postLink);
      watchedState.posts = [...state.posts]; // Forzar re-renderizado
    }
  });
});
