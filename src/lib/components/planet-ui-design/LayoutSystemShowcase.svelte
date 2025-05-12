<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let showGridOverlay = false;
    let showSpacingOverlay = false;
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h4 class="text-xl font-semibold text-purple-400 mb-1">Grids & Spacing</h4> <!-- Color de acento -->
    <p class="text-sm text-slate-400 mb-6">
        The invisible architecture that brings order and harmony to user interfaces.
    </p>

    <div class="space-y-8">
        <!-- Demostración de Grid de Columnas -->
        <div in:fly={{x: -20, duration:300, delay:100}}>
            <div class="flex justify-between items-center mb-3">
                <h5 class="text-lg font-medium text-slate-200">12-Column Grid System</h5>
                <button
                    on:click={() => showGridOverlay = !showGridOverlay}
                    class="text-xs py-1 px-3 rounded-md transition-colors duration-200
                           {showGridOverlay ? 'bg-brand-purple text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}"
                >
                    {showGridOverlay ? 'Hide' : 'Show'} Grid Overlay
                </button>
            </div>
            <p class="text-xs text-slate-400 mb-4">
                A 12-column grid provides flexibility for various layouts, ensuring alignment and balance across different screen sizes. Elements are typically sized and positioned based on these columns.
            </p>
            <div class="relative bg-slate-900/70 p-4 rounded aspect-[16/7] overflow-hidden">
                <!-- Ejemplo de Layout Simple -->
                <div class="grid grid-cols-12 gap-4 h-full text-xs">
                    <div class="col-span-12 md:col-span-3 bg-slate-700/80 p-2 rounded flex items-center justify-center text-slate-300">Sidebar (3 cols)</div>
                    <div class="col-span-12 md:col-span-9 bg-slate-700/80 p-2 rounded flex flex-col justify-between">
                        <div class="bg-slate-600/50 p-2 rounded mb-2 text-slate-300 text-center">Header in Main (9 cols)</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-grow">
                            <div class="bg-slate-600/50 p-2 rounded flex items-center justify-center text-slate-300">Content A</div>
                            <div class="bg-slate-600/50 p-2 rounded flex items-center justify-center text-slate-300">Content B</div>
                        </div>
                    </div>
                </div>

                <!-- Overlay del Grid (visible si showGridOverlay es true) -->
                {#if showGridOverlay}
                    <div transition:fade={{duration:200}} class="absolute inset-0 grid grid-cols-12 gap-4 p-4 pointer-events-none">
                        {#each Array(12) as _, i}
                            <div class="bg-brand-cyan/10 border border-brand-cyan/30 rounded h-full"></div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Demostración de Sistema de Espaciado -->
        <div in:fly={{x: -20, duration:300, delay:200}}>
            <div class="flex justify-between items-center mb-3">
                <h5 class="text-lg font-medium text-slate-200">8pt Spacing System</h5>
                 <button
                    on:click={() => showSpacingOverlay = !showSpacingOverlay}
                    class="text-xs py-1 px-3 rounded-md transition-colors duration-200
                           {showSpacingOverlay ? 'bg-brand-cyan text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}"
                >
                    {showSpacingOverlay ? 'Hide' : 'Show'} Spacing Hints
                </button>
            </div>
            <p class="text-xs text-slate-400 mb-4">
                Using a consistent spacing scale (e.g., multiples of 8px) for margins, paddings, and element dimensions creates visual rhythm and predictability. (Tailwind's default spacing scale is 4px based).
            </p>
            <div class="relative bg-slate-900/70 p-8 rounded">
                <div class="bg-slate-700/80 p-4 rounded text-slate-300 text-sm">
                    Outer Element (p-8)
                    <div class="bg-slate-600/50 p-4 mt-4 rounded">
                        Inner Element (p-4, mt-4)
                        <p class="mt-2 text-xs">Text with mt-2 (8px)</p>
                    </div>
                     <button class="py-2 px-3 bg-brand-cyan text-space-darkest rounded text-xs font-semibold mt-6">Button (py-2, px-3, mt-6)</button>
                </div>
                    {#if showSpacingOverlay}
                         <div transition:fade={{duration:200}} class="absolute inset-0 p-0 pointer-events-none">
                            <!-- Hint para el padding p-8 del contenedor principal -->
                            <div class="absolute top-0 left-0 w-full h-8 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan/70 text-[10px] border-b border-dashed border-brand-cyan/30">Padding Top: 32px (p-8)</div>
                            <div class="absolute bottom-0 left-0 w-full h-8 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan/70 text-[10px] border-t border-dashed border-brand-cyan/30">Padding Bottom: 32px (p-8)</div>
                            <div class="absolute top-0 left-0 w-8 h-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan/70 text-[10px] border-r border-dashed border-brand-cyan/30"><span class="transform -rotate-90 whitespace-nowrap">Padding Left: 32px (p-8)</span></div>
                            <div class="absolute top-0 right-0 w-8 h-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan/70 text-[10px] border-l border-dashed border-brand-cyan/30"><span class="transform -rotate-90 whitespace-nowrap">Padding Right: 32px (p-8)</span></div>

                            <!-- Hint para el margen superior del botón (ejemplo) -->
                            <div class="absolute bottom-[calc(2rem+0.5rem+0.5rem+1.5rem)] left-8 right-8 h-6 bg-emerald-500/10 flex items-center justify-center text-emerald-500/70 text-[10px] border-t border-b border-dashed border-emerald-500/30">
                                Button Margin Top: 24px (mt-6)
                            </div>
                        </div>
                    {/if}
            </div>
        </div>
    </div>
    <p class="text-xs text-slate-500 mt-8 text-center">
        Consistent grids and spacing are fundamental for clean, scalable, and user-friendly designs.
    </p>
</div>