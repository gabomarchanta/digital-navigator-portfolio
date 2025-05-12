<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { flip } from 'svelte/animate'; // Para animar el reordenamiento de la lista

    interface ToastMessage {
        id: number;
        type: 'success' | 'error' | 'info' | 'warning';
        message: string;
        icon: string; // SVG path o unicode
    }

    let toasts: ToastMessage[] = [];
    let nextToastId = 0;

    const toastIcons = {
        success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4.006-5.5z" clip-rule="evenodd" /></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" /></svg>',
        warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>'
    };

    const toastBaseClasses = "flex items-start p-4 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md border";
    const toastColors = {
        success: "bg-emerald-500 border-emerald-600 text-white",
        error: "bg-red-500 border-red-600 text-white",
        info: "bg-sky-500 border-sky-600 text-white",
        warning: "bg-amber-400 border-amber-500 text-slate-800",
    };


    function addToast(type: ToastMessage['type'], message: string) {
        const newToast: ToastMessage = {
            id: nextToastId++,
            type,
            message,
            icon: toastIcons[type]
        };
        toasts = [...toasts, newToast];

        // Auto-remove toast after a delay
        setTimeout(() => {
            removeToast(newToast.id);
        }, 5000); // Toast visible for 5 seconds
    }

    function removeToast(id: number) {
        toasts = toasts.filter(t => t.id !== id);
    }

    // Clases para los botones de disparo
    const btnBase = "py-2 px-4 rounded-md font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h5 class="text-lg font-medium text-slate-200 mb-1">Animated Toast Notifications</h5>
    <p class="text-sm text-slate-400 mb-6">
        Subtle, non-intrusive feedback messages that appear and disappear smoothly.
    </p>

    <div class="flex flex-wrap gap-3 justify-center sm:justify-start mb-8">
        <button
            class="{btnBase} bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400"
            on:click={() => addToast('success', 'Operation completed successfully!')}
        >Trigger Success</button>
        <button
            class="{btnBase} bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
            on:click={() => addToast('error', 'An error occurred. Please try again.')}
        >Trigger Error</button>
        <button
            class="{btnBase} bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400"
            on:click={() => addToast('info', 'System update scheduled for midnight.')}
        >Trigger Info</button>
        <button
            class="{btnBase} bg-amber-400 hover:bg-amber-500 text-slate-800 focus:ring-amber-300"
            on:click={() => addToast('warning', 'Low disk space. Please free up some storage.')}
        >Trigger Warning</button>
    </div>

    <!-- Contenedor de Toasts: Posicionado en una esquina -->
    <div class="fixed bottom-5 right-5 z-[100] w-full max-w-sm sm:max-w-md space-y-3">
        {#each toasts as toast (toast.id)}
            <div
                class="{toastBaseClasses} {toastColors[toast.type]}"
                in:fly={{ x: 300, duration: 400, easing: quintOut }}
                out:fly={{ x: 300, duration: 300, easing: quintOut }}
                animate:flip={{ duration: 300, easing: quintOut }}
                role="alert"
            >
                <div class="flex-shrink-0 w-5 h-5 mr-3">
                    {@html toast.icon}
                </div>
                <div class="flex-grow text-sm">
                    {toast.message}
                </div>
                <button
                    on:click={() => removeToast(toast.id)}
                    class="ml-3 -mr-1 -my-1 p-1 rounded-md opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-white/50"
                    aria-label="Close notification"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                </button>
            </div>
        {/each}
    </div>
    <p class="text-xs text-slate-500 mt-6 text-center">
        Toasts provide timely updates without disrupting the user's current task.
    </p>
</div>