<script lang="ts">
    import { fly, fade } from 'svelte/transition'; // Añadiremos más si es necesario
    import { quintOut, sineInOut } from 'svelte/easing'; // Easing para las animaciones
    import EasingDemo from '$lib/components/planet-animations/EasingDemo.svelte';
    import InteractiveButtonFeedback from '$lib/components/planet-animations/InteractiveButtonFeedback.svelte';
    import AccordionShowcase from '$lib/components/planet-animations/AccordionShowcase.svelte';
    import ToastNotificationShowcase from '$lib/components/planet-animations/ToastNotificationShowcase.svelte';
    import SkeletonLoaderShowcase from '$lib/components/planet-animations/SkeletonLoaderShowcase.svelte';
    import OrchestrationShowcase from '$lib/components/planet-animations/OrchestrationShowcase.svelte';

    // Placeholder para el componente de demo de easing
    // import EasingDemo from '$lib/components/planet-animations/EasingDemo.svelte';
</script>

<div class="min-h-screen bg-space-darkest text-space-lighter-text flex flex-col items-center p-4 sm:p-8 pt-16 sm:pt-24">
    <main class="w-full max-w-4xl mx-auto">

        <!-- 1. Encabezado del Planeta -->
        <header
            class="text-center mb-16 sm:mb-24"
            in:fly={{ y: -50, duration: 700, easing: quintOut }}
        >
            <!-- Icono del Planeta con animación sutil -->
            <div class="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 group">
                <img
                    src="/images/planets/planet-animations.svg"
                    alt="Motion Core Planet Icon"
                    class="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                    in:fade={{ duration: 600, delay: 100, easing: quintOut }}
                />
                <!-- Anillos orbitales animados (ejemplo) -->
                <div class="absolute inset-0 animate-orbit-slow">
                    <div class="absolute top-1/2 left-0 w-full h-px bg-brand-pink/30 transform -translate-y-1/2 scale-x-150 rounded-full"></div>
                    <div class="absolute top-0 left-1/2 w-px h-full bg-brand-pink/30 transform -translate-x-1/2 scale-y-150 rounded-full"></div>
                </div>
                 <div class="absolute inset-2 animate-orbit-fast opacity-75">
                    <div class="absolute top-1/2 left-0 w-full h-px bg-sky-400/30 transform -translate-y-1/2 scale-x-125 rounded-full"></div>
                    <div class="absolute top-0 left-1/2 w-px h-full bg-sky-400/30 transform -translate-x-1/2 scale-y-125 rounded-full"></div>
                </div>
            </div>

            <h1 class="text-4xl sm:text-5xl font-black text-brand-pink mb-4">
                Motion Core
            </h1>
            <p class="text-xl sm:text-2xl text-space-light-text max-w-2xl mx-auto">
                Weaving Life into Interfaces with Animation & Interaction. Discover how motion guides, provides feedback, and creates delightful user experiences.
            </p>
        </header>

        <!-- Sección 2: The Why & How: Principles of UI Animation -->
        <section
            id="principles"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 300, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-brand-pink/30 pb-3">
                I. The Why & How: <span class="text-brand-pink">Principles of UI Animation</span>
            </h2>

            <div class="space-y-6 text-space-light-text leading-relaxed">
                <p>Animation in UI is not just decoration; it's a functional tool. Well-crafted motion can significantly enhance usability by:</p>
                <ul class="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Providing Feedback:</strong> Instantly confirming user actions, like a button press or data submission.</li>
                    <li><strong>Guiding Attention:</strong> Smoothly directing focus to new elements or important information.</li>
                    <li><strong>Signifying State Changes:</strong> Clearly illustrating transitions, such as loading content or toggling a setting.</li>
                    <li><strong>Enhancing Spatial Awareness:</strong> Helping users understand an interface's structure, like how a modal appears over content.</li>
                    <li><strong>Injecting Delight:</strong> Adding subtle, pleasing moments that make an interface feel more responsive and alive.</li>
                </ul>
                <p>Effective UI animations are typically quick, purposeful, and strive for optimal performance by leveraging CSS properties like <code class="bg-slate-700 px-1 py-0.5 rounded text-sm font-mono text-amber-400">transform</code> and <code class="bg-slate-700 px-1 py-0.5 rounded text-sm font-mono text-amber-400">opacity</code>.</p>
            </div>

            <!-- Sub-sección: Easing & Duration -->
            <div class="mt-12">
                <h3 class="text-2xl font-semibold text-slate-200 mb-4">Easing & Duration: The Soul of Motion</h3>
                <p class="text-space-lightText mb-6">
                    The <code class="bg-slate-700 px-1 py-0.5 rounded text-sm font-mono text-amber-400">easing function</code> (acceleration curve) and <code class="bg-slate-700 px-1 py-0.5 rounded text-sm font-mono text-amber-400">duration</code> dictate an animation's character. Different easings create varied perceptions—smooth, bouncy, abrupt, or natural.
                </p>
                <!-- DEMO DE EASING INTERACTIVA IRÁ AQUÍ -->
                <EasingDemo />
            </div>
        </section>

        <!-- Placeholder para otras secciones -->
        <section id="microinteraction-showcase" class="mb-16 sm:mb-24">
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-sky-400/30 pb-3">
                II. Microinteraction <span class="text-sky-400">Showcase</span>
            </h2>
              <!-- Demo de Feedback de Botones -->
            <div class="mb-12"> <!-- Contenedor para esta demo específica -->
                <InteractiveButtonFeedback />
            </div>

            <!-- Demo de Acordeón -->
            <div class="mb-12"> <!-- Contenedor para esta demo específica -->
                <AccordionShowcase />
            </div>

            <!-- Demo de Notificaciones Toast -->
            <div class="mb-12"> <!-- Contenedor para esta demo específica -->
                <ToastNotificationShowcase />
            </div>

            <!-- Demo de Skeleton Loaders -->
            <div> <!-- Ya no es el último, así que podemos quitar mb-12 si el siguiente no lo necesita -->
                <SkeletonLoaderShowcase />
            </div>
        </section>

        <section
            id="orchestration"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 500, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-purple-500/30 pb-3">
                III. Orchestrated Motion <span class="text-purple-500">& Page Flow</span>
            </h2>
            <OrchestrationShowcase />
        </section>


        <footer class="text-center mt-16 sm:mt-24 pb-8" in:fly={{ y: 50, duration: 500, delay:600 }}>
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>
</div>

<style>
    h1 /*de Motion Core*/ {
        text-shadow: 0 0 10px var(--color-brand-pink); /* Ajusta el color si es necesario */
    }

    /* Animaciones para los anillos orbitales del icono */
    @keyframes orbit {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-orbit-slow {
        animation: orbit 20s linear infinite;
    }
    .animate-orbit-fast {
        animation: orbit 15s linear infinite reverse; /* Dirección opuesta y un poco más rápido */
    }

    /* Estilo para los <code> tags */
    /*code {*/
        /* Tailwind ya debería aplicar estilos de fuente mono si usas font-mono,
           pero puedes añadir más aquí si es necesario */
    /*}*/
</style>