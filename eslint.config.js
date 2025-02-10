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
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }], // 🔹 Máximo 1 línea en blanco
      'object-curly-newline': ['error', { consistent: true }], // 🔹 No exige saltos de línea dentro de objetos
      'object-curly-spacing': ['error', 'always'], // 🔹 Espaciado dentro de objetos
      'prefer-destructuring': ['error', { object: true, array: true }],
      'quote-props': ['error', 'as-needed'], // 🔹 Solo usar comillas en propiedades si es necesario
      'implicit-arrow-linebreak': 'off', // 🔹 Permite arrow functions en una sola línea
      'function-paren-newline': ['error', 'consistent'], // 🔹 Evita errores de salto de línea en paréntesis de funciones
      'import/prefer-default-export': 'off', // 🔹 No obliga a usar `export default`
    },
  },
];
