<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let isLoading = false;
    let showContent = false;

    async function loadContent() {
        isLoading = true;
        showContent = false; // Asegurarse de que el contenido no se muestre durante la carga

        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 2500)); // Simula 2.5 segundos de carga

        isLoading = false;
        showContent = true;
    }

    // Clases para el botón de este showcase
    const btnBase = "py-2 px-4 rounded-md font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    const btnAccent = "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400"; // Usando el color de acento de esta sección

    // Clases para el skeleton
    const skeletonBase = "bg-slate-700 rounded";
    const skeletonPulse = "animate-pulse"; // Animación de pulso de Tailwind
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Animated Skeleton Loaders</h5>
    <p class="text-sm text-slate-400 mb-6">
        Improving perceived performance during content loading with subtle placeholder animations.
    </p>

    <div class="mb-6 text-center sm:text-left">
        <button
            class="{btnBase} {btnAccent}"
            on:click={loadContent}
            disabled={isLoading || showContent}
        >
            {#if isLoading}
                <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" role="status" aria-label="loading"></span>
                Loading...
            {:else if showContent}
                Content Loaded (Reload to Demo)
            {:else}
                Load Content Example
            {/if}
        </button>
    </div>

    <!-- Contenedor para el Loader y el Contenido -->
    <div class="bg-slate-700/30 p-4 rounded-lg min-h-[200px] border border-slate-700">
        {#if isLoading}
            <!-- Skeleton Loader -->
            <div class="space-y-4" in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
                <div class="flex items-center space-x-4">
                    <div class="{skeletonBase} {skeletonPulse} h-12 w-12 rounded-full"></div>
                    <div class="flex-1 space-y-2">
                        <div class="{skeletonBase} {skeletonPulse} h-4 w-3/4"></div>
                        <div class="{skeletonBase} {skeletonPulse} h-4 w-1/2"></div>
                    </div>
                </div>
                <div class="{skeletonBase} {skeletonPulse} h-6 w-full"></div>
                <div class="{skeletonBase} {skeletonPulse} h-4 w-full"></div>
                <div class="{skeletonBase} {skeletonPulse} h-4 w-5/6"></div>
                <div class="{skeletonBase} {skeletonPulse} h-4 w-3/4"></div>
            </div>
        {:else if showContent}
            <!-- Contenido Real (Simulado) -->
            <div in:fade={{ duration: 400, delay: 100 }} out:fade={{duration: 200}}>
                <div class="flex items-center space-x-4 mb-4">
                    <img src="/images/avatars/avatar-female-1.png" alt="User Avatar" class="h-12 w-12 rounded-full bg-slate-600">
                    <div>
                        <h6 class="font-semibold text-slate-100">Elena Vos</h6>
                        <p class="text-xs text-slate-400">Chief Motion Architect</p>
                    </div>
                </div>
                <h6 class="text-xl font-bold text-sky-400 mb-2">Dynamic Content Loaded Successfully!</h6>
                <p class="text-sm text-slate-300 leading-relaxed">
                    This section now displays the actual content, replacing the skeleton placeholders.
                    The transition provides a smoother user experience during data fetching and rendering.
                    Notice how the structure mirrors the skeleton for a seamless switch.
                </p>
            </div>
        {:else}
            <!-- Estado Inicial: Placeholder para hacer clic en el botón -->
            <div class="flex items-center justify-center h-full text-slate-500 text-sm">
                Click "Load Content Example" to see the skeleton loader in action.
            </div>
        {/if}
    </div>

    <p class="text-xs text-slate-500 mt-6 text-center">
        Skeleton screens provide a better loading experience than traditional spinners for complex UIs.
    </p>
</div>

<style>
    /* Si necesitas una animación de barrido de gradiente en lugar de pulso: */
    /*
    .skeleton-sweep {
        background-image: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.05) 20%,
            rgba(255,255,255,0.2) 40%,
            rgba(255,255,255,0.05) 60%,
            transparent 100%
        );
        background-size: 400% 100%;
        animation: sweep 1.5s infinite linear;
    }
    @keyframes sweep {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }
    */
    /* Si usas 'skeleton-sweep', reemplaza 'skeletonPulse' con 'skeleton-sweep' en el HTML */
</style>