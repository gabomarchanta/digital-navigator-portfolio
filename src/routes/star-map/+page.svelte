<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing'; // Una función de easing suave
	import { text } from '@sveltejs/kit';

    // Definición de tus planetas/habilidades
    // Añade un campo 'icon' o 'image' si vas a usar imágenes/iconos específicos para cada planeta
    const planets = [
        {
            id: 'ui-design',
            name: 'Aesthetica Prime',
            skillFocus: 'UI Design Mastery',
            tagline: 'Crafting visually stunning and intuitive user interfaces.',
            path: '/planets/ui-design',
            colorClass: 'bg-brand-cyan',
            textColorClass: 'text-brand-cyan',
            hoverColorClass: 'hover:shadow-brand-cyan/30',
            icon: '/images/planets/planet-ui-design.svg'
        },
        {
            id: 'animations',
            name: 'Motion Core',
            skillFocus: 'Animation & Interaction',
            tagline: 'Bringing designs to life with fluid motion and engaging microinteractions.',
            path: '/planets/animations',
            colorClass: 'bg-brand-pink',
            textColorClass: 'text-brand-pink',
            hoverColorClass: 'hover:shadow-brand-pink/30',
            icon: '/images/planets/planet-animations.svg'
        },
        {
            id: 'frontend-dev',
            name: 'Structura Nebula',
            skillFocus: 'Frontend Development',
            tagline: 'Building robust and elegant digital experiences with Svelte & modern web tech.',
            path: '/planets/development',
            colorClass: 'bg-purple-500',
            textColorClass: 'text-purple-500',
            hoverColorClass: 'hover:shadow-purple-500/30',
            icon: '/images/planets/planet-development.svg'
        },
        {
            id: 'responsive-design',
            name: 'Adapta Cluster',
            skillFocus: 'Responsive Design',
            tagline: 'Ensuring seamless experiences across all devices and screen sizes.',
            path: '/planets/responsive',
            colorClass: 'bg-emerald-500',
            textColorClass: 'text-emerald-500',
            hoverColorClass: 'hover:shadow-emerald-500/30',
            icon: '/images/planets/planet-responsive-design.svg'
        },
        {
            id: 'ai-integration',
            name: 'A.I. Nexus',
            skillFocus: 'AI in Design Engineering',
            tagline: 'Exploring the synergy of Artificial Intelligence and creative development.',
            path: '/planets/ai-nexus',
            colorClass: 'bg-amber-500',
            textColorClass: 'text-amber-500',
            hoverColorClass: 'hover:shadow-amber-500/30',
            icon: '/images/planets/planet-ai-integration.svg'
        }
    ];

    // Placeholder para la página de destino de cada planeta (crearás estas páginas después)
    // Por ahora, puedes crear archivos vacíos o con un h1 en:
    // src/routes/planets/ui-design/+page.svelte
    // src/routes/planets/animations/+page.svelte
    // etc.
</script>

<div class="min-h-screen bg-space-darkest text-space-lighter-text p-4 sm:p-8 flex flex-col items-center">
    <header
        class="my-8 sm:my-12 text-center"
        in:fly={{ y: -50, duration: 700, easing: quintOut }}
    >
        <h1 class="text-4xl sm:text-5xl font-black text-brand-cyan mb-3">Galactic Skill Map</h1>
        <p class="text-xl sm:text-2xl text-space-light-text">
            Chart your course and explore the planets of proficiency.
        </p>
    </header>

    <div class="w-full max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {#each planets as planet, i}
                <a href={planet.path}
                   class="block p-6 rounded-xl bg-slate-800/50 hover:bg-slate-700/70
                          border border-slate-700 hover:border-slate-600
                          transition-all duration-300 ease-in-out transform hover:-translate-y-1
                          shadow-lg {planet.hoverColorClass} hover:shadow-xl"
                   in:fly={{ y: 50, duration: 500, delay: 100 * i, easing: quintOut }}
                >
                    <div class="flex items-center mb-4">
                        <div class="text-3xl mr-4">
                            <img src={planet.icon} alt={`Icon for ${planet.name}`} class="w-10 h-10" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-slate-100">{planet.name}</h2>
                            <p class={`text-sm font-medium ${planet.textColorClass}`}>{planet.skillFocus}</p>
                        </div>
                    </div>
                    <p class="text-space-light-text text-sm leading-relaxed">
                        {planet.tagline}
                    </p>
                    <div class={`h-1 w-12 mt-5 rounded-full ${planet.colorClass}`}></div> <!-- Acento de color -->
                </a>
            {/each}
        </div>
    </div>

    <footer class="mt-12 sm:mt-16" in:fly={{ y: 50, duration: 500, delay: 500 + planets.length * 100, easing: quintOut }}>
        <a href="/" class="text-brand-pink hover:text-pink-400 transition-colors duration-200 text-lg">
            ← Return to Launch Pad
        </a>
    </footer>
</div>

<style>
    /* Puedes añadir estilos globales para la página aquí si es necesario,
       o efectos más complejos que Tailwind no cubra fácilmente. */
    h1 {
        text-shadow: 0 0 8px rgba(34, 211, 238, 0.5); /* Mantenemos el text-shadow de marca */
    }
</style>