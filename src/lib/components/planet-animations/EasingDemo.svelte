<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { quintOut, quintIn, quintInOut, elasticOut, linear, bounceOut, sineInOut, expoOut } from 'svelte/easing'; // Añadí más easings
    import { fly } from 'svelte/transition';

    const easings = [
        { name: 'Linear', fn: linear, description: 'Constant speed, no acceleration or deceleration.' },
        { name: 'Quint Out (Default)', fn: quintOut, description: 'Starts fast, decelerates towards the end. Smooth.' },
        { name: 'Quint In', fn: quintIn, description: 'Starts slow, accelerates towards the end.' },
        { name: 'Quint In/Out', fn: quintInOut, description: 'Slow start, accelerates, then decelerates. Very natural.' },
        { name: 'Elastic Out', fn: elasticOut, description: 'Overshoots and bounces back like an elastic band.' },
        { name: 'Bounce Out', fn: bounceOut, description: 'Bounces at the end before settling.' },
        { name: 'Sine In/Out', fn: sineInOut, description: 'Gentle acceleration and deceleration, based on a sine wave.'},
        { name: 'Expo Out', fn: expoOut, description: 'Extremely fast start, then rapidly decelerates. Very dramatic.'}
    ];

    let selectedEasing = easings[1];

    const ballPositionX = tweened(0, {
        duration: 1200, // Un poco más de duración para apreciar mejor los easings más complejos
        easing: selectedEasing.fn
    });

    async function animateBall(easingDefinition: typeof easings[0]) {
        selectedEasing = easingDefinition;
        await ballPositionX.set(0, { duration: 0 });
        await ballPositionX.set(1, { duration: 1200, easing: selectedEasing.fn });
    }

    // Para el gráfico de la curva de Bézier
    function getPathData(easingFn: (t: number) => number): string {
        let d = "M 0 100";
        const steps = 100; // Número de puntos para dibujar la curva
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const easedT = easingFn(t);
            const x = i * (100 / steps); // Escala x para que vaya de 0 a 100
            const y = 100 - (easedT * 100); // Escala y e invierte para coordenadas SVG
            d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
        }
        return d;
    }

    // Haremos la bola de un tamaño fijo para esta demo para simplificar el cálculo de 'left'
    const ballDiameterRem = 1.5; // Corresponde a w-6/h-6 (1.5rem)
    const trackPaddingRem = 0.5; // Corresponde a p-2 (0.5rem) en el contenedor de la bola
    // Variable reactiva para el estilo 'left'
    // Esto es más limpio y fácil de depurar
    $: ballLeftStyle = `calc(${trackPaddingRem}rem + ${$ballPositionX * 100}% - ${$ballPositionX * (2 * trackPaddingRem + ballDiameterRem)}rem)`;
</script>

<div class="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-xl">
    <div class="mb-6 flex flex-wrap justify-center gap-2">
        {#each easings as easing, i}
            <button
                on:click={() => animateBall(easing)}
                class="py-1.5 px-3 rounded-md text-xs transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800"
                class:bg-brand-pink={selectedEasing.name === easing.name}
                class:text-white={selectedEasing.name === easing.name}
                class:bg-slate-700={selectedEasing.name !== easing.name}
                class:text-slate-300={selectedEasing.name !== easing.name}
                class:hover:bg-slate-600={selectedEasing.name !== easing.name}
                in:fly={{y:-10, delay: i*50, duration:200}}
                title={easing.description}
            >
                {easing.name}
            </button>
        {/each}
    </div>

    <!-- Área de Animación de la Bola -->
    <div class="relative w-full h-12 sm:h-16 bg-slate-700/50 rounded p-2 mb-6 overflow-hidden">
        <div
            class="absolute bg-brand-cyan rounded-full top-1/2 -translate-y-1/2 shadow-lg"
            style="width: {ballDiameterRem}rem; height: {ballDiameterRem}rem;
                   left: {ballLeftStyle};
                   transform: translateY(0%) rotate({$ballPositionX * 360}deg);"
            aria-hidden="true"
        ></div>
        <!-- Marcas de inicio y fin (opcional) -->
        <div class="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-px bg-slate-500"></div>
        <div class="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-px bg-slate-500"></div>
    </div>

    <!-- Visualización de la Curva de Easing -->
    <div class="w-full bg-slate-700/50 rounded p-3 sm:p-4" in:fly={{y:10, delay:300, duration:300}}>
        <svg viewBox="-10 -10 120 120" class="w-full" style="aspect-ratio: 2 / 1;" preserveAspectRatio="xMidYMid meet">
           
            <line x1="0" y1="0" x2="0" y2="100" stroke="var(--color-slate-600, #475569)" stroke-width="0.25" />
            <line x1="0" y1="100" x2="100" y2="100" stroke="var(--color-slate-600, #475569)" stroke-width="0.25" />
            <line x1="100" y1="0" x2="100" y2="100" stroke="var(--color-slate-600, #475569)" stroke-width="0.25" />
            <line x1="0" y1="0" x2="100" y2="0" stroke="var(--color-slate-600, #475569)" stroke-width="0.25" />

            <!-- Guías de Grid (más sutiles) -->
            {#each [25, 50, 75] as val}
                <line x1="0" y1={val} x2="100" y2={val} stroke="var(--color-slate-700, #334155)" stroke-width="0.1" />
                <line x1={val} y1="0" x2={val} y2="100" stroke="var(--color-slate-700, #334155)" stroke-width="0.1" />
            {/each}

            <!-- Curva de Easing -->
            <path d={getPathData(selectedEasing.fn)} stroke="var(--color-brand-cyan, #22d3ee)" stroke-width="1.5" fill="none" />

            <!-- Etiquetas de Ejes -->
            <text x="50" y="-6" font-size="5" fill="var(--color-slate-400, #94a3b8)" text-anchor="middle">Animation Progress (Output)</text>
            <text x="-8" y="50" font-size="5" fill="var(--color-slate-400, #94a3b8)" transform="translate(-55, 50) rotate(-90 0,0)" text-anchor="middle">Time (Input)</text>

             <!-- Marcas de 0 y 1 en los ejes -->
            <text x="-2" y="103" font-size="4" fill="var(--color-slate-500, #64748b)" text-anchor="end">0</text>
            <text x="-2" y="3" font-size="4" fill="var(--color-slate-500, #64748b)" text-anchor="end">1</text>

            <text x="0" y="108" font-size="4" fill="var(--color-slate-500, #64748b)" text-anchor="middle">0</text>
            <text x="100" y="108" font-size="4" fill="var(--color-slate-500, #64748b)" text-anchor="middle">1</text>
        </svg>
    </div>
    <p class="text-sm text-slate-400 mt-4 text-center px-2">
        {selectedEasing.description || "Click an easing function to see its effect."}
    </p>
</div>