<script lang="ts">
    import { fly } from 'svelte/transition';

    let isLoadingPrimary = false;
    let isLoadingSecondary = false;

    function toggleLoading(buttonType: 'primary' | 'secondary') {
        if (buttonType === 'primary') {
            isLoadingPrimary = true;
            setTimeout(() => isLoadingPrimary = false, 2000);
        } else {
            isLoadingSecondary = true;
            setTimeout(() => isLoadingSecondary = false, 2000);
        }
    }

    // Define tus clases base y variantes aquí para referencia o para un futuro componente <Button>
    const btnBase = "py-2 px-4 rounded-md font-semibold transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
    const btnPrimary = "bg-brand-cyan text-space-darkest hover:bg-cyan-500 active:bg-cyan-600 focus:ring-brand-cyan";
    const btnPrimaryDisabled = "bg-brand-cyan"; // Ajusta si el disabled primario necesita un fondo diferente
    const btnSecondary = "bg-transparent border border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-space-darkest active:bg-pink-700 active:border-pink-700 focus:ring-brand-pink";
    const btnSecondaryDisabled = "border-brand-pink text-brand-pink";
    const btnGhost = "bg-transparent text-slate-300 hover:bg-slate-700 hover:text-slate-100 active:bg-slate-600 focus:ring-slate-500";
    const btnGhostDisabled = "text-slate-500";

</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h4 class="text-xl font-semibold text-brand-pink mb-1">Buttons</h4>
    <p class="text-sm text-slate-400 mb-6">
        Versatile actions for user interaction. Showcasing primary, secondary, states, and icon usage.
    </p>

    <div class="space-y-6">
        <!-- Variante Primaria -->
        <div in:fly={{x: -20, duration:300, delay:100}}>
            <p class="text-xs text-slate-500 mb-1">Primary Action</p>
            <div class="flex flex-wrap items-center justify-center gap-3 p-3 bg-slate-700/50 rounded">
                <button class="{btnBase} {btnPrimary}">Default</button>
                <button class="{btnBase} {btnPrimary}" on:click={() => toggleLoading('primary')}>
                    {#if isLoadingPrimary}
                        <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" role="status" aria-label="loading"></span>
                    {/if}
                    Click for Loading
                </button>
                <button class="{btnBase} {btnPrimary}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-1 inline-block"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4.006-5.5z" clip-rule="evenodd" /></svg>
                    With Icon
                </button>
                <button class="{btnBase} {btnPrimary} {btnPrimaryDisabled}" disabled>Disabled</button>
            </div>
        </div>

        <!-- Variante Secundaria -->
        <div in:fly={{x: -20, duration:300, delay:200}}>
            <p class="text-xs text-slate-500 mb-1">Secondary Action</p>
             <div class="flex flex-wrap items-center justify-center gap-3 p-3 bg-slate-700/50 rounded">
                <button class="{btnBase} {btnSecondary}">Default</button>
                 <button class="{btnBase} {btnSecondary}" on:click={() => toggleLoading('secondary')}>
                    {#if isLoadingSecondary}
                        <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" role="status" aria-label="loading"></span>
                    {/if}
                    Click for Loading
                </button>
                <button class="{btnBase} {btnSecondary}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-1 inline-block"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L5.44 12.553a4 4 0 00-.885 1.343z" /></svg>
                    With Icon
                </button>
                <button class="{btnBase} {btnSecondary} {btnSecondaryDisabled}" disabled>Disabled</button>
            </div>
        </div>

        <!-- Variante Terciaria/Ghost (Ejemplo) -->
        <div in:fly={{x: -20, duration:300, delay:300}}>
            <p class="text-xs text-slate-500 mb-1">Ghost/Text Action</p>
             <div class="flex flex-wrap items-center justify-center gap-3 p-3 bg-slate-700/50 rounded">
                <button class="{btnBase} {btnGhost}">Default Ghost</button>
                <button class="{btnBase} {btnGhost} {btnGhostDisabled}" disabled>Disabled Ghost</button>
            </div>
        </div>
    </div>
</div>

<!-- Ya no necesitas el bloque <style lang="postcss"> para los botones -->
<!-- Si necesitas otros estilos específicos del componente que no sean de botón, puedes añadirlos aquí -->
<style>
    /* Estilos para el spinner si no quieres usar clases de Tailwind para su color y borde */
    /* Por ejemplo, si el texto del botón es claro, el spinner también lo será. */
    /* Esto ya está manejado por 'border-current' en el span del spinner */
</style>