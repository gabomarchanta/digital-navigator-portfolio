<!-- src/routes/planets/ai-nexus/+page.svelte -->
<script lang="ts">
    import { fly, fade, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import AiPromptSimulator from '$lib/components/planet-ai-nexus/AiPromptSimulator.svelte';
    import ImageModal from '$lib/components/ImageModal.svelte';

    // --- DATOS PARA SECCIÓN "EXPLORING THE FRONTIER" ---
    interface AiToolConcept {
        id: string;
        name: string;
        category: string; // e.g., "Image Generation", "Code Assistance", "UX Analysis"
        description: string;
        icon?: string; // Podría ser un emoji o el nombre de un componente icono
        logoUrl?: string; // Opcional: ruta a un logo pequeño si es una herramienta específica
        exampleUse?: string; // Breve caso de uso
    }

    const aiToolsAndConcepts: AiToolConcept[] = [
        {
            id: 'gen-image',
            name: 'Generative Image AI',
            category: 'Visual Ideation & Asset Creation',
            description: 'Tools like Midjourney, DALL-E, and Stable Diffusion can produce a vast range of visual styles and concepts from text prompts, accelerating mood boarding and asset generation.',
            logoUrl: '/images/logos/midjourney-logo.svg', // Necesitarás estos logos/iconos
            exampleUse: 'Quickly generating diverse visual styles for a new app theme.'
        },
        {
            id: 'code-assist',
            name: 'AI Code Assistants',
            category: 'Development & Prototyping',
            description: 'Platforms like GitHub Copilot or features within LLMs (e.g., ChatGPT for code) assist in writing boilerplate, debugging, and even scaffolding components.',
            logoUrl: '/images/logos/github-copilot-logo.svg',
            exampleUse: 'Scaffolding a Svelte component structure from a design brief.'
        },
        {
            id: 'ux-analytics',
            name: 'AI for UX Analytics',
            category: 'User Understanding & Optimization',
            description: 'AI can process large datasets from user interactions (heatmaps, session data) to identify patterns, pain points, and areas for UX improvement more efficiently.',
            icon: '📊', // Ejemplo usando la prop 'icon'
            exampleUse: 'Identifying common user drop-off points in a complex flow.'
        },
        {
            id: 'content-gen',
            name: 'AI Content Generation',
            category: 'Content Strategy & Placeholder Text',
            description: 'LLMs can help generate placeholder text, draft copy variations, summarize information, or even help define a content strategy for interfaces.',
            icon: '✍️',
            exampleUse: 'Generating varied marketing copy for A/B testing on a landing page.'
        },
        // Añade más según te interese
    ];

// --- DATOS Y ESTADO PARA EL ACORDEÓN DE ÉTICA ---
interface EthicsPoint {
    id: string;
    title: string;
    // icon?: string; // Opcional: podrías añadir un emoji o SVG simple si quieres
    content: string;
}

const ethicsAndFuturePoints: EthicsPoint[] = [
    {
        id: 'bias',
        title: 'Acknowledging Bias & Striving for Fairness',
        content: 'AI models learn from the data they are trained on. If this data reflects existing societal biases, the AI can inadvertently perpetuate or even amplify them. Continuous vigilance, diverse datasets, and rigorous testing are essential to mitigate bias and build more equitable AI-assisted tools.'
    },
    {
        id: 'authorship',
        title: 'Authorship & Intellectual Property',
        content: 'The rise of generative AI brings complex questions about originality, authorship, and intellectual property. As a community, we need to establish clear ethical guidelines and respect creative ownership, whether the creator is human or assisted by AI.'
    },
    {
        id: 'human-touch',
        title: 'The Indispensable Human Touch',
        content: 'While AI can automate, generate, and analyze at incredible scales, it lacks genuine human empathy, nuanced contextual understanding, and ethical judgment. The Design Engineer\'s role evolves to become that of a <strong class="text-purple-300">curator, a critical thinker, and an ethical guide</strong>, directing AI tools to achieve human-centered goals rather than being passively led by them. Strategic creativity, user advocacy, and a deep understanding of human needs remain firmly in our domain.'
    },
    {
        id: 'learning',
        title: 'A Commitment to Continuous Learning',
        content: 'The field of AI is advancing at a breathtaking pace. My commitment is to remain a curious and adaptive learner, embracing new tools and methodologies while always grounding their application in sound design principles and ethical considerations. The future is a collaboration between human ingenuity and artificial intelligence.'
    }
];

let openEthicsPointId: string | null = ethicsAndFuturePoints[0].id; // Primer punto abierto por defecto

function toggleEthicsPoint(pointId: string) {
    if (openEthicsPointId === pointId) {
        openEthicsPointId = null;
    } else {
        openEthicsPointId = pointId;
    }
}

// --- DATOS PARA LA GALERÍA DE IMÁGENES GENERADAS POR IA ---
    interface GeneratedImageData { // Define un tipo para tus imágenes
        src: string;
        alt: string;
    }
    const generatedImages: GeneratedImageData[] = [
        { src: '/images/ai-generated/symbiosis-concept1.png', alt: 'AI Concept: Futuristic Nav UI' },
        { src: '/images/ai-generated/symbiosis-concept2.png', alt: 'AI Concept: Alien Artifact Analyzer' },
        /*{ src: '/images/ai-generated/symbiosis-concept3.png', alt: 'AI Concept: Astronaut Comms App' },*/
        // Asumiendo que tienes esta imagen:
        { src: '/images/ai-generated/symbiosis-layout-d.png', alt: 'AI Concept: Wireframe Layout Exploration' }
    ];
    // --- FIN DE DATOS PARA GALERÍA ---


    let enlargedImageUrl: string | null = null;
    let enlargedImageAlt: string = '';

    function openImageModal(url: string, alt: string) {
        enlargedImageUrl = url;
        enlargedImageAlt = alt;
    }

    function closeImageModal() {
        enlargedImageUrl = null;
        enlargedImageAlt = '';
    }
</script>

<div class="min-h-screen bg-space-darkest text-space-lighter-text flex flex-col items-center p-4 sm:p-8 pt-16 sm:pt-24">
    <main class="w-full max-w-4xl mx-auto">

        <!-- 1. Encabezado del Planeta -->
        <header
            class="text-center mb-16 sm:mb-24"
            in:fly|global={{ y: -50, duration: 700, easing: quintOut }}
        >
            <!-- Icono del Planeta -->
            <div class="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 group">
                <img
                    src="/images/planets/planet-ai-integration.svg"
                    alt="A.I. Nexus Planet Icon"
                    class="w-full h-full transition-transform duration-700 ease-out group-hover:rotate-[360deg] group-hover:scale-110"
                    in:fade={{ duration: 600, delay: 100, easing: quintOut }}
                />
                
            </div>

            <h1 class="text-4xl sm:text-5xl font-black text-sky-400 mb-4">
                A.I. Nexus
            </h1>
            <p class="text-xl sm:text-2xl text-space-light-text max-w-2xl mx-auto">
                Augmenting Creativity & Engineering with Artificial Intelligence. Exploring AI as a collaborative partner in shaping future digital experiences.
            </p>
        </header>

        <!-- Sección I: The Emerging Symbiosis: AI & The Design Engineer -->
        <section
            id="symbiosis"
            class="mb-16 sm:mb-24"
            in:fly|global={{ y: 50, duration: 600, delay: 300, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-sky-500/30 pb-3">
                I. The Emerging <span class="text-sky-400">Symbiosis</span>
            </h2>

            <div class="prose prose-sm sm:prose-base prose-invert max-w-none
                        prose-headings:text-slate-100 prose-headings:font-semibold prose-headings:mb-3
                        prose-p:text-slate-300 prose-p:leading-relaxed
                        prose-a:text-sky-400 hover:prose-a:text-sky-300
                        prose-strong:text-slate-100 prose-em:text-slate-300
                        prose-code:bg-slate-700 prose-code:text-amber-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono
                        space-y-6">

                <p>
                    Artificial Intelligence is rapidly evolving from a futuristic concept into a tangible set of tools poised to redefine creative and technical workflows.
                    For Design Engineers, this represents not a replacement, but an unprecedented opportunity for <strong class="text-sky-300">augmentation</strong>.
                    AI can act as a tireless assistant, an idea catalyst, and a powerful analytical engine, freeing us to focus on higher-level strategic thinking, nuanced user empathy, and innovative problem-solving.
                </p>

                <div>
                    <h3 class="text-xl sm:text-2xl text-slate-100 font-semibold mt-6 mb-2">Generative Design & Ideation</h3>
                    <p>
                        AI tools like Midjourney, DALL-E, and Stable Diffusion can rapidly generate a vast array of visual concepts from text prompts. This accelerates and broadens the ideation phase, helping explore diverse aesthetics, layouts, and imagery for mood boards, initial mockups, or even asset creation. It's like having an infinitely patient brainstorming partner.
                    </p>
                    <!-- Galería de imágenes generadas por IA -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 my-4 not-prose">
                        {#each generatedImages as imgInfo, i (imgInfo.src)}
                            {#if i < 2 || (i < 4 && typeof window !== 'undefined' && window.innerWidth >= 640)}                            
                                <button
                                    on:click={() => openImageModal(imgInfo.src, imgInfo.alt)}
                                    class="block w-full rounded-lg shadow-md overflow-hidden aspect-video bg-slate-700
                                    hover:scale-105 hover:shadow-xl transition-transform duration-200 ease-out
                                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-space-darkest"
                                    aria-label="View larger image: {imgInfo.alt}"
            >
                                    <img
                                        src={imgInfo.src}
                                        alt={imgInfo.alt}
                                        class="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </button>
                            {/if}
                        {/each}
                    </div>
                    <p class="text-xs text-center text-slate-500 not-prose -mt-2 mb-4">Click an image to enlarge. Example UI concepts rapidly generated via AI prompts.</p>
                </div>

                <div>
                    <h3 class="text-xl sm:text-2xl text-slate-100 font-semibold mt-6 mb-2">Code Assistance & Generation</h3>
                    <p>
                        Tools like GitHub Copilot and large language models (LLMs) can significantly speed up development. They assist in writing boilerplate code, generating functions from descriptions, debugging, and even translating design specifications into initial code structures. This allows Design Engineers to prototype faster and focus more on the interaction and polish.
                    </p>
                    <div class="my-4 not-prose rounded-lg shadow-lg overflow-hidden border border-slate-700">
                        <img src="/images/ai-mockups/code-assist-chat.png" alt="Mockup of AI code assistance chat" class="w-full object-contain"/>
                        
                    </div>
                    <p class="text-xs text-center text-slate-500 not-prose -mt-2 mb-4">AI accelerating development with code suggestions and generation.</p>
                </div>

                <div>
                    <h3 class="text-xl sm:text-2xl text-slate-100 font-semibold mt-6 mb-2">Personalization & Adaptive UIs</h3>
                    <p>
                        AI holds the potential to create truly dynamic interfaces that adapt in real-time to individual user needs, behaviors, and contexts. Imagine UIs that reconfigure themselves for optimal usability based on learned patterns, or content that is hyper-personalized, leading to more engaging and efficient interactions. While complex, the foundational concepts are being actively explored.
                    </p>
                </div>

                <div>
                    <h3 class="text-xl sm:text-2xl text-slate-100 font-semibold mt-6 mb-2">Data-Driven UX Insights</h3>
                    <p>
                        By analyzing vast amounts of user interaction data (e.g., clickstreams, session recordings, A/B test results), AI algorithms can uncover subtle patterns, identify usability issues, and predict user behavior. This provides Design Engineers with deeper insights to inform design decisions, validate hypotheses, and continuously iterate on a product for better UX outcomes.
                    </p>
                </div>
            </div>
        </section>

        <!-- Sección II: Exploring the Frontier -->
        <section
            id="frontier-tools"
            class="mb-16 sm:mb-24"
            in:fly|global={{ y: 50, duration: 600, delay: 500, easing: quintOut }}
        >
             <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-teal-500/30 pb-3">
                II. Exploring the <span class="text-teal-400">Frontier</span>
            </h2>

            <p class="text-slate-300 mb-8 prose prose-sm sm:prose-base prose-invert max-w-none">
                The landscape of AI tools for design and development is constantly expanding. Here are a few areas and tools I find particularly promising or have been exploring:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#each aiToolsAndConcepts as tool (tool.id)}
                    <div class="bg-slate-800/60 p-5 rounded-xl shadow-lg border border-slate-700/80
                                flex flex-col transition-all duration-200 hover:border-teal-500/50 hover:shadow-teal-500/10">
                        <div class="flex items-center mb-3">
                            {#if tool.logoUrl}
                                <img src={tool.logoUrl} alt="{tool.name} logo" class="w-8 h-8 mr-3 flex-shrink-0 object-contain"/>
                            {:else if tool.icon}
                                <span class="text-2xl mr-3 flex-shrink-0">{tool.icon}</span>
                            {/if}
                            <div>
                                <h4 class="text-lg font-semibold text-slate-100">{tool.name}</h4>
                                <p class="text-xs text-teal-400 font-medium">{tool.category}</p>
                            </div>
                        </div>
                        <p class="text-sm text-slate-300 leading-relaxed flex-grow">
                            {tool.description}
                        </p>
                        {#if tool.exampleUse}
                            <p class="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                                <strong class="text-slate-200">Example Use:</strong> {tool.exampleUse}
                            </p>
                        {/if}
                    </div>
                {/each}
            </div>

           <!-- Demo Simulada -->
            <div>
                <AiPromptSimulator />
            </div>
        </section>

        <!-- Sección III: Ethical Considerations & The Human Element -->
        <section
            id="ethics-future"
            class="mb-16 sm:mb-24"
            in:fly|global={{ y: 50, duration: 600, delay: 600, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-8 text-center sm:text-left border-b-2 border-purple-500/30 pb-3">
                III. Navigating the Horizon: <span class="text-purple-500">Ethics & the Human Element</span>
            </h2>

            <div class="space-y-1 rounded-xl overflow-hidden border border-slate-700/80 shadow-lg">
                {#each ethicsAndFuturePoints as point, i (point.id)}
                    {@const isOpen = openEthicsPointId === point.id}
                    <div class="bg-slate-800/50 {i > 0 ? 'border-t border-slate-700/60' : ''}">
                        
                        <h4>
                            <button
                                type="button"
                                class="flex items-center justify-between w-full p-4 sm:p-5 text-left text-slate-100 hover:bg-slate-700/40 focus:outline-none focus:bg-slate-700/50 transition-colors duration-150"
                                on:click={() => toggleEthicsPoint(point.id)}
                                aria-expanded={isOpen}
                                aria-controls="ethics-content-{point.id}"
                            >
                                <span class="text-md sm:text-lg font-semibold">{point.title}</span>
                                <svg
                                    class="w-5 h-5 text-slate-400 transform transition-transform duration-200 ease-in-out flex-shrink-0"
                                    class:-rotate-180={isOpen}
                                    class:rotate-0={!isOpen}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                >
                                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </h4>

                        {#if isOpen}
                            <div
                                transition:slide={{ duration: 300, easing: quintOut }}
                                id="ethics-content-{point.id}"
                                class="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 sm:pt-3"
                            >
                                <div class="prose prose-sm sm:prose-base prose-invert max-w-none
                                            prose-p:text-slate-300 prose-p:leading-relaxed
                                            prose-strong:text-purple-300 <!-- Color de strong ajustado al tema de la sección -->
                                            prose-em:text-slate-300
                                            prose-code:bg-slate-700 prose-code:text-amber-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono">
                                    {@html point.content}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>


        <footer class="text-center mt-16 sm:mb-24 pb-8" in:fly|global={{ y: 50, duration: 500, delay:600 }}>
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>

    <ImageModal imageUrl={enlargedImageUrl} altText={enlargedImageAlt} on:close={closeImageModal} />
</div>

<style>
    h1 /*de A.I. Nexus*/ {
        text-shadow: 0 0 10px var(--color-sky-400); /* Color de acento del planeta */
    }

    /* Animaciones para el icono del planeta (Red Neuronal) */
    @keyframes node-pulse {
        0%, 100% { opacity: 0.6; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    @keyframes line-draw {
        to { stroke-dashoffset: 100; } /* Asume que stroke-dasharray es lo suficientemente grande */
    }
    /* Ya tienes spin-reverse y pulse-slow, así que no las repito si son las mismas */
</style>