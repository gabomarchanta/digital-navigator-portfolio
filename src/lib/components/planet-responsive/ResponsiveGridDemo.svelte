<!-- src/lib/components/planet-responsive/ResponsiveGridDemo.svelte -->
<script lang="ts">
    import DevicePhoneMobile from 'svelte-heros-v2/DevicePhoneMobile.svelte';
    import DeviceTablet from 'svelte-heros-v2/DeviceTablet.svelte'; // Importa el icono de tablet
    import ComputerDesktop from 'svelte-heros-v2/ComputerDesktop.svelte'; // Importa el icono de desktop
    import type { SvelteComponent } from 'svelte';

    let viewportClass = 'w-full'; // Por defecto, ancho completo
    let currentViewportWidth = '100%'; // Para mostrar el ancho actual

    interface ViewportOption {
        name: string;
        class: string;
        iconComponent: typeof SvelteComponent; // Usar ComponentType
        widthDisplay: string;
    }

    const viewports: ViewportOption[] = [
        { name: 'Mobile', class: 'w-[375px] max-w-full', iconComponent: DevicePhoneMobile as unknown as typeof SvelteComponent, widthDisplay: '375px' },
        { name: 'Tablet', class: 'w-[768px] max-w-full', iconComponent: DeviceTablet as unknown as typeof SvelteComponent, widthDisplay: '768px' },
        { name: 'Desktop', class: 'w-full', iconComponent: ComputerDesktop as unknown as typeof SvelteComponent, widthDisplay: '100%' }
    ];
    let activeViewportName = viewports[2].name; // Inicialmente Desktop

    function setViewport(vp: ViewportOption) {
        viewportClass = vp.class;
        activeViewportName = vp.name;
        currentViewportWidth = vp.widthDisplay;
    }
</script>

<div class="mb-4 flex flex-wrap justify-center items-center gap-2 p-2 bg-slate-800/30 rounded-md">
    {#each viewports as vp (vp.name)}
        <button
            on:click={() => setViewport(vp)}
            class="flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                   {activeViewportName === vp.name ? 'bg-emerald-500 text-white focus:ring-emerald-400' : 'bg-slate-600 hover:bg-slate-500 text-slate-300 focus:ring-slate-400'}"
            title="Set viewport to {vp.name} ({vp.widthDisplay})"
        >
            <svelte:component this={vp.iconComponent} class="w-4 h-4" />
            <span>{vp.name}</span>
        </button>
    {/each}
    <span class="text-xs text-slate-400 ml-auto pl-2">Current Simulated Width: <span class="font-semibold text-emerald-400">{currentViewportWidth}</span></span>
</div>

<!-- Contenedor del viewport simulado -->
<div class="mx-auto border-2 border-slate-700 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out {viewportClass}"
     style={viewportClass.startsWith('w-[') ? `max-width: ${currentViewportWidth};` : ''}
>
     <!-- Área de scroll interna con clases de tailwindcss-scrollbar -->
    <div class="h-[400px] overflow-auto bg-slate-900/50
                scrollbar-thin                <!-- Soportado -->
                scrollbar-thumb-slate-700     <!-- Soportado -->
                scrollbar-track-slate-800  <!-- El /50 para opacidad podría depender de si tu color slate-800 está definido con opacidad o si el plugin lo maneja. Prueba sin /50 primero: scrollbar-track-slate-800 -->
                hover:scrollbar-thumb-slate-600 <!-- Soportado -->
                scrollbar-thumb-rounded-full  <!-- Soportado -->
                scrollbar-track-rounded-full  <!-- Soportado -->
               "
    >
        <!-- TU LAYOUT RESPONSIVO AQUÍ (ej. el grid de tarjetas) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {#each Array(12) as _, i}
                <div class="bg-slate-700/80 min-h-[100px] rounded-md flex flex-col items-center justify-center text-slate-300 p-3">
                    <span class="text-2xl font-bold">{i + 1}</span>
                    <span class="text-xs text-slate-400">Item</span>
                </div>
            {/each}
        </div>
        <div class="p-4 text-center text-xs text-slate-500">
            (Try resizing your browser window too!)
        </div>
    </div>
</div>