<script lang="ts">
    import { fly } from 'svelte/transition';

    // Definición de los elementos tipográficos y sus clases de Tailwind
    // Ajusta las clases de tamaño (text-4xl, etc.) según tu sistema de diseño
    const typeElements = [
        { level: 'Heading 1', text: 'The Quick Brown Fox Jumps Over', class: 'text-4xl font-black text-brand-cyan mb-2 tracking-tight' },
        { level: 'Heading 2', text: 'The Lazy Dog. A B C D E F G H I J K L M N O P Q R S T U V W X Y Z', class: 'text-3xl font-semibold text-slate-100 mb-2 tracking-tight' },
        { level: 'Heading 3', text: '0123456789. The quick brown fox.', class: 'text-2xl font-medium text-slate-200 mb-2' },
        { level: 'Paragraph', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', class: 'text-base text-space-lightText leading-relaxed mb-2' },
        { level: 'Caption / Small', text: 'Fig. 1: A demonstration of typographic scale and rhythm. Used for less prominent information.', class: 'text-sm text-slate-400 italic' }
    ];

    // Opcional: Para cambiar la familia de fuentes
    const fontFamilies = [
        { name: 'Portfolio Default (Sans)', class: 'font-sans' }, // Asume que tienes font-sans definido en Tailwind
        { name: 'Serif Alt', class: 'font-serif' },             // Asume que tienes font-serif definido
        { name: 'Mono Alt', class: 'font-mono' },
    ];
    let selectedFontFamilyClass = fontFamilies[0].class;

    // Opcional: Para cambiar el tamaño base (más complejo de implementar perfectamente)
    // let baseFontSizeRem = 1; // 1rem = 16px por defecto
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <!-- Opcional: Selector de Familia de Fuentes -->
    <div class="mb-6 text-center" in:fly={{y:-20, duration:300, delay:100}}>
        <span class="text-sm text-slate-400 mr-2">Font Family:</span>
        {#each fontFamilies as fontFamily, i}
            <button
                on:click={() => selectedFontFamilyClass = fontFamily.class}
                class="py-1 px-3 rounded-md text-xs mr-2 mb-2 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800"
                class:bg-brand-purple={selectedFontFamilyClass === fontFamily.class}
                class:text-white={selectedFontFamilyClass === fontFamily.class}
                class:bg-slate-700={selectedFontFamilyClass !== fontFamily.class}
                class:text-slate-300={selectedFontFamilyClass !== fontFamily.class}
                class:hover:bg-slate-600={selectedFontFamilyClass !== fontFamily.class}
            >
                {fontFamily.name}
            </button>
        {/each}
    </div>

    <!-- Muestra de Tipografía -->
    <div class="{selectedFontFamilyClass} space-y-4">
        {#each typeElements as el, i}
            <div
                class="p-3 border-l-4 border-slate-700"
                in:fly={{ x: -20, duration: 400, delay: 200 + i * 100 }}
            >
                <p class="text-xs text-slate-500 mb-1">{el.level} - <span class="font-mono">{el.class.split(' ').filter(c => c.startsWith('text-') || c.startsWith('font-')).join(' ')}</span></p>
                <p class="{el.class}">{el.text}</p>
            </div>
        {/each}
    </div>

    <p class="text-xs text-slate-400 mt-6 text-center">
        This demonstration showcases the typographic scale and styles used to ensure readability and visual hierarchy.
    </p>
</div>