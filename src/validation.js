import * as yup from 'yup';

export const validateURL = (url, existingFeeds) => {
  const schema = yup.string()
    .url('La URL no es válida')
    .notOneOf(existingFeeds, 'El feed ya fue agregado')
    .required('El campo no puede estar vacío');

  return schema.validate(url)
    .then(() => ({ isValid: true, error: null }))
    .catch((error) => ({ isValid: false, error: error.message }));
};
