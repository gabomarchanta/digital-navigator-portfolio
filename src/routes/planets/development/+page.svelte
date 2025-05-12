<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import KeenSlider from 'keen-slider';
    import type { KeenSliderInstance } from 'keen-slider';
    import 'keen-slider/keen-slider.min.css';
    import { onMount, onDestroy } from 'svelte';
    import PhilosophyPoint from '$lib/components/planet-development/PhilosophyPoint.svelte';
    import CodeBlock from '$lib/components/planet-development/CodeBlock.svelte';
    import type { LanguageType } from 'svelte-highlight/languages';

    interface Tool {
    name: string;
    description: string;
    logo: string;
    alt: string;
}

interface Slide {
    id: number; // Para la key en el #each
    title?: string;
    tools: Tool[];
}

// Define tus herramientas individuales primero
const allTools: { [key: string]: Tool } = {
    svelte: { name: 'Svelte & SvelteKit', description: 'Compiler-first, exceptional DX.', logo: '/images/logos/svelte-logo.svg', alt: 'Svelte Logo' },
    typescript: { name: 'TypeScript', description: 'Strong typing, better scale.', logo: '/images/logos/typescript-logo.svg', alt: 'TypeScript Logo' },
    tailwind: { name: 'Tailwind CSS', description: 'Utility-first, rapid UI dev.', logo: '/images/logos/tailwindcss-logo.svg', alt: 'Tailwind CSS Logo' },
    vite: { name: 'Vite', description: 'Blazing fast build tool.', logo: '/images/logos/vite-logo.svg', alt: 'Vite Logo' },
    git: { name: 'Git & GitHub', description: 'Version control, collaboration.', logo: '/images/logos/git-logo.svg', alt: 'Git Logo' },
    figma: { name: 'Figma', description: 'Design to dev handoff.', logo: '/images/logos/figma-logo.svg', alt: 'Figma Logo' },
    nodejs: { name: 'Node.js', description: 'JavaScript runtime environment.', logo: '/images/logos/nodejs-logo.svg', alt: 'Node.js Logo' },
    docker: { name: 'Docker', description: 'Containerization platform.', logo: '/images/logos/docker-logo.svg', alt: 'Docker Logo' },
    jest: { name: 'Jest / Vitest', description: 'JavaScript Testing.', logo: '/images/logos/jest-logo.svg', alt: 'Jest Logo' },
    storybook: { name: 'Storybook', description: 'UI component workshop.', logo: '/images/logos/storybook-logo.svg', alt: 'Storybook Logo' },
    postman: { name: 'Postman', description: 'API testing.', logo: '/images/logos/postman-logo.svg', alt: 'Postman Logo' },
    webflow: { name: 'Webflow', description: 'Prototyping & No-code.', logo: '/images/logos/webflow-logo.svg', alt: 'Webflow Logo' },
    // ...Añade todas las herramientas que quieras referenciar
};

// Ahora define tus diapositivas, cada una con hasta 6 herramientas
const toolkitSlides: Slide[] = [
    {
        id: 1,
        title: 'Core Development & Design Stack',
        tools: [allTools.svelte, allTools.typescript, allTools.tailwind, allTools.vite, allTools.git, allTools.figma]
    },
    {
        id: 2,
        title: 'Backend & DevOps Essentials',
        tools: [allTools.nodejs, allTools.docker, allTools.jest, allTools.storybook, allTools.postman, allTools.svelte] // Svelte se repite
    },
    {
        id: 3,
        title: 'UI Prototyping & Testing',
        tools: [allTools.figma, allTools.webflow, allTools.tailwind, allTools.storybook] // Menos de 6 está bien
    },
    {
        id: 4,
        title: 'Modern JavaScript Ecosystem',
        tools: [allTools.svelte, allTools.typescript, allTools.vite, allTools.nodejs, allTools.jest]
    }
    // ...Añade más diapositivas según necesites
];

let sliderContainer: HTMLElement;
let keenSliderInstance: KeenSliderInstance | null = null;
let currentSlide = 0;

onMount(() => {
    if (sliderContainer) {
        keenSliderInstance = new KeenSlider(sliderContainer, {
            loop: false,
            slides: {
                perView: 1,
                spacing: 15,
            },
            initial: currentSlide, // Iniciar en el slide correcto
            slideChanged: (slider) => { // Evento para actualizar nuestro estado
                currentSlide = slider.track.details.rel;
                console.log('Slide changed to: ', currentSlide); // Para depurar
            },
        });
    }
});

onDestroy(() => {
    if (keenSliderInstance) {
       keenSliderInstance.destroy();
    }
});

// Funciones para botones (opcional, también puedes usar keenSliderInstance?.prev() directamente)
function prevSlide() {
    keenSliderInstance?.prev();
}
function nextSlide() {
    keenSliderInstance?.next();
}
function goToSlide(index: number) {
    keenSliderInstance?.moveToIdx(index);
}

const btnBase = "py-2 px-3 rounded-md font-semibold transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm";

//-- Define tus puntos de filosofía aquí --
interface PhilosophyPointData {
    id: string;
    title: string;
    description: string; // Puede ser HTML si necesitas <code /> tags, o procesarlo
    imageUrl: string; // Ruta a la imagen
    imageAlt: string;
}

const philosophyPoints: PhilosophyPointData[] = [
    {
        id: 'components',
        title: 'Component-Based Architecture',
        description: 'I firmly believe in building UIs with a component-based approach, particularly leveraging Svelte\'s powerful and elegant system. This means creating encapsulated, reusable pieces of UI and logic. Components receive data via <code>props</code>, communicate outwards using <code>dispatch</code> for events, and offer flexibility with <code>slots</code>. This not only makes a codebase cleaner and easier to navigate but also significantly boosts maintainability and scalability.',
        imageUrl: '/images/philosophy/components-arch.png', // Necesitarás estas imágenes
        imageAlt: 'Abstract representation of interconnected components'
    },
    {
        id: 'clean-code',
        title: 'Clean Code & Readability',
        description: '"Code is read far more often than it is written." This principle guides my coding style. I strive for clear, self-documenting code through consistent naming conventions, modular design with small, focused functions and components. Comments are used judiciously to explain the <em>why</em> behind complex logic, not just the <em>what</em>. The goal is a codebase that new team members (or my future self) can easily understand and contribute to.',
        imageUrl: '/images/philosophy/clean-code.png',
        imageAlt: 'Icon symbolizing clarity and well-structured code'
    },
    {
        id: 'state-management',
        title: 'Effective State Management',
        description: 'In Svelte, state management is often simpler. For local state, reactive declarations suffice. For cross-component communication, I utilize Svelte\'s built-in stores (<code>writable</code>, <code>readable</code>, <code>derived</code>) for shared state. The Context API is valuable for deep data passing without prop drilling.',
        imageUrl: '/images/philosophy/state-management.png',
        imageAlt: 'Diagram showing data flow for state management'
    },
    {
        id: 'performance',
        title: 'Performance by Default (and by Design)',
        description: 'Svelte\'s compiler provides a massive head start. Beyond that, I focus on efficient data handling, optimizing assets, and ensuring smooth animations using performant CSS properties like <code>transform</code> and <code>opacity</code>. Every millisecond counts.',
        imageUrl: '/images/philosophy/performance.png',
        imageAlt: 'Speedometer icon or graph showing performance boost'
    },
    {
        id: 'accessibility',
        title: 'Accessibility (A11y) First',
        description: 'Building inclusive applications is non-negotiable. This means semantic HTML, ARIA attributes, keyboard navigability, and sufficient color contrast. Testing with accessibility tools is integral to my process.',
        imageUrl: '/images/philosophy/accessibility.png',
        imageAlt: 'Icon representing accessibility features like a person in a wheelchair or braille'
    }
];


// --- SNIPPETS DE CÓDIGO ---
const rippleActionCode = `
// src/lib/actions/ripple.ts - A Svelte Action for Material-like Ripple Effects

// Optional parameters for customizing the ripple effect
interface RippleOptions {
    duration?: number;         // Animation duration in milliseconds
    color?: string;            // Color of the ripple (CSS color value)
    easing?: string;           // CSS easing function string (e.g., 'ease-out', 'linear')
}

export function ripple(node: HTMLElement, options?: RippleOptions) {
    // Default options for the ripple effect
    const defaultOptions: Required<RippleOptions> = {
        duration: 600,
        color: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white by default
        easing: 'linear',
    };

    // Merge default options with any user-provided options
    let currentOptions = { ...defaultOptions, ...options };

    function createRippleEffect(event: MouseEvent) {
        // Remove any existing ripple to prevent multiple ripples from one click sequence
        const existingRipple = node.querySelector('.ripple-effect-span');
        if (existingRipple) {
            existingRipple.remove();
        }

        const rippleEl = document.createElement('span');
        const rect = node.getBoundingClientRect(); // Get button's size and position

        // Calculate ripple size (diameter) and radius
        const diameter = Math.max(node.clientWidth, node.clientHeight);
        const radius = diameter / 2;

        // Set ripple element's dimensions and initial position
        rippleEl.style.width = rippleEl.style.height = \`\${diameter}px\`;
        // Position the ripple epicenter at the click location
        rippleEl.style.left = \`\${event.clientX - rect.left - radius}px\`;
        rippleEl.style.top = \`\${event.clientY - rect.top - radius}px\`;
        // Add class to apply CSS animation (defined globally in app.css)
        rippleEl.classList.add('ripple-effect-span');

        // Apply dynamic styles for the animation via CSS custom properties
        rippleEl.style.setProperty('--ripple-bg-color', currentOptions.color);
        rippleEl.style.setProperty('--ripple-duration', \`\${currentOptions.duration}ms\`);
        rippleEl.style.setProperty('--ripple-easing', currentOptions.easing);

        // The parent node (button) MUST have 'position: relative' and 'overflow: hidden'
        node.appendChild(rippleEl);

        // The .ripple-effect-span class in global CSS handles the animation
        // and 'animation-fill-mode: forwards;' ensures it stays at its end state (opacity: 0).
        // The next mousedown will clean up the previous one.
    }

    // Trigger ripple on 'mousedown' for a more immediate visual feedback
    node.addEventListener('mousedown', createRippleEffect);

    // Return an object with destroy and update methods for Svelte action lifecycle
    return {
        destroy() {
            // Clean up event listener when the element is unmounted
            node.removeEventListener('mousedown', createRippleEffect);
            // Remove any lingering ripple element
            const existingRipple = node.querySelector('.ripple-effect-span');
            if (existingRipple) {
                existingRipple.remove();
            }
        },
        update(newOptions?: RippleOptions) {
            // Update options if they are changed dynamically on the element
            currentOptions = { ...defaultOptions, ...newOptions };
        }
    };
}
`.trim();

const easingDemoCode = `
// src/lib/components/planet-animations/EasingDemo.svelte - Key Logic Extract

import { tweened } from 'svelte/motion';
// Import various easing functions from Svelte
import { quintOut, quintIn, elasticOut, linear /*, ...otherEasings */ } from 'svelte/easing';

// Define a list of available easing functions with descriptions
const easings = [
    { name: 'Linear', fn: linear, description: 'Constant speed, no acceleration or deceleration.' },
    { name: 'Quint Out', fn: quintOut, description: 'Starts fast, decelerates towards the end. Smooth.' },
    // ... more easing objects
];

let selectedEasing = easings[1]; // Default easing

// Create a 'tweened' store for the ball's X position.
// This store will smoothly animate its value from 0 to 1.
const ballPositionX = tweened(0, {
    duration: 1200,       // Animation duration in milliseconds
    easing: selectedEasing.fn // Initial easing function
});

// Function to trigger the ball animation with a selected easing
async function animateBall(easingDefinition: typeof easings[0]) {
    selectedEasing = easingDefinition; // Update the currently selected easing
    // Reset ball to start position (0) instantly
    await ballPositionX.set(0, { duration: 0 });
    // Animate ball to end position (1) using the new easing function
    await ballPositionX.set(1, { duration: 1200, easing: selectedEasing.fn });
}

// Function to generate SVG path data for the easing curve visualization
function getPathData(easingFn: (t: number) => number): string {
    let d = "M 0 100"; // Start path at bottom-left (SVG coordinates)
    const steps = 100; // Number of points to draw the curve

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;                // Normalized time (0 to 1)
        const easedT = easingFn(t);         // Eased progress (0 to 1)
        const x = i * (100 / steps);        // Scale x to fit 0-100 range
        const y = 100 - (easedT * 100);     // Scale y and invert for SVG (0,0 is top-left)
        d += \` L \${x.toFixed(2)} \${y.toFixed(2)}\`; // Add line segment to path
    }
    return d;
}

// Reactive variable to calculate the 'left' style for the ball
// Ensures the ball stays within the padded track
const trackPaddingRem = 0.5;
const ballDiameterRem = 1.5;
$: ballLeftStyle = \`calc(\${trackPaddingRem}rem + \${$ballPositionX} * (100% - \${2 * trackPaddingRem + ballDiameterRem}rem))\`;

// The HTML part uses $ballPositionX to update the ball's 'left' style
// and getPathData() to draw the SVG curve dynamically.
`.trim();

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
                    src="/images/planets/planet-development.svg"
                    alt="Structura Nebula Planet Icon"
                    class="w-full h-full transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-110"
                    in:fade={{ duration: 600, delay: 100, easing: quintOut }}
                />
                <!-- Efecto visual adicional para el icono (opcional, como nodos o líneas de código abstractas) -->
                <div class="absolute inset-1 animate-pulse-slow opacity-50">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                        <circle cx="50" cy="50" r="40" stroke="var(--color-purple-500, #a855f7)" stroke-width="1.5" fill="none" stroke-dasharray="5 5" />
                        <circle cx="50" cy="50" r="30" stroke="var(--color-sky-500, #0ea5e9)" stroke-width="1" fill="none" stroke-dasharray="3 3"  style="animation: spin-reverse 30s linear infinite; transform-origin: center;"/>
                    </svg>
                </div>
            </div>

            <h1 class="text-4xl sm:text-5xl font-black text-purple-500 mb-4">
                Structura Nebula
            </h1>
            <p class="text-xl sm:text-2xl text-space-light-text max-w-2xl mx-auto">
                The Architecture of Digital Experience. Exploring the technologies and principles behind clean, efficient, and scalable frontend systems.
            </p>
        </header>

        <!-- Sección 2: My Digital Toolkit -->
        <section
                id="toolkit"
                class="mb-16 sm:mb-24"
                in:fly={{ y: 50, duration: 600, delay: 300, easing: quintOut }}
            >
                <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-purple-500/30 pb-3">
                    I. My Digital <span class="text-purple-500">Toolkit</span>
                </h2>

                <div>
                    
                    <div bind:this={sliderContainer} class="keen-slider mb-3 relative group">
                        {#each toolkitSlides as slide (slide.id)}
                            <div class="keen-slider__slide p-1">
                                {#if slide.title}
                                    <h4 class="text-md sm:text-lg font-semibold text-purple-400 mb-3 text-center h-[1.875rem] flex items-center justify-center">
                                       {slide.title}
                                    </h4>
                                {/if}
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {#each slide.tools as tool (tool.name)}
                                        <div class="bg-slate-800/70 p-4 sm:p-5 rounded-lg shadow-lg
                                                    flex flex-col items-center justify-start text-center
                                                    min-h-[160px] sm:min-h-[180px] border border-slate-700
                                                    hover:border-purple-500/50 transition-colors duration-200">
                                            <img src={tool.logo} alt={tool.alt} class="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 object-contain" />
                                            <h3 class="font-semibold text-slate-100 text-sm sm:text-base mb-1 leading-tight">{tool.name}</h3>
                                            <p class="text-xs text-slate-400 leading-snug">{tool.description}</p>
                                        </div>
                                    {/each}
                                    {#if slide.tools.length < 6 && slide.tools.length > 0 && (slide.tools.length % (typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3) !== 0) }
                                        {#each Array( (typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3) - (slide.tools.length % (typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3)) ) as _}
                                            <div class="opacity-0 pointer-events-none min-h-[160px] sm:min-h-[180px]"></div>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                        {/each}
                        
                        {#if keenSliderInstance && keenSliderInstance.track.details && keenSliderInstance.track.details.slides.length > 1}
                           <button
                               on:click={() => keenSliderInstance?.prev()}
                               disabled={currentSlide === 0}
                               class="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 p-2
                                      bg-slate-700/50 hover:bg-slate-600 rounded-full text-white
                                      disabled:opacity-0 disabled:cursor-not-allowed
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                               style="top: calc(2.625rem + 11.25rem + 0.5rem);"
                               aria-label="Previous slide"
                           >
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" /></svg>
                           </button>
                           <button
                               on:click={() => keenSliderInstance?.next()}
                               disabled={currentSlide === keenSliderInstance.track.details.slides.length - 1}
                               class="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 p-2
                                      bg-slate-700/50 hover:bg-slate-600 rounded-full text-white
                                      disabled:opacity-0 disabled:cursor-not-allowed
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                               style="top: calc(2.625rem + 11.25rem + 0.5rem);"
                               aria-label="Next slide"
                           >
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
                           </button>
                       {/if}
                    </div>
                    
                    {#if keenSliderInstance && keenSliderInstance.track.details && keenSliderInstance.track.details.slides.length > 1}
                       <div class="flex justify-center gap-2 mt-4 sm:mt-6">
                           {#each keenSliderInstance.track.details.slides as slideRef, i (slideRef.abs)}
                               <button
                                   on:click={() => keenSliderInstance?.moveToIdx(i)}
                                   class="w-2.5 h-2.5 rounded-full transition-all duration-200 ease-out focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:ring-offset-1 focus:ring-offset-space-darkest"
                                   class:bg-purple-500={currentSlide === i}
                                   class:scale-125={currentSlide === i}
                                   class:opacity-100={currentSlide === i}
                                   class:bg-slate-600={currentSlide !== i}
                                   class:opacity-50={currentSlide !== i}
                                   class:hover:bg-slate-500={currentSlide !== i}
                                   class:hover:opacity-75={currentSlide !== i}
                                   aria-label="Go to slide {i + 1}"
                               ></button>
                           {/each}
                       </div>
                   {/if}
                </div>

                <p class="text-xs text-slate-400 mt-8 text-center">
                    Scroll or swipe to explore more tools I leverage for building robust and delightful web experiences.
                </p>
        </section>

        <!-- Sección II: Code Philosophy & Architectural Principles -->
        <section
            id="code-philosophy"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 400, easing: quintOut }}
        >
             <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-sky-500/30 pb-3">
                II. Code Philosophy <span class="text-sky-500">& Principles</span>
            </h2>

            <div class="divide-y divide-slate-700/50">
                {#each philosophyPoints as point, i (point.id)}
                    <PhilosophyPoint point={point} index={i} delay={100 + i * 150} />
                {/each}
            </div>
        </section>

        <!-- Sección III: Portfolio Deconstructed -->
        <section
            id="portfolio-deconstructed"
            class="mb-16 sm:mb-24"
            in:fly={{ y: 50, duration: 600, delay: 500, easing: quintOut }}
        >
            <h2 class="text-3xl sm:text-4xl font-bold text-slate-100 mb-10 text-center sm:text-left border-b-2 border-emerald-500/30 pb-3">
                III. Portfolio <span class="text-emerald-500">Deconstructed</span>
            </h2>

            <div class="space-y-12">
                <!-- Snippet 1: Ripple Action -->
                <div class="prose prose-sm sm:prose-base prose-invert max-w-none prose-code:text-xs">
                    <h3 class="text-xl sm:text-2xl text-slate-100 font-semibold">Reusable Ripple Effect (Svelte Action)</h3>
                    <p class="text-slate-300">
                        To provide consistent click feedback across interactive elements like buttons, I created a Svelte Action.
                        This encapsulates the logic for generating and animating a ripple effect directly on the DOM element it's applied to.
                        It uses CSS custom properties for theming and cleans up after itself.
                    </p>
                    <CodeBlock code={rippleActionCode} language={"typescript" as unknown as LanguageType<string>} title="sSvelte Action: Ripple Effect (ripple.ts)" />
                    <p class="text-xs text-slate-400 mt-2">Key features: dynamic ripple creation, CSS-driven animation, cleanup on destroy.</p>
                </div>

                <!-- Snippet 2: Easing Demo Logic -->
                <div class="prose prose-sm sm:prose-base prose-invert max-w-none prose-code:text-xs">
                    <h3 class="text-xl sm:text-2xl text-slate-100 font-semibold mt-8">Interactive Easing Demonstration</h3>
                    <p class="text-slate-300">
                        This snippet from the "Motion Core" planet shows how Svelte's <code class="font-mono">tweened</code> store and easing functions
                        are used to animate an element's position. The <code class="font-mono">getPathData</code> function dynamically generates
                        an SVG path to visualize the selected easing curve.
                    </p>
                    <CodeBlock code={easingDemoCode} language={"typescript" as unknown as LanguageType<string>} title="EasingDemo.svelte <script> (Key Logic)" />
                     <p class="text-xs text-slate-400 mt-2">Highlights: reactive stores for animation, dynamic SVG generation.</p>
                </div>

                <!-- Añade más snippets y explicaciones aquí -->

            </div>
        </section>


        <footer class="text-center mt-16 sm:mt-24 pb-8" in:fly={{ y: 50, duration: 500, delay:600 }}>
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>
</div>

<style>
    h1 /*de Structura Nebula*/ {
        text-shadow: 0 0 10px var(--color-purple-500); /* Usando el color del planeta */
    }

    @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    .animate-pulse-slow {
        animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
     /* Puedes añadir la animación 'pulse' si Tailwind no la incluye por defecto o quieres personalizarla */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
    }
</style>