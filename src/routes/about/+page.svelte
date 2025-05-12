<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { SvelteComponent } from 'svelte'; // Para tipar componentes icono

    // Iconos para "Guiding Stars" (de svelte-heros-v2 o tus propios SVGs)
    import UserGroup from 'svelte-heros-v2/UserGroup.svelte'; // Ejemplo para User-Centric
    import Cog6Tooth from 'svelte-heros-v2/Cog6Tooth.svelte';   // Ejemplo para Precision
    import Sparkles from 'svelte-heros-v2/Sparkles.svelte';   // Ejemplo para Discovery/Innovation
    import ChatBubbleLeftRight from 'svelte-heros-v2/ChatBubbleLeftRight.svelte'; // Ejemplo para Collaboration

    interface GuidingStar {
        id: string;
        title: string;
        icon: typeof SvelteComponent;
        description: string;
    }

    const guidingStars: GuidingStar[] = [
        {
            id: 'user-centric',
            title: 'User-Centric Exploration',
            icon: UserGroup as unknown as typeof SvelteComponent,
            description: 'Every digital journey begins and ends with the user. I prioritize empathy and deep understanding to craft intuitive and meaningful experiences.'
        },
        {
            id: 'precision',
            title: 'Precision Craftsmanship',
            icon: Cog6Tooth as unknown as typeof SvelteComponent,
            description: 'From pixel-perfect interfaces to clean, efficient code, I believe in meticulous attention to detail to deliver high-quality, robust solutions.'
        },
        {
            id: 'discovery',
            title: 'Continuous Discovery',
            icon: Sparkles as unknown as typeof SvelteComponent,
            description: 'The digital cosmos is ever-expanding. I am committed to lifelong learning, embracing new technologies and methodologies to innovate and evolve.'
        },
        // Puedes añadir un cuarto si quieres, por ejemplo:
        // {
        //     id: 'collaboration',
        //     title: 'Collaborative Cartography',
        //     icon: ChatBubbleLeftRight as unknown as typeof SvelteComponent,
        //     description: 'Charting the best courses requires teamwork. I value open communication and collaborative problem-solving to achieve shared goals.'
        // }
    ];

    interface SkillData {
        id: string;
        name: string; // Nombre del Planeta/Habilidad
        tagline: string;
        iconComponent: string; // O string si es ruta a SVG y usas <img>
        path: string; // Ruta al planeta
        accentColorClass: string; // Para el borde o acento de la tarjeta
    }

    const constellationSkills: SkillData[] = [
        {
            id: 'ui-design', name: 'Aesthetica Prime', tagline: 'Visual & UI Design Mastery',
            iconComponent: "/images/planets/planet-ui-design.svg",
            path: '/planets/ui-design', accentColorClass: 'border-brand-cyan' // Color del planeta UI Design
        },
        {
            id: 'animation', name: 'Motion Core', tagline: 'Animation & Microinteractions',
            iconComponent: "/images/planets/planet-animations.svg",
            path: '/planets/animations', accentColorClass: 'border-brand-pink' // Color del planeta Animation
        },
        {
            id: 'responsive', name: 'Adapta Cluster', tagline: 'Responsive & Adaptive Layouts',
            iconComponent: "/images/planets/planet-responsive-design.svg",
            path: '/planets/responsive', accentColorClass: 'border-emerald-400' // Color del planeta Responsive
        },
        {
            id: 'development', name: 'Structura Nebula', tagline: 'Frontend Architecture & Code',
            iconComponent: "/images/planets/planet-development.svg",
            path: '/planets/development', accentColorClass: 'border-purple-500' // Color del planeta Development
        },
        {
            id: 'ai', name: 'A.I. Nexus', tagline: 'AI in Design Engineering',
            iconComponent: "/images/planets/planet-ai-integration.svg",
            path: '/planets/ai-nexus', accentColorClass: 'border-sky-400' // Color del planeta AI
        },
    ];
</script>

<div class="min-h-screen bg-space-darkest text-space-lighterText flex flex-col items-center p-4 sm:p-8 pt-16 sm:pt-24">
    <main class="w-full max-w-4xl mx-auto">

        <!-- 1. Encabezado de la Página "Navigator's Logbook" -->
        <header
            class="mb-16 sm:mb-24 text-center md:text-left"
            in:fly|global={{ y: -50, duration: 700, easing: quintOut }}
        >
            <div class="md:flex md:items-center md:gap-8 lg:gap-12">
                <!-- Contenedor de la Imagen -->
                <div class="md:w-1/3 lg:w-2/5 mb-6 md:mb-0 flex-shrink-0"
                     in:fly|global={{ x: -30, duration: 600, delay:200, easing: quintOut }}>
                    <div class="relative w-48 h-48 sm:w-56 sm:h-56 md:w-full md:h-auto md:aspect-[4/5] mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-sky-500/30 group">
                        <img
                            src="/images/about/navigator-profile.png"
                            alt="Gabriel Gil - The Digital Navigator"
                            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        
                    </div>
                </div>

                <!-- Contenedor del Texto -->
                <div class="md:w-2/3 lg:w-3/5"
                     in:fly|global={{ x: 30, duration: 600, delay:350, easing: quintOut }}>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
                        <span class="text-sky-400">Navigator's Log:</span>
                        <span class="text-slate-100">Gabriel Gil</span> <!-- REEMPLAZA CON TU NOMBRE -->
                    </h1>
                    <p class="text-lg sm:text-xl text-slate-300 mb-6 leading-relaxed">
                        Crafting experiences where design meets code with purpose and passion.
                    </p>
                    <div class="flex justify-center md:justify-start gap-3">
                        <a href="#log-entry-genesis"
                           class="inline-block bg-transparent border-2 border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors duration-200 text-sm sm:text-base">
                            Read Log Entries
                        </a>
                        <a href="/contact"
                           class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition-colors duration-200 text-sm sm:text-base">
                            Open Comms Channel
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Siguiente Sección: "Log Entry: Genesis" -->
        <section id="log-entry-genesis" class="mb-16 sm:mb-24 scroll-mt-20">
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-100 mb-6 text-center md:text-left border-b border-slate-700 pb-2">
                Log Entry: <span class="text-sky-400">Genesis</span>
            </h2>
            <div class="prose prose-sm sm:prose-base prose-invert max-w-none text-slate-300 leading-relaxed">
                <p class="!mt-0">
                    <!-- Aquí va tu texto sobre cómo empezaste, tu chispa inicial -->
                    My journey into the vast universe of web development and design began with a simple curiosity...
                    I was captivated by the ability to craft interactive worlds from lines of code and pixels.
                    The challenge of blending analytical thinking with creative expression felt like charting unknown territories,
                    and I was immediately hooked on the process of discovery and creation.
                </p>
                <p>
                    Early voyages involved navigating the fundamentals, from the foundational structures of HTML and CSS
                    to the dynamic currents of JavaScript. Each new concept learned, each small project completed,
                    felt like a newly discovered star system, fueling my desire to explore further and deeper into the
                    capabilities of digital craftsmanship.
                </p>
            </div>
        </section>

        <!-- Sección "Guiding Stars: My Philosophy & Values" -->
        <section
            id="guiding-stars"
            class="mb-16 sm:mb-24 scroll-mt-20"
            in:fly|global={{ y: 50, duration: 600, delay: 200, easing: quintOut }}
        >
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-100 mb-8 sm:mb-10 text-center md:text-left border-b border-slate-700 pb-2">
                Guiding <span class="text-sky-400">Stars</span>: My Principles
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {#each guidingStars as star (star.id)}
                    <div
                        class="bg-slate-800/50 p-5 sm:p-6 rounded-xl shadow-lg border border-slate-700/70
                               hover:border-sky-500/40 transition-all duration-200 ease-out
                               flex flex-col items-center text-center sm:items-start sm:text-left"
                        in:fly|global={{ y: 20, duration: 400, delay: 100 + star.id.length * 30, easing: quintOut }}                        
                    >
                        <div class="flex-shrink-0 text-sky-400 bg-sky-900/60 p-3 rounded-full mb-4 ring-1 ring-sky-500/30">
                            <svelte:component this={star.icon} class="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <h3 class="text-lg sm:text-xl font-semibold text-slate-100 mb-2">
                            {star.title}
                        </h3>
                        <p class="text-sm text-slate-300 leading-relaxed">
                            {star.description}
                        </p>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Sección "The Constellation of Skills" -->
        <section
            id="constellation-skills"
            class="mb-16 sm:mb-24 scroll-mt-20"
            in:fly|global={{ y: 50, duration: 600, delay: 300, easing: quintOut }}
        >
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-100 mb-8 sm:mb-10 text-center md:text-left border-b border-slate-700 pb-2">
                The <span class="text-sky-400">Constellation</span> of Skills
            </h2>
            <p class="text-center md:text-left text-slate-400 mb-8 -mt-6 text-sm">
                A map of the primary star systems I navigate with expertise, each linking to a deeper exploration.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {#each constellationSkills as skill (skill.id)}
                    <a href={skill.path}
                       class="block bg-slate-800/60 p-5 rounded-xl shadow-lg border-2 border-transparent
                              hover:border-{skill.accentColorClass.replace('border-', '')}/70 <!-- Aplica color de acento en hover -->
                              hover:shadow-{skill.accentColorClass.replace('border-', '')}/20 <!-- Sombra de color en hover -->
                              transition-all duration-200 ease-out transform hover:scale-[1.03]"
                       in:fly|global={{ y: 20, duration: 400, delay: 150 + skill.id.length * 25, easing: quintOut }}
                    >
                        <div class="flex items-center mb-3">
                            <div class="flex-shrink-0 {skill.accentColorClass.replace('border-', 'text-')} mr-3">
                                <img src={skill.iconComponent} alt={skill.name} class="w-7 h-7" />
                            </div>
                            <h3 class="text-lg font-semibold text-slate-100 truncate" title={skill.name}>
                                {skill.name}
                            </h3>
                        </div>
                        <p class="text-xs text-slate-400 leading-snug">
                            {skill.tagline}
                        </p>
                    </a>
                {/each}
            </div>
        </section>

        <section
            id="future-trajectories"
            class="mb-16 sm:mb-24 scroll-mt-20"
            in:fly|global={{ y: 50, duration: 600, delay: 400, easing: quintOut }}
        >
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-100 mb-6 sm:mb-8 text-center md:text-left border-b border-slate-700 pb-2">
                Future <span class="text-sky-400">Trajectories</span>: Aspirations
            </h2>

            <div class="space-y-8">

                <p class="text-slate-300 leading-relaxed text-sm sm:text-base">
                    The digital universe is in a constant state of flux, with new stars of technology and design paradigms igniting regularly. My journey as a Digital Navigator is one of perpetual learning and adaptation, always eager to explore what lies beyond the known horizon.
                </p>

                <div>
                    <h4 class="text-xl sm:text-2xl text-slate-100 font-semibold mb-2 mt-6">Venturing into New Frontiers</h4>
                    <p class="text-slate-300 leading-relaxed text-sm sm:text-base">
                        I am particularly excited by the advancements in <strong class="text-sky-300 font-semibold">"Interactive 3D Web Experiences (WebGPU/Three.js)"</strong> and the evolving role of <strong class="text-sky-300 font-semibold">"AI in streamlining design-to-code workflows"</strong>.
                        I plan to dedicate time to deepen my understanding and practical skills in these domains, seeking opportunities to integrate them into future projects to create even more immersive and intelligent user experiences.
                    </p>
                </div>

                <div>
                    <h4 class="text-xl sm:text-2xl text-slate-100 font-semibold mb-2 mt-6">Collaborative Voyages & Impactful Missions</h4>
                    <p class="text-slate-300 leading-relaxed text-sm sm:text-base">
                        Looking ahead, I aspire to collaborate on projects that tackle meaningful challenges and have a positive impact. Whether it's crafting accessible educational platforms, building tools that empower creativity, or designing intuitive interfaces for complex systems, I'm driven by the desire to contribute to solutions that are not only technologically sound but also human-centered and ethically considered. I thrive in environments that foster innovation, encourage diverse perspectives, and value a meticulous approach to design and engineering.
                    </p>
                </div>

                <div>
                    <h4 class="text-xl sm:text-2xl text-slate-100 font-semibold mb-2 mt-6">Continuous Refinement of Craft</h4>
                    <p class="text-slate-300 leading-relaxed text-sm sm:text-base">
                        My commitment extends to continuously refining my core skills in UI/UX design, frontend development, and the art of animation. Staying abreast of best practices, exploring new design patterns, and mastering the tools of the trade are integral to my philosophy. The goal is always to build digital products that are not just functional, but also elegant, efficient, and a joy to use.
                    </p>
                    <!-- Si necesitas <code> tags aquí, estilízalos directamente: -->
                    <!-- <p>Ejemplo con <code class="bg-slate-700 text-amber-400 px-1.5 py-0.5 rounded-md text-xs font-mono">código</code>.</p> -->
                </div>
            </div>
        </section>
        
        <footer class="text-center mt-16 sm:mb-24 pb-8">
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>
</div>
