<!-- src/lib/components/planet-responsive/ResponsiveImageDemo.svelte -->
<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut, quintInOut } from 'svelte/easing'; // quintInOut para transiciones de pestañas
    import type { SvelteComponent } from 'svelte';
    import DevicePhoneMobile from 'svelte-heros-v2/DevicePhoneMobile.svelte';
    import DeviceTablet from 'svelte-heros-v2/DeviceTablet.svelte';
    import ComputerDesktop from 'svelte-heros-v2/ComputerDesktop.svelte';

    // --- ESTADOS PARA SIMULACIÓN DE VIEWPORT (común a ambas pestañas) ---
    let viewportContainerClass = 'w-full';
    let currentViewportWidthDisplay = '100%';
    let activeViewportNameForSimulation = 'Desktop'; // Renombrado para evitar confusión con pestaña activa

    const imageSources = {
        Mobile: "/images/responsive/image-portrait-detail.png",
        Tablet: "/images/responsive/image-landscape-medium.png",
        Desktop: "/images/responsive/image-panorama-large.png"
    };
    let currentImageSrcForArtDirection = imageSources.Desktop;

    interface ViewportOption {
        name: 'Mobile' | 'Tablet' | 'Desktop';
        class: string;
        iconComponent: typeof SvelteComponent;
        widthDisplay: string;
    }
    const viewports: ViewportOption[] = [
        { name: 'Mobile', class: 'w-[375px] max-w-full', iconComponent: DevicePhoneMobile as unknown as typeof SvelteComponent, widthDisplay: '375px' },
        { name: 'Tablet', class: 'w-[768px] max-w-full', iconComponent: DeviceTablet as unknown as typeof SvelteComponent, widthDisplay: '768px' },
        { name: 'Desktop', class: 'w-full', iconComponent: ComputerDesktop as unknown as typeof SvelteComponent, widthDisplay: '100%' }
    ];

    function setDemoViewport(vp: ViewportOption) {
        viewportContainerClass = vp.class;
        activeViewportNameForSimulation = vp.name;
        currentViewportWidthDisplay = vp.widthDisplay;
        currentImageSrcForArtDirection = imageSources[vp.name];
    }

    // --- ESTADOS Y TIPOS PARA PESTAÑAS ---
    type TabId = 'fluid' | 'artDirection'; // Tipo unión para los IDs de las pestañas

    interface Tab { // Interfaz para los objetos de pestaña
        id: TabId; // Usa el tipo TabId aquí
        label: string;
    }

    let activeTab: TabId = 'fluid';

    // Tipar el array 'tabs' explícitamente con Tab[]
    const tabs: Tab[] = [
        { id: 'fluid', label: '1. Fluid Image' },
        { id: 'artDirection', label: '2. Art Direction (Simulated)' }
    ];
</script>

<div class="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-xl mt-10">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Flexible Images & Media</h5>
    <p class="text-sm text-slate-400 mb-4">
        Ensuring media scales gracefully. Click viewport buttons to simulate device widths for the active demo.
    </p>

    <!-- Selectores de Viewport para la Demo (ahora afectan a la pestaña activa) -->
    <div class="mb-6 flex flex-wrap justify-center items-center gap-2 p-2 bg-slate-900/40 rounded-md">
        {#each viewports as vp (vp.name)}
            <button
                on:click={() => setDemoViewport(vp)}
                class="flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                       {activeViewportNameForSimulation === vp.name ? 'bg-emerald-500 text-white focus:ring-emerald-400' : 'bg-slate-600 hover:bg-slate-500 text-slate-300 focus:ring-slate-400'}"
                title="Simulate {vp.name} ({vp.widthDisplay})"
            >
                <svelte:component this={vp.iconComponent} class="w-4 h-4" />
                <span>{vp.name}</span>
            </button>
        {/each}
        <span class="text-xs text-slate-400 ml-auto pl-2">Simulated: <span class="font-semibold text-emerald-400">{currentViewportWidthDisplay}</span></span>
    </div>

    <!-- Pestañas de Navegación Interna -->
    <div class="mb-6 border-b border-slate-700 flex space-x-1">
        {#each tabs as tab (tab.id)}
            <button
                on:click={() => activeTab = tab.id}
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 focus:outline-none -mb-px"
                class:text-emerald-400={activeTab === tab.id}
                class:border-emerald-400={activeTab === tab.id}
                class:text-slate-400={activeTab !== tab.id}
                class:border-transparent={activeTab !== tab.id}
                class:hover:text-slate-200={activeTab !== tab.id}
                class:hover:border-slate-500={activeTab !== tab.id}
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <div class="mx-auto border border-slate-700/50 rounded-md p-1 sm:p-2 transition-all duration-300 ease-in-out {viewportContainerClass}"
         style={viewportContainerClass.startsWith('w-[') ? `max-width: ${currentViewportWidthDisplay};` : ''}>

        <!-- Contenido de las Pestañas -->
        <div class="bg-slate-700/30 p-2 sm:p-4 rounded min-h-[250px]">
            {#key activeTab} <!-- Key para forzar re-render y transiciones entre pestañas -->
                {#if activeTab === 'fluid'}
                    <div class="space-y-4" in:fade={{duration:250, delay:150, easing:quintOut}} out:fade={{duration:150, easing:quintOut}}>
                        <h6 class="text-md font-semibold text-slate-100">Fluid Image (<code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">max-width: 100%</code>)</h6>
                        <p class="text-xs text-slate-400">
                            This image scales down to fit its container, maintaining its aspect ratio.
                            The <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">h-auto</code> attribute is key for this behavior.
                        </p>
                        <div>
                            <img src="/images/responsive/image-panorama-large.png" alt="A large landscape" class="max-w-full h-auto mx-auto rounded-md shadow-md block"/>
                        </div>
                    </div>
                {:else if activeTab === 'artDirection'}
                    <div class="space-y-4" in:fade={{duration:250, delay:150, easing:quintOut}} out:fade={{duration:150, easing:quintOut}}>
                        <h6 class="text-md font-semibold text-slate-100">Art Direction (Simulated with JS)</h6>
                        <p class="text-xs text-slate-400">
                            The image source below changes based on the selected simulated viewport above.
                            An actual <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono"><picture>tag</code> relies on browser viewport media queries.
                        </p>
                        <div>
                            {#key currentImageSrcForArtDirection}
                                <img
                                    src={currentImageSrcForArtDirection}
                                    alt="Adaptable art-directed image for {activeViewportNameForSimulation}"
                                    class="max-w-full h-auto mx-auto rounded-md shadow-md block"
                                    in:fade={{duration:300}}
                                />
                            {/key}
                        </div>
                        <p class="text-xs text-slate-500 mt-2 text-center"> (Browser caching might still affect immediate changes.)</p>
                    </div>
                {/if}
            {/key}
        </div>
    </div>
</div>