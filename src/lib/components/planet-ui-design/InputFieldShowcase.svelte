<script lang="ts">
    import { fly } from 'svelte/transition';

    // Estados para los inputs de demostración
    let defaultInputValue = "Some default text";
    let emailValue = "";
    let passwordValue = "apassword";
    let errorInputValue = "Invalid entry";
    let successInputValue = "Looks good!";

    // Clases base para los inputs (similar a como hicimos con los botones)
    // Adapta estas clases a tu diseño visual deseado
    const inputBaseClasses = "w-full px-3 py-2 rounded-md bg-slate-700 border text-slate-100 placeholder-slate-400 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2";
    const inputDefaultBorder = "border-slate-600 focus:border-brand-cyan focus:ring-brand-cyan/50";
    const inputErrorBorder = "border-red-500 focus:border-red-500 focus:ring-red-500/50";
    const inputSuccessBorder = "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/50";
    const inputDisabledClasses = "opacity-50 cursor-not-allowed bg-slate-600";

</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h4 class="text-xl font-semibold text-amber-400 mb-1">Input Fields</h4> <!-- Color de acento diferente -->
    <p class="text-sm text-slate-400 mb-8">
        Essential for data entry, showcasing various states like focus, validation, and disabled.
    </p>

    <div class="space-y-8">
        <!-- Input Default -->
        <div in:fly={{x: -20, duration:300, delay:100}}>
            <label for="input-default" class="block text-xs text-slate-400 mb-1">Default Input</label>
            <input type="text" id="input-default" bind:value={defaultInputValue}
                   class="{inputBaseClasses} {inputDefaultBorder}"
                   placeholder="Enter text here..." />
        </div>

        <!-- Input con Icono y Estado de Error -->
        <div in:fly={{x: -20, duration:300, delay:200}}>
            <label for="input-error" class="block text-xs text-slate-400 mb-1">Input with Error</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.404 14.596A6.75 6.75 0 1114.596 5.404a6.75 6.75 0 01-9.192 9.192zM14.044 6a.75.75 0 00-1.06-.054L10 8.888 7.016 5.946a.75.75 0 10-1.072 1.048l2.978 2.93-2.93 2.978a.75.75 0 101.048 1.072L10 11.112l2.93 2.978a.75.75 0 101.072-1.048L11.112 10l2.978-2.93a.75.75 0 00-.046-1.072z" clip-rule="evenodd" /></svg>
                </div>
                <input type="email" id="input-error" bind:value={errorInputValue}
                       class="{inputBaseClasses} {inputErrorBorder} pl-10"
                       placeholder="your.email@example.com" />
            </div>
            <p class="text-xs text-red-400 mt-1">This email address seems invalid.</p>
        </div>

        <!-- Input con Estado de Éxito -->
        <div in:fly={{x: -20, duration:300, delay:300}}>
            <label for="input-success" class="block text-xs text-slate-400 mb-1">Input with Success</label>
            <div class="relative">
                 <input type="text" id="input-success" bind:value={successInputValue}
                       class="{inputBaseClasses} {inputSuccessBorder} pr-10" />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4.006-5.5z" clip-rule="evenodd" /></svg>
                </div>
            </div>
        </div>

        <!-- Input Deshabilitado -->
        <div in:fly={{x: -20, duration:300, delay:400}}>
            <label for="input-disabled" class="block text-xs text-slate-400 mb-1">Disabled Input</label>
            <input type="text" id="input-disabled" value="Cannot edit this"
                   class="{inputBaseClasses} {inputDefaultBorder} {inputDisabledClasses}"
                   disabled />
        </div>
    </div>

    <p class="text-xs text-slate-500 mt-8 text-center">
        Input fields provide clear visual feedback for different states, guiding the user effectively.
    </p>
</div>

<!-- No se necesitan estilos aquí si todo es con Tailwind y clases bien definidas -->
<style>
    /* Si necesitas algún estilo muy específico que no cubra Tailwind */
</style>