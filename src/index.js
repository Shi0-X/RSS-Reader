import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';
import i18next from './i18n';
import { fetchRss, updateFeeds } from './rss';
import initWatchers from './watchers';

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM completamente cargado');

  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-input');
  const feedback = document.getElementById('rss-feedback');
  const feedsContainer = document.getElementById('rss-feeds');
  const postsContainer = document.getElementById('rss-posts');

  const state = {
    feeds: [],
    posts: [],
    errors: null,
  };

  window.state = state;

  const watchedState = initWatchers(state, { input, feedback, feedsContainer, postsContainer });

  const schema = yup.object().shape({
    url: yup.string().url(i18next.t('form.errors.invalid')).required(i18next.t('form.errors.required')),
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('✅ Formulario enviado');

    const url = input.value.trim();

    schema
      .validate({ url })
      .then(() => {
        if (state.feeds.some((feed) => feed.url === url)) {
          throw new Error(i18next.t('form.errors.duplicate'));
        }
        return fetchRss(url);
      })
      .then(({ title, description, posts }) => {
        watchedState.feeds.push({ url, title, description });

        // ✅ Agregar nuevos posts al inicio de la lista (primera carga)
        watchedState.posts = [...posts, ...watchedState.posts];

        watchedState.errors = null;

        // ✅ Resetear input y feedback al éxito
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        feedback.textContent = '';
        feedback.style.display = 'none';

        console.log('✅ Feed agregado correctamente:', { title, description, posts });

        form.reset();
        input.focus();

        // 🔹 Iniciar la actualización automática
        if (state.feeds.length === 1) {
          updateFeeds(state, watchedState);
        }
      })
      .catch((err) => {
        watchedState.errors = err.message;

        // 🔹 Mostrar error visualmente en el input y feedback
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        feedback.textContent = err.message;
        feedback.style.display = 'block';

        console.error('❌ Error al agregar feed:', err.message);
      });
  });
});
