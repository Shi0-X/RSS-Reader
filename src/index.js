import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

// Estado global de la aplicación
const state = {
  feeds: [],
  form: {
    url: '',
    error: null,
  },
};

// Elementos del DOM
const form = document.getElementById('rss-form');
const input = document.getElementById('rss-input');
const feedback = document.getElementById('rss-feedback');

// Configurar el watcher para actualizar la vista
const watchedState = onChange(state, (path, value) => {
  if (path === 'form.error') {
    if (value) {
      input.classList.add('is-invalid');
      feedback.textContent = value;
      feedback.style.display = 'block';
    } else {
      input.classList.remove('is-invalid');
      feedback.textContent = '';
      feedback.style.display = 'none';
    }
  }
});

// Función de validación de URL con Yup
const validateURL = (url, existingFeeds) => {
  const schema = yup.string()
    .url('La URL no es válida')
    .notOneOf(existingFeeds, 'El feed ya fue agregado')
    .required('El campo no puede estar vacío');

  return schema.validate(url)
    .then(() => ({ isValid: true, error: null }))
    .catch((error) => ({ isValid: false, error: error.message }));
};

// Manejo del evento submit en el formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = input.value.trim();

  validateURL(url, state.feeds)
    .then(() => {
      state.feeds.push(url);
      watchedState.form.error = null;
      form.reset();
      input.focus();
    })
    .catch((err) => {
      watchedState.form.error = err;
    });
});
