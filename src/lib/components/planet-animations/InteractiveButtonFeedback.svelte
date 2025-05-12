<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { ripple } from '$lib/actions/ripple';

    // --- ESTADOS PARA EL BOTÓN "SIMULATE SUCCESS" ---
    let successBtnStatus: 'idle' | 'loading' | 'success' = 'idle';

    async function handleSimulateSuccess() {
        successBtnStatus = 'loading';
        await new Promise(resolve => setTimeout(resolve, 1500));
        successBtnStatus = 'success';
        setTimeout(() => { successBtnStatus = 'idle'; }, 2000);
    }

    // --- ESTADOS PARA EL BOTÓN "SIMULATE ERROR" ---
    let errorBtnStatus: 'idle' | 'loading' | 'error' = 'idle';

    async function handleSimulateError() {
        errorBtnStatus = 'loading';
        await new Promise(resolve => setTimeout(resolve, 1500));
        errorBtnStatus = 'error';
        setTimeout(() => { errorBtnStatus = 'idle'; }, 2000);
    }

    // --- ESTADOS PARA EL BOTÓN "LOADING STATE & TEXT TRANSITION" ---
    let loadingTextStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
    let loadingTextButtonContent = 'Perform Action';

    async function handleLoadingTextSubmit() {
        loadingTextStatus = 'loading';
        loadingTextButtonContent = 'Processing...';
        await new Promise(resolve => setTimeout(resolve, 2000));
        const outcome = Math.random() > 0.5 ? 'success' : 'error';
        if (outcome === 'success') {
            loadingTextStatus = 'success';
            loadingTextButtonContent = 'Success!';
        } else {
            loadingTextStatus = 'error';
            loadingTextButtonContent = 'Failed!';
        }
        setTimeout(() => {
            loadingTextStatus = 'idle';
            loadingTextButtonContent = 'Perform Action';
        }, 2500);
    }

    const btnBase = "relative overflow-hidden py-2 px-4 rounded-md font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px] sm:min-w-[170px]";
    const btnInteractiveBase = "bg-brand-pink text-white hover:bg-pink-700 active:bg-pink-800 focus:ring-brand-pink"; // Color para Motion Core
    const btnSuccess = "bg-emerald-500 text-white focus:ring-emerald-500";
    const btnError = "bg-red-500 text-white focus:ring-red-500";
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Button Feedback States</h5>
    <p class="text-sm text-slate-400 mb-6">
        Illustrating clear visual feedback for asynchronous actions and their outcomes, including ripple effects.
    </p>
    <div class="space-y-6">
        <!-- Success/Error State Feedback con estados INDIVIDUALES -->
        <div in:fly={{x: -20, duration:300, delay:100}}>
            <p class="text-xs text-slate-500 mb-1 text-center sm:text-left">Individual Success/Error State Change</p>
            <div class="flex flex-wrap items-center justify-center gap-3 p-3 bg-slate-700/50 rounded">
                <button
                    use:ripple
                    class="{btnBase} {successBtnStatus === 'success' ? btnSuccess : btnInteractiveBase}"
                    on:click={handleSimulateSuccess}
                    disabled={successBtnStatus !== 'idle'}
                >
                    {#if successBtnStatus === 'idle'} <span in:fade={{duration:150}}>Simulate Success</span>
                    {:else if successBtnStatus === 'loading'} <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" role="status" aria-label="loading"></span>
                    {:else if successBtnStatus === 'success'} <div class="flex items-center" in:scale={{duration:300, start:0.8, easing:quintOut}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-1"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4.006-5.5z" clip-rule="evenodd" /></svg> Success!</div>{/if}
                </button>
                <button
                    use:ripple
                    class="{btnBase} {errorBtnStatus === 'error' ? btnError : btnInteractiveBase}"
                    on:click={handleSimulateError}
                    disabled={errorBtnStatus !== 'idle'}
                >
                     {#if errorBtnStatus === 'idle'} <span in:fade={{duration:150}}>Simulate Error</span>
                     {:else if errorBtnStatus === 'loading'} <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" role="status" aria-label="loading"></span>
                     {:else if errorBtnStatus === 'error'} <div class="flex items-center" in:scale={{duration:300, start:0.8, easing:quintOut}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-1"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg> Error!</div>{/if}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    /* No se necesita CSS para ripple aquí si está en app.css */
</style>