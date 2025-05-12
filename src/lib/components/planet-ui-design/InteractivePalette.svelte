<script lang="ts">
    import { fly } from 'svelte/transition';

    const portfolioPalette = [
        { name: 'Primary Brand', colorHex: '#22d3ee', cssVar: 'var(--color-brand-cyan)', bgColorClass: 'bg-brand-cyan', textColorClass: 'text-brand-cyan' },
        { name: 'Secondary Brand', colorHex: '#ec4899', cssVar: 'var(--color-brand-pink)', bgColorClass: 'bg-brand-pink', textColorClass: 'text-brand-pink' },
        { name: 'Accent Brand', colorHex: '#a855f7', cssVar: 'var(--color-brand-purple)', bgColorClass: 'bg-brand-purple', textColorClass: 'text-brand-purple' },
        { name: 'Dark Background', colorHex: '#0f172a', cssVar: 'var(--color-space-darkest)', bgColorClass: 'bg-space-darkest', textColorClass: 'text-space-darkest' }, // Este es texto oscuro
        { name: 'Light Text', colorHex: '#e5e7eb', cssVar: 'var(--color-space-lighter-text)', bgColorClass: 'bg-space-lighter-text', textColorClass: 'text-space-lighter-text' }, // Este es texto claro
    ];

    // Usaremos estas clases directamente
    let currentDemoTextColorClass = portfolioPalette[3].textColorClass; // Inicialmente 'text-space-lighter-text'
    let currentSelectedBgCssVar = portfolioPalette[0].cssVar;

    // Para el párrafo, podríamos necesitar una lógica ligeramente diferente o colores fijos
    let paragraphDemoTextColorClass = 'text-slate-600'; // Un color de contraste medio por defecto

    function selectColor(colorEntry: typeof portfolioPalette[0]) {
        currentSelectedBgCssVar = colorEntry.cssVar;

        // Lógica para cambiar el color del texto de demo
        // Si el fondo es uno de los colores claros o de marca vibrantes
        if (['bg-brand-cyan', 'bg-space-lighter-text'].includes(colorEntry.bgColorClass)) {
            currentDemoTextColorClass = 'text-space-darkest'; // Texto oscuro para fondos claros/vibrantes
            paragraphDemoTextColorClass = 'text-slate-600'; // Un gris más oscuro para el párrafo
        } else { // Para fondos oscuros
            currentDemoTextColorClass = 'text-space-lighter-text'; // Texto claro para fondos oscuros
            paragraphDemoTextColorClass = 'text-slate-200'; // Un gris más claro para el párrafo
        }
        console.log('currentDemoTextColorClass:', currentDemoTextColorClass);
        console.log('paragraphDemoTextColorClass:', paragraphDemoTextColorClass);
    }
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <!-- Selectores de Color -->
        <div class="flex flex-wrap justify-center md:justify-start gap-3">
            {#each portfolioPalette as colorEntry, i}
                <button
                    on:click={() => selectColor(colorEntry)}
                    class="p-3 rounded-md border-2 transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800"
                    style="background-color: {colorEntry.colorHex};
                           border-color: {currentSelectedBgCssVar === colorEntry.cssVar ? colorEntry.colorHex : 'transparent'};
                           box-shadow: {currentSelectedBgCssVar === colorEntry.cssVar ? `0 0 10px ${colorEntry.colorHex}` : 'none'};"
                    title={colorEntry.name}
                    in:fly={{y:20, delay: i * 100, duration:300}}
                >
                    <span class="block w-8 h-8 sm:w-10 sm:h-10 rounded" style="background-color: {colorEntry.colorHex};"></span>
                    <span class="sr-only">{colorEntry.name}</span>
                </button>
            {/each}
        </div>

        <!-- Área de Previsualización -->
        <div
            class="p-6 rounded-lg border border-slate-700 transition-colors duration-300"
            style="background-color: {currentSelectedBgCssVar};"
            in:fly={{x:20, delay:300, duration:400}}
        >
            <h4 class:mb-2={true} class:text-lg={true} class:font-semibold={true} class="{currentDemoTextColorClass}">
                Example Component
            </h4>
            <p class:mb-4={true} class:text-sm={true} class="{paragraphDemoTextColorClass}">
                This card adapts to the selected color.
            </p>
            <button
                class="font-semibold py-2 px-4 rounded transition-all duration-200 {currentDemoTextColorClass}"
                style="background-color: {['var(--color-space-darkest)', 'var(--color-brand-purple)'].includes(currentSelectedBgCssVar) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
                       border: 1px solid {currentDemoTextColorClass === 'text-space-darkest' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};"
            >
                Action Button
            </button>
        </div>
    </div>
    <p class="text-xs text-slate-400 mt-4 text-center md:text-left">
        Selected Background: <span class="font-mono p-1 rounded bg-slate-700" style="color: {currentSelectedBgCssVar}; border: 1px solid {currentSelectedBgCssVar};">{currentSelectedBgCssVar}</span>
        (Click a swatch to see it applied)
    </p>
</div>