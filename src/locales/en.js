export default {
  translation: {
    form: {
      placeholder: 'Enter the feed URL',
      submit: 'Add Feed',
      success: 'RSS has been loaded', // ✅ Mensaje esperado por las pruebas
      errors: {
        invalid: 'Must be valid URL',
        duplicate: 'RSS already exists', // ✅ Mensaje esperado por las pruebas
        required: 'This field cannot be empty',
        invalidRSS: 'No valid RSS in the resource',
        networkError: 'Network error',
        unknownError: 'Something went wrong',
      },
    },
  },
};
