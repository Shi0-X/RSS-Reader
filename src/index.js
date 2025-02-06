import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';

// ✅ Definimos el esquema de validación con Yup
const schema = yup.object().shape({
  url: yup
    .string()
    .url('La URL no es válida') // ✅ Verifica que sea una URL válida
    .required('El campo no puede estar vacío') // ✅ No permite campos vacíos
});

// ✅ Esperamos que el DOM esté listo antes de inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-input');
  const feedback = document.getElementById('rss-feedback');

  const feeds = new Set(); // ✅ Usamos un `Set` para evitar duplicados

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // ✅ Evitamos que el formulario se envíe sin validar
    const url = input.value.trim();

    // ✅ Validación con Yup
    schema
      .validate({ url })
      .then(() => {
        if (feeds.has(url)) {
          throw new Error('El feed ya existe');
        }

        // ✅ Si pasa la validación, limpiamos errores
        input.classList.remove('is-invalid');
        feedback.style.display = 'none';

        // ✅ Agregamos la URL al conjunto de feeds
        feeds.add(url);

        // ✅ Restablecer el formulario
        form.reset();
        input.focus();
      })
      .catch((err) => {
        // ✅ Mostrar error visualmente
        input.classList.add('is-invalid');
        feedback.textContent = err.message;
        feedback.style.display = 'block';
      });
  });
});
