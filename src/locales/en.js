export default {
  translation: {
    form: {
      placeholder: "Enter the feed URL",
      submit: "Add Feed",
      success: "RSS has been loaded", // ✅ Mensaje esperado por las pruebas
      errors: {
        invalid: "Invalid URL",
        duplicate: "RSS already exists", // ✅ Mensaje esperado por las pruebas
        required: "This field cannot be empty",
        invalidRSS: "The content of this feed is not valid",
        networkError: "Could not connect to the server. Check your internet connection.",
        unknownError: "An unexpected error occurred. Please try again.",
      },
    },
  },
};
