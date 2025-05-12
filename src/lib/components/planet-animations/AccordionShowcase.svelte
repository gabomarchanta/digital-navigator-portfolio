<script lang="ts">
    import { fly, slide } from 'svelte/transition'; // Necesitamos 'slide' para el acordeón
    import { quintOut } from 'svelte/easing';

    // Datos para los items del acordeón
    const accordionItems = [
        {
            id: 1,
            title: 'Mission Objective Alpha: Core Systems',
            content: 'Primary directive: Ensure the stability and optimal performance of all core digital infrastructure. This involves routine diagnostics, proactive maintenance, and immediate response to any system anomalies. The goal is zero unplanned downtime.'
        },
        {
            id: 2,
            title: 'Exploration Log: Nebula X-7 Observations',
            content: 'The X-7 Nebula exhibits unusual gravitational lensing effects. Spectrographic analysis reveals high concentrations of exotic matter. Further sensor sweeps are scheduled to map a safe passage for the \'Pathfinder\' probe.'
        },
        {
            id: 3,
            title: 'Communication Protocol Gamma-9 Update',
            content: 'All long-range communication arrays have been updated to Protocol Gamma-9. This enhancement provides a 300% increase in data encryption strength and a 50% reduction in signal latency over interstellar distances. Test transmissions successful.'
        }
    ];

    // Estado para controlar qué item está abierto.
    // Para permitir solo un item abierto a la vez:
    let openItemId: number | null = 1; // El primer item abierto por defecto

    // Para permitir múltiples items abiertos (comenta la línea de arriba y descomenta esta):
    // let openItemIds: Set<number> = new Set([1]); // El primer item abierto por defecto

    function toggleItem(itemId: number) {
        // Lógica para un solo item abierto
        if (openItemId === itemId) {
            openItemId = null; // Cierra si ya está abierto
        } else {
            openItemId = itemId; // Abre el nuevo
        }

        // Lógica para múltiples items abiertos (descomenta si usas openItemIds)
        /*
        if (openItemIds.has(itemId)) {
            openItemIds.delete(itemId);
        } else {
            openItemIds.add(itemId);
        }
        openItemIds = openItemIds; // Forza la reactividad de Svelte para el Set
        */
    }

    // Función helper para verificar si un item está abierto (para la opción de múltiples)
    // function isItemOpen(itemId: number) {
    //     return openItemIds.has(itemId);
    // }
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Animated Accordion / Expansible Panels</h5>
    <p class="text-sm text-slate-400 mb-6">
        Smoothly revealing and hiding content sections, guided by subtle motion.
    </p>

    <div class="space-y-2 rounded-md overflow-hidden border border-slate-700">
        {#each accordionItems as item, i (item.id)}
            {@const isOpen = openItemId === item.id} <!-- Para un solo item abierto -->
            <!-- {@const isOpen = isItemOpen(item.id)} Para múltiples items abiertos -->

            <div class="bg-slate-700/30" in:fly={{ y: 20, duration: 300, delay: i * 100, easing: quintOut }}>
                <h2>
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-4 text-left text-slate-200 hover:bg-slate-700/60 focus:outline-none focus:bg-slate-700/60 transition-colors duration-150"
                        on:click={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        aria-controls="accordion-content-{item.id}"
                    >
                        <span class="font-medium">{item.title}</span>
                        <svg
                            class="w-5 h-5 transform transition-transform duration-200 ease-in-out"
                            class:-rotate-180={isOpen}
                            class:rotate-0={!isOpen}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        >
                            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </h2>

                {#if isOpen}
                    <div
                        transition:slide={{ duration: 300, easing: quintOut }}
                        id="accordion-content-{item.id}"
                        class="p-4 border-t border-slate-600/50"
                    >
                        <p class="text-sm text-slate-300 leading-relaxed">
                            {item.content}
                        </p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    <p class="text-xs text-slate-500 mt-6 text-center">
        Accordions help organize content into collapsible sections, improving scannability.
    </p>
</div>