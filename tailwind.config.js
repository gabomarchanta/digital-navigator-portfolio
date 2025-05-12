/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'], // Asegúrate que esto cubre todos tus archivos
    theme: {
      extend: { // Importante usar 'extend' para no sobreescribir todo el tema por defecto
        colors: {
          brand: {
            cyan: '#22d3ee',
            pink: '#ec4899',
            purple: '#a855f7',
          },
          space: {
            darkest: '#0f172a',
            deepPurple: '#3b0764',
            lightText: '#d1d5db',
            lighterText: '#e5e7eb',
          }
        }
        // ... otras extensiones del tema que necesites
      },
    },
    plugins: [
      // Aquí puedes añadir plugins de Tailwind si los necesitas
      // require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('tailwind-scrollbar'),
    ],
  }