<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import { quintOut } from 'svelte/easing'; // Para un easing más suave
    import InteractivePalette from '$lib/components/planet-ui-design/InteractivePalette.svelte';
    import InteractiveTypography from '$lib/components/planet-ui-design/InteractiveTypography.svelte';
    import ButtonShowcase from '$lib/components/planet-ui-design/ButtonShowcase.svelte';
    import CardShowcase from '$lib/components/planet-ui-design/CardShowcase.svelte';
    import InputFieldShowcase from '$lib/components/planet-ui-design/InputFieldShowcase.svelte';
    import ModalShowcase from '$lib/components/planet-ui-design/ModalShowcase.svelte';
    import ToggleShowcase from '$lib/components/planet-ui-design/ToggleShowcase.svelte';
    import LayoutSystemShowcase from '$lib/components/planet-ui-design/LayoutSystemShowcase.svelte';

    // Placeholder para datos de esta página si los necesitas más adelante
</script>

<div class="min-h-screen bg-space-darkest text-space-lighter-text flex flex-col items-center p-4 sm:p-8 pt-16 sm:pt-24">
    <!-- Contenedor Principal del Contenido del Planeta -->
    <main class="w-full max-w-4xl mx-auto">

        <!-- 1. Encabezado del Planeta -->
        <header
            class="text-center mb-16 sm:mb-24"
            in:fly={{ y: -50, duration: 700, easing: quintOut }}
        >
            <!-- Icono Grande del Planeta (Opcional, pero recomendado) -->
            <img
                src="/images/planets/planet-ui-design.svg"
                alt="Aesthetica Prime Icon"
                class="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6"
                in:scale={{ duration: 600, delay: 200, start: 0.5, easing: quintOut }}
            />
            <h1 class="text-4xl sm:text-5xl font-black text-brand-cyan mb-4">
                Aesthetica Prime
            </h1>
            <p class="text-xl sm:text-2xl text-space-light-text max-w-2xl mx-auto">
                The Art & Science of User Interface Design. Discover how thoughtful aesthetics and intuitive patterns create delightful digital experiences.
            </p>
        </header>

        <!-- Aquí irán las secciones de contenido -->
        <!-- Sección I: Foundations: Color & Typography -->
        <section
            id="foundations"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 300, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-8 text-center sm:text-left border-b-2 border-brand-cyan/30 pb-3">
                I. Foundations: <span class="text-brand-cyan">Color & Typography</span>
            </h2>

            <!-- Sub-sección: Color -->
            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-slate-200 mb-2">The Palette</h3>
                <p class="text-space-light-text mb-6">
                    A well-chosen color palette sets the mood, conveys meaning, and ensures clarity. My approach focuses on accessibility, brand identity, and emotional impact.
                </p>
                <!-- DEMO DE PALETA INTERACTIVA IRÁ AQUÍ -->
                <div class="bg-slate-800/50 p-6 rounded-lg text-center">
                    <InteractivePalette />
                </div>
            </div>

            <!-- Sub-sección: Typography -->
            <div>
                <h3 class="text-2xl font-semibold text-slate-200 mb-2">The Words We Read</h3>
                <p class="text-space-light-text mb-6">
                    Typography is the voice of an interface. Clear hierarchy, legible typefaces, and appropriate line spacing are crucial for readability and user engagement.
                </p>
                
                <div class="bg-slate-800/50 p-6 rounded-lg text-center">
                    <InteractiveTypography />
                </div>
            </div>
        </section>

        <!-- Sección II: Component Showcase -->
        <section
            id="component-showcase"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 400, easing: quintOut }}
        >
             <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-8 text-center sm:text-left border-b-2 border-brand-pink/30 pb-3">
                II. Component <span class="text-brand-pink">Showcase</span>
            </h2>

            <div class="space-y-12 md:space-y-16">
                <ButtonShowcase />
                <CardShowcase />
                <InputFieldShowcase />
                <ModalShowcase />
                <ToggleShowcase />                
            </div>
        </section>

        <!-- Sección III: Layout Principles -->
        <section
            id="layout-principles"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 500, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-8 text-center sm:text-left border-b-2 border-brand-purple/30 pb-3">
                III. Layout <span class="text-brand-purple">Principles</span>
            </h2>
            <LayoutSystemShowcase /> <!-- AÑADE AQUÍ -->
        </section>

        <!-- Navegación para Volver -->
        <footer class="text-center mt-16 sm:mt-24 pb-8" in:fly={{ y: 50, duration: 500, delay:600 }}>
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>
</div>

<style>
    /* Mantener el text-shadow del título principal del portfolio si quieres */
    /* h1 (el del planeta) ya tiene un estilo fuerte con font-black */

    /* Otros estilos específicos si son necesarios */
</style>