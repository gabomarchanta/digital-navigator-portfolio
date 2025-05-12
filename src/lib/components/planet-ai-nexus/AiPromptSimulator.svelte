<!-- src/lib/components/planet-ai-nexus/AiPromptSimulator.svelte -->
<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let currentSelectedPrompt = ''; // El prompt que se muestra en el input
    let isLoading = false;
    let generatedImageUrl: string | null = null;
    let imageKey = 0; // Para forzar la re-animación de la imagen

    // Prompts predefinidos y sus imágenes asociadas
    interface PromptExample {
        id: string;
        displayText: string; // Lo que se muestra en el botón
        promptForDisplay: string; // Lo que se muestra en el input y se usa para buscar imagen
        imageResult: string;
    }

    const promptExamples: PromptExample[] = [
        { id: 'dash', displayText: 'Futuristic Dashboard', promptForDisplay: 'Futuristic sci-fi dashboard UI', imageResult: '/images/ai-sim-results/concept-futuristic-dashboard.png' },
        { id: 'eco', displayText: 'Eco App Login', promptForDisplay: 'Eco-friendly mobile app login screen', imageResult: '/images/ai-sim-results/concept-eco-app.png' },
        { id: 'abstract', displayText: 'Abstract Concept', promptForDisplay: 'Abstract generative art, cosmic theme', imageResult: '/images/ai-sim-results/generic-ai-concept.png' }
    ];

    function selectPrompt(promptData: PromptExample) {
        currentSelectedPrompt = promptData.promptForDisplay;
        generatedImageUrl = null; // Limpia la imagen anterior al seleccionar un nuevo prompt
    }

    async function handleGenerate() {
        if (!currentSelectedPrompt.trim()) return;

        isLoading = true;
        generatedImageUrl = null; // Asegurarse de limpiar
        imageKey++; // Cambia la key para forzar la re-ejecución de la transición de la imagen

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Encuentra la imagen basada en el currentSelectedPrompt
        const selectedExample = promptExamples.find(p => p.promptForDisplay === currentSelectedPrompt);
        generatedImageUrl = selectedExample ? selectedExample.imageResult : '/images/ai-sim-results/generic-ai-concept.png'; // Fallback
        isLoading = false;
    }

    // Clases para botón
    const btnBase = "py-2 px-3 rounded-md font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm disabled:opacity-60";
    const btnAccent = "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400";
    const btnPromptSelector = "bg-slate-600 hover:bg-slate-500 text-slate-200 focus:ring-slate-400";
</script>

<div class="bg-slate-800/40 p-6 rounded-lg border border-slate-700">
    <h4 class="text-md font-semibold text-slate-100 mb-3 text-center">Conceptual AI Design Prompt</h4>
    <p class="text-xs text-slate-400 mb-4 text-center">
        Select an example prompt, then click "Generate" to see a *simulated* AI-generated image.
    </p>

    <!-- Botones de Prompts Predefinidos -->
    <div class="flex flex-wrap justify-center gap-2 mb-4">
        {#each promptExamples as example (example.id)}
            <button
                class="{btnBase} {currentSelectedPrompt === example.promptForDisplay ? btnAccent : btnPromptSelector} text-xs sm:text-sm"
                on:click={() => selectPrompt(example)}
                aria-pressed={currentSelectedPrompt === example.promptForDisplay}
            >
                {example.displayText}
            </button>
        {/each}
    </div>

    <div class="flex flex-col sm:flex-row gap-2 mb-6">
        <input
            type="text"
            readonly
            bind:value={currentSelectedPrompt}
            placeholder="Select a prompt above..."
            class="flex-grow bg-slate-700/70 <!-- Un poco más de opacidad o un color ligeramente diferente -->
           border border-slate-600 text-slate-300 <!-- Texto un poco menos prominente -->
           italic <!-- Opcional: para indicar que es un valor mostrado -->
           text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-0 <!-- Quitar el ring de foco si es readonly -->
           cursor-default" 
        />
        <button
            class="{btnBase} {btnAccent} {isLoading ? 'cursor-wait' : ''}"
            on:click={handleGenerate}
            disabled={isLoading || !currentSelectedPrompt.trim()}
        >
            {#if isLoading}
                <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" role="status"></span>
                Generating...
            {:else}
                Generate Concept
            {/if}
        </button>
    </div>

    <div class="bg-slate-900/50 min-h-[200px] sm:min-h-[250px] rounded-md flex items-center justify-center p-4 border border-slate-700/50">
        {#if isLoading}
            <div class="text-center text-slate-400" in:fade>
                <svg class="animate-spin h-8 w-8 text-sky-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                Simulating AI generation...
            </div>
        {:else if generatedImageUrl}
            {#key imageKey} <!-- Usamos imageKey para forzar la re-animación -->
                <img
                    src={generatedImageUrl}
                    alt="Simulated AI generated concept for: {currentSelectedPrompt}"
                    class="max-w-full max-h-[220px] sm:max-h-[300px] rounded-md shadow-lg object-contain"
                    in:scale={{ duration: 400, delay:100, start: 0.8, easing: quintOut }}
                />
            {/key}
        {:else}
            <p class="text-slate-500 text-sm">Select a prompt and click "Generate Concept".</p>
        {/if}
    </div>
</div>