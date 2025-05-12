<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { spring } from 'svelte/motion';

    let showTitle = false;
    let showSubtitle = false;
    let showButton = false;

    // Coordenadas de la nave con efecto "spring" para suavidad
    const shipCoords = spring({ x: 0, y: 0 }, {
        stiffness: 0.05,
        damping: 0.25
    });

    function handleMousemove(event: MouseEvent) {
        const { clientX, clientY } = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const targetX = (clientX - centerX) / 50; // Renombrado para claridad
        const targetY = (clientY - centerY) / 50; // Renombrado para claridad
        shipCoords.set({ x: targetX, y: targetY });
    }

    onMount(() => {
        setTimeout(() => showTitle = true, 300);
        setTimeout(() => showSubtitle = true, 600);
        setTimeout(() => showButton = true, 900);
    });

    function launchMission() {
        console.log("Mission Launched! Navigating to star map...");
        goto('/star-map');
    }
</script>

<svelte:window on:mousemove={handleMousemove} />

<!--
  Clases de fondo actualizadas para usar los colores de 'space' si quieres ser consistente.
  Por ejemplo, si 'from-slate-900' es tu 'space-darkest' y 'via-purple-950' es tu 'space-deep-purple'.
  Si los nombres por defecto de Tailwind te sirven, está bien dejarlos.
-->
<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-space-darkest via-space-deep-purple to-space-darkest text-space-lighter-text text-center p-4 sm:p-8 overflow-hidden">

    <!-- Fondo cósmico -->
    <div class="absolute inset-0 z-0 opacity-30">
        <img src="/images/cosmic-background.png" alt="Cosmic background" class="w-full h-full object-cover" />
    </div>

    <header class="relative z-10 mb-12">
        {#if showTitle}
            <h1
                class="text-5xl sm:text-6xl md:text-7xl font-black text-brand-cyan mb-6 tracking-tight"
                in:fly={{ y: 50, duration: 600, delay: 200 }}
            >
                Welcome, Explorer.
            </h1>
        {/if}
        {#if showSubtitle}
            <p
                class="text-lg sm:text-xl md:text-2xl text-space-light-text max-w-xl mx-auto mb-10 leading-relaxed"
                in:fly={{ y: 30, duration: 600, delay: 400 }}
            >
                I am <span class="font-semibold text-brand-purple">The Digital Navigator</span>.
                Ready to explore the cosmos of Design & Code?
            </p>
        {/if}
        {#if showButton}
            <button
                class="bg-brand-pink hover:bg-pink-600 <!-- Asumiendo que pink-600 es un buen hover para brand-pink -->
                       text-space-darkest <!-- O el color de texto que prefieras para el botón -->
                       font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full
                       text-lg sm:text-xl shadow-lg hover:shadow-pink-500/50
                       active:scale-95 active:brightness-90
                       transform transition-all duration-200 ease-out hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-brand-pink/75 <!-- Usando brand-pink para el ring -->
                       focus:ring-opacity-75"
                on:click={launchMission}
                in:fly={{ y: 20, duration: 500, delay: 600 }}
            >
                Begin Exploration
            </button>
        {/if}
    </header>

    <!-- Nave espacial -->
    <div
        class="relative z-10 mt-8 sm:mt-16 w-32 h-32 sm:w-40 sm:h-40"
        style="transform: translate({$shipCoords.x}px, {$shipCoords.y}px);"
    >
        <img src="/images/navigator-ship.svg" alt="Navigator Ship Icon" class="w-full h-full animate-float-ship" />
    </div>

</div>

<style>
    h1 {
        text-shadow: 0 0 8px rgba(34, 211, 238, 0.5); /* Usando el valor HEX de brand-cyan para el RGBA */
    }
</style>