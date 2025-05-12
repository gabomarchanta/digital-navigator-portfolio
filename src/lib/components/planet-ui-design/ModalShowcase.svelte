<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let showSimpleModal = false;
    let showConfirmationModal = false;

    // Clases base para los botones de este showcase (puedes reutilizar las de ButtonShowcase si las exportas o defines globalmente)
    const btnBase = "py-2 px-4 rounded-md font-semibold transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50";
    const btnPrimary = "bg-brand-cyan text-space-darkest hover:bg-cyan-500 active:bg-cyan-600 focus:ring-brand-cyan";
    const btnSecondary = "bg-transparent border border-slate-500 text-slate-300 hover:bg-slate-700 hover:text-slate-100 focus:ring-slate-500";
    const btnDanger = "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500";

    function openSimpleModal() {
        showSimpleModal = true;
    }
    function closeSimpleModal() {
        showSimpleModal = false;
    }

    function openConfirmationModal() {
        showConfirmationModal = true;
    }
    function closeConfirmationModal() {
        showConfirmationModal = false;
    }
    function handleConfirm() {
        console.log("Action Confirmed!");
        closeConfirmationModal();
    }

    // Manejar cierre con tecla Escape
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (showSimpleModal) closeSimpleModal();
            if (showConfirmationModal) closeConfirmationModal();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h4 class="text-xl font-semibold text-sky-400 mb-1">Modals / Dialogs</h4> <!-- Otro color de acento -->
    <p class="text-sm text-slate-400 mb-6">
        Overlay windows for critical information, confirmations, or focused tasks.
    </p>

    <div class="flex flex-wrap gap-4 justify-center sm:justify-start">
        <button class="{btnBase} {btnPrimary}" on:click={openSimpleModal}>Open Simple Modal</button>
        <button class="{btnBase} {btnDanger}" on:click={openConfirmationModal}>Open Confirmation Modal</button>
    </div>

    <!-- Modal Simple -->
    {#if showSimpleModal}
        <div transition:fade={{ duration: 200, easing: quintOut }}
             class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
             on:click|self={closeSimpleModal}
             role="button"
             tabindex="0"  
             on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeSimpleModal(); }}
             aria-label="Close modal by clicking backdrop"
        >
            <div transition:fly={{ y: 20, duration: 300, delay:50, easing: quintOut }}
                 class="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700"
                 role="dialog" aria-modal="true" aria-labelledby="simple-modal-title"
            >
                <div class="flex justify-between items-center mb-4">
                    <h5 id="simple-modal-title" class="text-2xl font-bold text-brand-cyan">Simple Information</h5>
                    <button on:click={closeSimpleModal} class="text-slate-400 hover:text-slate-200 transition-colors" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                    </button>
                </div>
                <p class="text-slate-300 mb-6">
                    This is a basic modal window. It can be used to display important messages or short pieces of content without navigating away from the main view.
                </p>
                <div class="text-right">
                    <button class="{btnBase} {btnSecondary}" on:click={closeSimpleModal}>Got it!</button>
                </div>
            </div>
        </div>
    {/if}

    <!-- Modal de Confirmación -->
    {#if showConfirmationModal}
        <div transition:fade={{ duration: 200, easing: quintOut }}
             class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
             on:click|self={closeConfirmationModal}
             role="button"
             tabindex="0"
             on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeConfirmationModal(); }}
             aria-label="Close modal by clicking backdrop"
        >
            <div transition:fly={{ y: 20, duration: 300, delay:50, easing: quintOut }}
                 class="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700"
                 role="dialog" aria-modal="true" aria-labelledby="confirmation-modal-title"
            >
                <div class="flex items-start mb-4">
                    <div class="mr-4 flex-shrink-0">
                         <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                            <svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h5 id="confirmation-modal-title" class="text-xl font-semibold text-slate-100">Delete Resource</h5>
                        <p class="text-sm text-slate-300 mt-1">
                            Are you sure you want to delete this important resource? This action cannot be undone. All associated data will be permanently removed.
                        </p>
                    </div>
                </div>

                <div class="mt-6 sm:mt-5 sm:flex sm:flex-row-reverse gap-3">
                    <button type="button" class="{btnBase} {btnDanger} w-full sm:w-auto" on:click={handleConfirm}>
                        Yes, Delete
                    </button>
                    <button type="button" class="{btnBase} {btnSecondary} w-full sm:w-auto mt-3 sm:mt-0" on:click={closeConfirmationModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    {/if}
    <p class="text-xs text-slate-500 mt-6 text-center">
        Modals should be used sparingly for tasks that require user focus or confirmation.
    </p>
</div>