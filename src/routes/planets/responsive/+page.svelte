<!-- src/routes/planets/responsive/+page.svelte -->
<script lang="ts">
    import { fly, fade, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    // Para iconos outline de 24px (predeterminado si no se especifica /20/ o /solid/)
    import type { SvelteComponent } from 'svelte';

    import DevicePhoneMobile from 'svelte-heros-v2/DevicePhoneMobile.svelte'; // Asume outline, 24px
    import ViewColumns from 'svelte-heros-v2/ViewColumns.svelte';
    import Photo from 'svelte-heros-v2/Photo.svelte';
    import CommandLine from 'svelte-heros-v2/CommandLine.svelte';
    import SquaresPlus from 'svelte-heros-v2/SquaresPlus.svelte';

    // Placeholder para componentes de demo que crearemos más tarde
    import ResponsiveGridDemo from '$lib/components/planet-responsive/ResponsiveGridDemo.svelte';
    import ResponsiveImageDemo from '$lib/components/planet-responsive/ResponsiveImageDemo.svelte';
    import ResponsiveTypographyDemo from '$lib/components/planet-responsive/ResponsiveTypographyDemo.svelte';

    interface Principle {
    id: string;
    title: string;
    iconComponent: typeof SvelteComponent;
    description: string;
}

const corePrinciples: Principle[] = [
    {
        id: 'mobile-first',
        title: 'Mobile-First Approach',
        iconComponent: DevicePhoneMobile as unknown as typeof SvelteComponent,
        description: 'Designing for the smallest screens first and then progressively enhancing for larger viewports ensures a solid foundation for all users. This prioritizes core content and functionality, leading to a more focused and efficient design.'
    },
    {
        id: 'fluid-grids',
        title: 'Fluid Grids & Layouts',
        iconComponent: ViewColumns as unknown as typeof SvelteComponent,
        description: 'Utilizing relative units like percentages, <code>vw</code>/<code>vh</code>, or flexible grid units (<code>fr</code> in CSS Grid, <code>flex-grow/shrink</code> in Flexbox) allows layouts to adapt gracefully. Tailwind CSS\'s responsive prefixes make implementing fluid grids intuitive.'
    },
    {
        id: 'flexible-media',
        title: 'Flexible Images & Media',
        iconComponent: Photo as unknown as typeof SvelteComponent,
        description: 'Media elements must also be responsive. Techniques like <code>max-width: 100%</code>, <code>height: auto</code>, or the <code><picture></code> element ensure media content scales appropriately without distortion or overflow.'
    },
    {
        id: 'media-queries',
        title: 'Media Queries',
        iconComponent: CommandLine as unknown as typeof SvelteComponent,
        description: 'The cornerstone of responsive design. Media queries allow us to apply specific CSS rules based on device characteristics, primarily viewport width, to optimize the experience for different screen sizes.'
    },
    {
        id: 'container-queries',
        title: '(Emerging) Container Queries',
        iconComponent: SquaresPlus as unknown as typeof SvelteComponent,
        description: 'While media queries respond to the global viewport, container queries (a newer CSS feature) allow components to adapt based on the size of their <em>containing element</em>, offering more modularity.'
    }
];

// Estado para el acordeón de principios
let openPrincipleId: string | null = corePrinciples[0].id; // El primer principio abierto por defecto

function togglePrinciple(principleId: string) {
    if (openPrincipleId === principleId) {
        openPrincipleId = null; // Cierra si ya está abierto
    } else {
        openPrincipleId = principleId; // Abre el nuevo
    }
}
</script>

<div class="min-h-screen bg-space-darkest text-space-lighter-text flex flex-col items-center p-4 sm:p-8 pt-16 sm:pt-24">
    <main class="w-full max-w-4xl mx-auto">

        <!-- 1. Encabezado del Planeta -->
        <header
            class="text-center mb-16 sm:mb-24"
            in:fly={{ y: -50, duration: 700, easing: quintOut }}
        >
            <!-- Icono del Planeta -->
            <div class="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 group">
                <img
                    src="/images/planets/planet-responsive-design.svg"
                    alt="Adapta Cluster Planet Icon"
                    class="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                    in:fade={{ duration: 600, delay: 100, easing: quintOut }}
                />
                <!-- Efecto visual adicional para el icono (opcional) -->
                <!-- Ejemplo: múltiples rectángulos de diferentes tamaños superpuestos sutilmente -->
                <div class="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                    <div class="w-1/2 h-3/4 bg-emerald-500/30 rounded-sm transform -rotate-12 animate-pulse-slow"></div>
                    <div class="w-3/4 h-1/2 bg-teal-500/30 rounded-sm transform rotate-12 animate-pulse-slower"></div>
                    <div class="w-1/3 h-1/3 bg-green-500/30 rounded-full animate-pulse"></div>
                </div>
            </div>

            <h1 class="text-4xl sm:text-5xl font-black text-emerald-400 mb-4">
                Adapta Cluster
            </h1>
            <p class="text-xl sm:text-2xl text-space-light-text max-w-2xl mx-auto">
                Designing for Every Screen. Ensuring seamless and optimal experiences across the vast universe of devices.
            </p>
        </header>

        <!-- Sección I: Core Principles of Responsive Design (Ahora como Acordeón) -->
        <section id="core-principles" class="mb-16 sm:mb-24" in:fly|global={{ y: 50, duration: 600, delay: 300, easing: quintOut }}>
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-8 text-center sm:text-left border-b-2 border-emerald-500/30 pb-3">
                I. Core Principles of <span class="text-emerald-400">Responsive Design</span>
            </h2>

            <div class="space-y-1 rounded-xl overflow-hidden border border-slate-700/80 shadow-lg">
                {#each corePrinciples as principle, i (principle.id)}
                    {@const isOpen = openPrincipleId === principle.id}
                    <div class="bg-slate-800/50 {i > 0 ? 'border-t border-slate-700/60' : ''}">
                        <h3> <!-- Cambiado de div a h3 para semántica -->
                            <button
                                type="button"
                                class="flex items-center justify-between w-full p-4 sm:p-5 text-left text-slate-100 hover:bg-slate-700/40 focus:outline-none focus:bg-slate-700/50 transition-colors duration-150"
                                on:click={() => togglePrinciple(principle.id)}
                                aria-expanded={isOpen}
                                aria-controls="principle-content-{principle.id}"
                            >
                                <span class="flex items-center gap-3 sm:gap-4">
                                    <span class="flex-shrink-0 text-emerald-400 bg-emerald-900/50 p-2 sm:p-2.5 rounded-full ring-1 ring-emerald-500/30">
                                        <svelte:component this={principle.iconComponent} class="w-5 h-5 sm:w-6 sm:h-6" />
                                    </span>
                                    <span class="text-md sm:text-lg font-semibold">{principle.title}</span>
                                </span>
                                <svg
                                    class="w-5 h-5 text-slate-400 transform transition-transform duration-200 ease-in-out"
                                    class:-rotate-180={isOpen}
                                    class:rotate-0={!isOpen}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                >
                                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </h3>

                        {#if isOpen}
                            <div
                                transition:slide={{ duration: 300, easing: quintOut }}
                                id="principle-content-{principle.id}"
                                class="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 sm:pt-3"
                            >
                                <div class="prose prose-sm sm:prose-base prose-invert max-w-none
                                            prose-p:text-slate-300 prose-p:leading-relaxed
                                            prose-strong:text-slate-100
                                            prose-em:text-slate-300
                                            prose-code:bg-slate-700 prose-code:text-amber-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono">
                                    {@html principle.description}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>

        <!-- Sección II: Responsive Showcase -->
        <section id="responsive-showcase" class="mb-16 sm:mb-24" in:fly={{ y: 50, duration: 600, delay: 400, easing: quintOut }}>
             <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-teal-500/30 pb-3">
                II. Responsive <span class="text-teal-400">Showcase</span>
            </h2>
            <div>
                <p class="prose prose-sm sm:prose-base prose-invert max-w-none mb-6 text-slate-300 leading-relaxed">
                    Below is an interactive demonstration of a responsive grid. Use the buttons to simulate different viewport widths within the "device frame".
                    The grid inside uses Tailwind CSS's responsive prefixes (<code>sm:</code>, <code>md:</code>, <code>lg:</code>) to change the number of columns.
                    You can also resize your browser window to see the overall page adapt, including this entire section.
                    The inner container has a fixed height and vertical scroll to illustrate content overflow within a constrained viewport.
                </p>
                <ResponsiveGridDemo />
                <ResponsiveImageDemo />
                <ResponsiveTypographyDemo />
            </div>
        </section>

        <footer class="text-center mt-16 sm:mb-24 pb-8" in:fly={{ y: 50, duration: 500, delay:600 }}>
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>
</div>

<style>
    h1 { text-shadow: 0 0 10px var(--color-emerald-400); }

    /* Para animaciones de los elementos decorativos del icono del planeta */
    @keyframes pulse-slower-keyframe {
        0%, 100% { opacity: 0.7; transform: scale(1) rotate(12deg); }
        50% { opacity: 0.4; transform: scale(0.95) rotate(10deg); }
    }
    .animate-pulse-slower {
        animation: pulse-slower-keyframe 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
     @keyframes pulse-slow-keyframe { /* Renombrado para evitar conflicto con Tailwind si lo tuviera */
        0%, 100% { opacity: 1; }
        50% { opacity: .6; }
    }
    .animate-pulse-slow {
        animation: pulse-slow-keyframe 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
</style>