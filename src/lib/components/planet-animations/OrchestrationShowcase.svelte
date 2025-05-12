<!-- src/lib/components/planet-animations/OrchestrationShowcase.svelte -->
<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut, quintInOut, circOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import ListItem from '$lib/components/planet-animations/ListItem.svelte'; // Ajusta la ruta si es necesario

    // Define la estructura de un item de la lista base
    interface BaseListItem {
        id: number;
        text: string;
    }

    // Define la estructura de un item que se va a mostrar (con propiedades 'show' e 'index')
    interface DisplayedListItem extends BaseListItem {
        show: boolean;
        index: number;
    }

    // --- Demo de Staggered List ---
    const listItemsData: BaseListItem[] = [ // Renombrado a listItemsData para evitar confusión con el componente
        { id: 1, text: 'Initializing Core Systems...' },
        { id: 2, text: 'Calibrating Navigational Arrays...' },
        { id: 3, text: 'Verifying Life Support...' },
        { id: 4, text: 'Powering Up Warp Engines...' },
        { id: 5, text: 'All Systems Nominal. Ready for Launch!' }
    ];

    let displayedListItems: DisplayedListItem[] = [];
    let showListTrigger = false;
    let listTimeouts: number[] = []; // CORREGIDO: Tipo a number[]

    function toggleStaggeredList() {
        showListTrigger = !showListTrigger;
        listTimeouts.forEach(clearTimeout);
        listTimeouts = [];
        displayedListItems = [];

        if (showListTrigger) {
            listItemsData.forEach((item: BaseListItem, i: number) => { // CORREGIDO: Tipos explícitos y usa listItemsData
                const timeoutId = setTimeout(() => {
                    displayedListItems = [...displayedListItems, { ...item, show: true, index: i }];
                }, 75 * i);
                listTimeouts.push(timeoutId);
            });
        }
    }

    // --- Demo de Page/View Transition (Simulada) ---
    let currentView: 'viewA' | 'viewB' = 'viewA';
    interface ViewItem { id: string; text: string; }
    const viewA_items: ViewItem[] = [{id: 'vA-item1', text: "Quantum Entanglement Report"}, {id: 'vA-item2', text: "Dark Matter Analysis"}, {id: 'vA-item3', text: "Hyperspace Anomaly Log"}];
    const viewB_items: ViewItem[] = [{id: 'vB-item1', text: "Stellar Cartography Update"}, {id: 'vB-item2', text: "Xenolinguistics Primer"}, {id: 'vB-item3', text: "Terraforming Feasibility Study"}];

    const btnBase = "py-2 px-3 rounded-md font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm";
    const btnAccent = "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500";
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Orchestrated & Page Transitions</h5>
    <p class="text-sm text-slate-400 mb-6">
        Creating cohesive experiences with sequenced animations and smooth view changes.
    </p>

    <div class="space-y-10">
        <!-- 1. Staggered List Animation -->
        <div class="p-4 border border-slate-700 rounded-md" in:fly={{y: 20, duration:300, delay:100}}>
            <h6 class="text-md font-semibold text-slate-100 mb-2">Staggered List Entrance</h6>
            <p class="text-xs text-slate-400 mb-4">Items appear sequentially, creating a flowing introduction.</p>
            <button class="{btnBase} {btnAccent} mb-4" on:click={toggleStaggeredList}>
                {showListTrigger ? 'Hide System Check List' : 'Show System Check List'}
            </button>

            {#if displayedListItems.length > 0 || showListTrigger} <!-- Mantenemos la UL si está "activada" para la animación out -->
                <ul class="space-y-2 pl-1">
                    {#each displayedListItems as listItem (listItem.id)}
                        <ListItem item={{id: listItem.id, text: listItem.text}} show={listItem.show} />
                    {/each}
                </ul>
            {/if}
        </div>

        <!-- 2. Page/View Transition (Simulada with Crossfade) -->
        <div class="p-4 border border-slate-700 rounded-md" in:fly={{y: 20, duration:300, delay:200}}>
            <h6 class="text-md font-semibold text-slate-100 mb-2">Simulated View Transition (Crossfade)</h6>
            <p class="text-xs text-slate-400 mb-4">Smoothly transition between different sets of content. Uses Svelte's 'crossfade'.</p>
            <div class="mb-4">
                <button class="{btnBase} {currentView === 'viewA' ? 'bg-sky-600 text-white' : 'bg-slate-600 hover:bg-slate-500 text-slate-300'}" on:click={() => currentView = 'viewA'}>Data View A</button>
                <button class="{btnBase} {currentView === 'viewB' ? 'bg-sky-600 text-white' : 'bg-slate-600 hover:bg-slate-500 text-slate-300'} ml-2" on:click={() => currentView = 'viewB'}>Data View B</button>
            </div>

            <div class="relative bg-slate-700/30 p-4 rounded min-h-[180px] border border-slate-600 overflow-hidden">
                {#key currentView}
                    <div class="absolute inset-0 p-4"
                         in:fade={{ duration: 300, delay: 50 }}
                         out:fade={{ duration: 250 }}>
                        {#if currentView === 'viewA'}
                            <ul class="space-y-1">
                                {#each viewA_items as item (item.id)}
                                    <li class="p-2 bg-slate-600/50 rounded text-slate-200 text-sm">
                                        {item.text}
                                    </li>
                                {/each}
                            </ul>
                        {:else if currentView === 'viewB'}
                            <ul class="space-y-1">
                                {#each viewB_items as item (item.id)}
                                    <li class="p-2 bg-slate-600/50 rounded text-slate-200 text-sm">
                                        {item.text}
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                {/key}
            </div>
        </div>
    </div>
    <p class="text-xs text-slate-500 mt-8 text-center">
        Orchestrating animations creates a more polished and guided user journey.
    </p>
</div>