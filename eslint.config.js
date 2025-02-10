export default [
  {
    ignores: ['node_modules/', 'dist/'], // Ignora directorios innecesarios
  },
  {
    files: ['**/*.js'], // Se aplica a todos los archivos JS
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      indent: ['error', 2],
      quotes: ['error', 'single'], // 🔹 Fuerza el uso de comillas simples
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-newline': ['error', { consistent: true }],
      'object-curly-spacing': ['error', 'always'], // 🔹 Espacios dentro de llaves
      'prefer-destructuring': ['error', { object: true, array: true }],
      'quote-props': ['error', 'as-needed'], // 🔹 Evita comillas innecesarias en propiedades de objetos
    },
  },
];
