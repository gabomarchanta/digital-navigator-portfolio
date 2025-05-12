<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let toggle1Active = true;
    let toggle2Active = false;
    let toggleDisabledActive = true;
    let toggleDisabledInactive = false;

    // Clases base y de estado para el toggle
    // Adapta estas clases a tu diseño visual. Este es un ejemplo común.
    const toggleTrackBase = "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    const toggleTrackActive = "bg-brand-purple focus:ring-brand-purple"; // Color cuando está activo
    const toggleTrackInactive = "bg-slate-600 focus:ring-slate-500";   // Color cuando está inactivo

    const toggleThumbBase = "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out";
    const toggleThumbActive = "translate-x-5";    // Mueve el pulgar a la derecha
    const toggleThumbInactive = "translate-x-0";  // Pulgar a la izquierda

    const toggleDisabled = "opacity-50 cursor-not-allowed";
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h4 class="text-xl font-semibold text-lime-400 mb-1">Toggles / Switches</h4> <!-- Otro color de acento -->
    <p class="text-sm text-slate-400 mb-8">
        For managing binary states or preferences in a user-friendly way.
    </p>

    <div class="space-y-8">
        <!-- Toggle Estándar -->
        <div in:fly={{x: -20, duration:300, delay:100}} class="flex items-center justify-between sm:justify-start sm:gap-10 p-3 bg-slate-700/50 rounded">
            <span class="text-slate-200 flex-grow sm:flex-grow-0">Enable Notifications</span>
            <button
                type="button"
                class="{toggleTrackBase} {toggle1Active ? toggleTrackActive : toggleTrackInactive}"
                role="switch"
                aria-checked={toggle1Active}
                on:click={() => toggle1Active = !toggle1Active}
            >
                <span class="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    class="{toggleThumbBase} {toggle1Active ? toggleThumbActive : toggleThumbInactive}"
                ></span>
            </button>
        </div>

        <!-- Otro Toggle con diferente estado inicial -->
         <div in:fly={{x: -20, duration:300, delay:200}} class="flex items-center justify-between sm:justify-start sm:gap-10 p-3 bg-slate-700/50 rounded">
            <span class="text-slate-200 flex-grow sm:flex-grow-0">Dark Mode Preference</span>
            <button
                type="button"
                class="{toggleTrackBase} {toggle2Active ? toggleTrackActive : toggleTrackInactive}"
                role="switch"
                aria-checked={toggle2Active}
                on:click={() => toggle2Active = !toggle2Active}
            >
                <span class="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    class="{toggleThumbBase} {toggle2Active ? toggleThumbActive : toggleThumbInactive}"
                ></span>
            </button>
        </div>

        <!-- Toggles Deshabilitados -->
        <div in:fly={{x: -20, duration:300, delay:300}}>
             <p class="text-xs text-slate-500 mb-1">Disabled States</p>
            <div class="space-y-4 p-3 bg-slate-700/50 rounded">
                <div class="flex items-center justify-between sm:justify-start sm:gap-10">
                    <span class="text-slate-400 flex-grow sm:flex-grow-0">Feature (Disabled - On)</span>
                    <button
                        type="button"
                        class="{toggleTrackBase} {toggleTrackActive} {toggleDisabled}"
                        role="switch"
                        aria-checked={toggleDisabledActive}
                        disabled
                    >
                        <span class="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            class="{toggleThumbBase} {toggleThumbActive}"
                        ></span>
                    </button>
                </div>
                <div class="flex items-center justify-between sm:justify-start sm:gap-10">
                    <span class="text-slate-400 flex-grow sm:flex-grow-0">Another Feature (Disabled - Off)</span>
                    <button
                        type="button"
                        class="{toggleTrackBase} {toggleTrackInactive} {toggleDisabled}"
                        role="switch"
                        aria-checked={toggleDisabledInactive}
                        disabled
                    >
                        <span class="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            class="{toggleThumbBase} {toggleThumbInactive}"
                        ></span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <p class="text-xs text-slate-500 mt-8 text-center">
        Toggles provide immediate visual feedback of a setting's state.
    </p>
</div>