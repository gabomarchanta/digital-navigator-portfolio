<!-- src/lib/components/ImageModal.svelte -->
<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { createEventDispatcher, onMount } from 'svelte'; // Importa onMount
    import { trapFocus } from '$lib/actions/trapFocus'; // Suponiendo que crearemos esta acción

    export let imageUrl: string | null = null;
    export let altText: string = "Enlarged image";

    const dispatch = createEventDispatcher();
    let modalContentElement: HTMLElement; // Referencia al contenido del modal para el foco

    function closeModal() {
        dispatch('close');
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Para el overlay clickeable
    function handleOverlayKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            closeModal();
        }
    }

    // onMount(() => {
    //     // Idealmente, cuando el modal se abre, el foco debería ir al primer elemento enfocable dentro.
    //     // El botón de cierre es un buen candidato.
    //     // Sin embargo, hacer esto bien requiere que el botón de cierre esté visible en el DOM
    //     // cuando onMount se ejecuta, lo cual es después de la transición.
    //     // Por ahora, nos enfocaremos en resolver las advertencias.
    //     // Una solución más robusta usaría una acción para atrapar el foco.
    //     if (modalContentElement) {
    //         const focusableButton = modalContentElement.querySelector('button[aria-label="Close image viewer"]') as HTMLElement;
    //         if (focusableButton) focusableButton.focus();
    //     }
    // });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if imageUrl}
    <!-- Overlay -->
    <div
        class="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8"
        on:click|self={closeModal}
        transition:fade={{ duration: 200, easing: quintOut }}
        role="button"
        tabindex="0"
        on:keydown={handleOverlayKeydown}
        aria-label="Close image viewer by clicking backdrop"
    >
        <!-- Contenido del Modal -->
        <div
            bind:this={modalContentElement}
            class="relative bg-slate-800 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] flex flex-col border border-slate-700"
            transition:fly={{ y: 20, duration: 300, delay: 50, easing: quintOut }}
            role="dialog"      
            aria-modal="true"  
            aria-labelledby="image-modal-title"
            aria-describedby="image-modal-description" 
            tabindex="-1"      
            use:trapFocus      
        >
            <div class="flex justify-between items-center p-4 border-b border-slate-700">
                <h5 id="image-modal-title" class="text-lg font-semibold text-slate-200 truncate pr-4">{altText}</h5>
                <button
                    on:click={closeModal}
                    class="text-slate-400 hover:text-slate-100 transition-colors p-1 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    aria-label="Close image viewer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                </button>
            </div>

            <div id="image-modal-description" class="p-4 flex-grow overflow-auto flex items-center justify-center">
                <img
                    src={imageUrl}
                    alt={altText}
                    class="max-w-full max-h-full object-contain rounded-sm"
                />
            </div>
        </div>
    </div>
{/if}