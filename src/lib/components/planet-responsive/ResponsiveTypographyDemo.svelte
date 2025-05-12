<!-- src/lib/components/planet-responsive/ResponsiveTypographyDemo.svelte -->
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
    let activeViewportNameForSim = 'Desktop';

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
        activeViewportNameForSim = vp.name;
        currentViewportWidthDisplay = vp.widthDisplay;
    }

    // --- ESTADOS Y TIPOS PARA PESTAÑAS ---
    type TypographyTabId = 'tailwindClasses' | 'cssClamp';
    interface TypographyTab { id: TypographyTabId; label: string; }

    let activeTypographyTab: TypographyTabId = 'tailwindClasses';

    const typographyTabs: TypographyTab[] = [
        { id: 'tailwindClasses', label: '1. Tailwind Prefixes' },
        { id: 'cssClamp', label: '2. CSS clamp() Fluidity' }
    ];

    const typeContent = {
        heading1: "Adapting Headlines for Readability",
        heading2: "Section Titles that Scale",
        paragraph: "Body text must remain comfortable to read across all devices. Line length, font size, and line height are crucial. Responsive typography ensures that as the viewport changes, these elements adjust to provide an optimal reading experience, whether on a small phone or a large desktop monitor. This paragraph will demonstrate how its size adapts.",
        caption: "Captions and smaller text elements also need to scale appropriately to maintain their place in the visual hierarchy."
    };
</script>

<div class="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-xl mt-10">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Responsive Typography</h5>
    <p class="text-sm text-slate-400 mb-6">
        Text sizes adjust for readability on any screen. Use viewport buttons for the active demo.
    </p>

    <!-- Selectores de Viewport (Solo una vez) -->
    <div class="mb-6 flex flex-wrap justify-center items-center gap-2 p-2 bg-slate-900/40 rounded-md">
        {#each viewports as vp (vp.name)}
            <button
                on:click={() => setDemoViewport(vp)}
                class="flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
                       {activeViewportNameForSim === vp.name ? 'bg-emerald-500 text-white focus:ring-emerald-400' : 'bg-slate-600 hover:bg-slate-500 text-slate-300 focus:ring-slate-400'}"
                title="Simulate {vp.name} ({vp.widthDisplay})"
            >
                <svelte:component this={vp.iconComponent} class="w-4 h-4" />
                <span>{vp.name}</span>
            </button>
        {/each}
        <span class="text-xs text-slate-400 ml-auto pl-2">Simulated: <span class="font-semibold text-emerald-400">{currentViewportWidthDisplay}</span></span>
    </div>

    <!-- Pestañas de Navegación Interna para Tipografía -->
    <div class="mb-6 border-b border-slate-700 flex space-x-1">
        {#each typographyTabs as tab (tab.id)}
            <button
                on:click={() => activeTypographyTab = tab.id}
                class="px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 focus:outline-none -mb-px"
                class:text-amber-400={activeTypographyTab === tab.id}
                class:border-amber-400={activeTypographyTab === tab.id}
                class:text-slate-400={activeTypographyTab !== tab.id}
                class:border-transparent={activeTypographyTab !== tab.id}
                class:hover:text-slate-200={activeTypographyTab !== tab.id}
                class:hover:border-slate-500={activeTypographyTab !== tab.id}
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <div class="mx-auto border border-slate-700/50 rounded-md p-1 sm:p-2 transition-all duration-300 ease-in-out {viewportContainerClass}"
         style={viewportContainerClass.startsWith('w-[') ? `max-width: ${currentViewportWidthDisplay};` : ''}>
        <div class="bg-slate-700/30 p-4 sm:p-6 rounded min-h-[280px] text-slate-200">
            {#key activeTypographyTab}
                {#if activeTypographyTab === 'tailwindClasses'}
                    <div class="space-y-4" in:fade={{duration:250, delay:150, easing:quintOut}} out:fade={{duration:150, easing:quintOut}}>
                        <p class="text-xs text-amber-400 mb-1 font-mono">Using Tailwind's Responsive Prefixes:</p>
                        <p class="text-sm text-slate-400 mb-3">
                            Tailwind's prefixes (<code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">sm:</code>, <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">md:</code>, <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">lg:</code>) apply styles at specific browser viewport breakpoints.
                            Resize your browser window to see these text sizes change.
                        </p>
                        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-2 leading-tight">{typeContent.heading1}</h1>
                        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 mb-3 leading-tight">{typeContent.heading2}</h2>
                        <p class="text-sm sm:text-base text-slate-300 leading-relaxed mb-3">{typeContent.paragraph}</p>
                        <p class="text-xs sm:text-sm text-slate-400 italic">{typeContent.caption}</p>
                    </div>
                {:else if activeTypographyTab === 'cssClamp'}
                    <div class="space-y-4" in:fade={{duration:250, delay:150, easing:quintOut}} out:fade={{duration:150, easing:quintOut}}>
                        <p class="text-xs text-amber-400 mb-1 font-mono">Using CSS <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">clamp()</code> for Fluid Typography:</p>
                         <p class="text-sm text-slate-400 mb-3">
                            The <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">clamp()</code> function allows font sizes to scale fluidly based on viewport width.
                            Resize your browser to observe the smooth scaling.
                        </p>
                        <h1 class="fluid-h1 font-bold text-emerald-400 mb-2 leading-tight">{typeContent.heading1}</h1>
                        <p class="fluid-p text-slate-300 leading-relaxed">{typeContent.paragraph.substring(0,200)}...</p>
                        <p class="text-xs text-slate-500 mt-2">
                            (Inspect these elements to see the <code class="bg-slate-600 text-amber-300 px-1 py-0.5 rounded-sm text-xs font-mono">clamp()</code> function in their CSS.)
                        </p>
                    </div>
                {/if}
            {/key}
        </div>
    </div>
</div>

<style lang="postcss">
    /* La clase .code-inline-style ya no se usa si aplicas las utilidades directamente.
       Si decides mantenerla y usar @apply, y SIGUE fallando incluso con lang="postcss",
       entonces es una indicación fuerte de que @apply en <style> de componentes Svelte
       es problemático con tu setup de Tailwind v4 Alpha.
    */

    /* Estilos para clamp() se mantienen, ya que esto es CSS puro + theme() */
    .fluid-h1 {
        font-size: clamp(1.25rem, 4vw + 0.5rem, 2.5rem);
        line-height: theme('lineHeight.tight'); /* Esto SÍ debería funcionar con lang="postcss" */
    }
    .fluid-p {
        font-size: clamp(0.875rem, 1.5vw + 0.5rem, 1.125rem);
        line-height: 1.7;
    }
</style>