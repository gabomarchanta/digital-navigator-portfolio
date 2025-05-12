<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import type { SvelteComponent } from 'svelte';

    // Iconos para los enlaces de contacto (¡reemplaza con los que elijas!)
    // Para LinkedIn y GitHub, es mejor usar sus logos SVG oficiales.
    // Para email, svelte-heros-v2 tiene Envelope.
    import Envelope from 'svelte-heros-v2/Envelope.svelte';
    // Para LinkedIn y GitHub, necesitarás componentes SVG o <img> con sus logos
    // Ejemplo de cómo podrías estructurar los datos:
    // import LinkedInLogo from '$lib/components/icons/LinkedInLogo.svelte';
    // import GitHubLogo from '$lib/components/icons/GitHubLogo.svelte';

    interface ContactLink {
        id: string;
        name: string;
        href: string;
        iconComponent?: typeof SvelteComponent; // Para svelte-heros o componentes SVG locales
        iconSvgPath?: string; // Para usar con <img> si tienes SVGs en /static
        ariaLabel: string;
        bgColorClass: string; // Color de fondo para el botón/link
        textColorClass: string;
        hoverBgColorClass: string;
    }

    const contactLinks: ContactLink[] = [
        {
            id: 'linkedin',
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/in/tu-perfil/', // ¡REEMPLAZA!
            // iconComponent: LinkedInLogo as unknown as typeof SvelteComponent, // Si tienes un componente
            iconSvgPath: '/images/logos/linkedin-logo-white.svg', // ¡CREA ESTE SVG BLANCO!
            ariaLabel: 'Connect with me on LinkedIn',
            bgColorClass: 'bg-sky-600',
            textColorClass: 'text-white',
            hoverBgColorClass: 'hover:bg-sky-700'
        },
        {
            id: 'github',
            name: 'GitHub',
            href: 'https://github.com/tu-usuario/', // ¡REEMPLAZA!
            iconSvgPath: '/images/logos/github-mark-white.svg', // ¡USA EL OCTOCAT BLANCO!
            ariaLabel: 'View my projects on GitHub',
            bgColorClass: 'bg-slate-700',
            textColorClass: 'text-white',
            hoverBgColorClass: 'hover:bg-slate-600'
        },
        {
            id: 'email',
            name: 'Email Me',
            href: 'mailto:gagmultimedia@gmail.com', // ¡REEMPLAZA!
            iconComponent: Envelope as unknown as typeof SvelteComponent,
            ariaLabel: 'Send me an email',
            bgColorClass: 'bg-emerald-500',
            textColorClass: 'text-white',
            hoverBgColorClass: 'hover:bg-emerald-600'
        },
        // Opcional: CV
        // {
        //     id: 'cv',
        //     name: 'Download CV',
        //     href: '/documents/tu-cv.pdf', // ¡COLOCA TU CV EN /static/documents/!
        //     iconComponent: DocumentArrowDown as unknown as typeof SvelteComponent, // de svelte-heros-v2
        //     ariaLabel: 'Download my Curriculum Vitae',
        //     bgColorClass: 'bg-purple-500',
        //     textColorClass: 'text-white',
        //     hoverBgColorClass: 'hover:bg-purple-600'
        // }
    ];

    // Estado para el feedback del formulario
    let formMessage = '';
    let formMessageType: 'success' | 'error' | '' = '';

    async function handleSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const response = await fetch("/", { // Netlify maneja el action="/" o la URL de la página actual
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData as any).toString(),
        });

        if (response.ok) {
            formMessage = "Signal received! Thanks for reaching out. I'll get back to you soon.";
            formMessageType = 'success';
            (event.target as HTMLFormElement).reset(); // Limpia el formulario
        } else {
            formMessage = "Transmission error. Please try again, or use one of the direct channels above.";
            formMessageType = 'error';
        }
        // Opcional: Limpiar el mensaje después de unos segundos
        setTimeout(() => {
            formMessage = '';
            formMessageType = '';
        }, 7000);
    }
</script>

<div class="min-h-screen bg-space-darkest text-space-lighter-text flex flex-col items-center p-4 sm:p-8 pt-16 sm:pt-24">
    <main class="w-full max-w-2xl mx-auto">

        <!-- 1. Encabezado del Planeta -->
        <header
            class="text-center mb-12 sm:mb-16"
            in:fly|global={{ y: -50, duration: 700, easing: quintOut }}
        >
            <!-- Icono Opcional del Planeta/Sección -->
            <div class="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 group">
                <!-- Ejemplo: podrías poner un icono de señal o antena aquí -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full text-sky-400 group-hover:text-sky-300 transition-colors duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 1.5c-.54 1.009-1.586 1.5-2.625 1.5H3.75M9 17.25v-1.007a3 3 0 00.375-1.5c.54-1.009 1.586-1.5 2.625-1.5h2.25c1.039 0 2.085.491 2.625 1.5a3 3 0 00.375 1.5v1.007M9 17.25v-6.044A3.375 3.375 0 006.75 8.25H5.25CRICUT® Maker™M4.5 8.25H3M9 17.25c0 .075.008.149.024.222M15 17.25v1.007a3 3 0 00.375 1.5c.54 1.009 1.586 1.5 2.625 1.5h2.25M15 17.25v-1.007a3 3 0 01-.375-1.5c-.54-1.009-1.586-1.5-2.625-1.5h-2.25c-1.039 0-2.085.491-2.625 1.5a3 3 0 01-.375 1.5v1.007M15 17.25c0 .075-.008.149-.024.222M4.5 12v-.75A.75.75 0 015.25 10.5h13.5a.75.75 0 01.75.75v.75m-15 3V12m15 3V12m-7.5-6v6" />
                </svg>
            </div>

            <h1 class="text-3xl sm:text-4xl font-black text-sky-400 mb-3">
                Signal Beacon
            </h1>
            <p class="text-lg sm:text-xl text-space-light-text max-w-xl mx-auto">
                Ready to connect or collaborate? Send your signal through one of these channels. I'm always open to new voyages and interesting conversations.
            </p>
        </header>

        <!-- Sección 2: Direct Transmission Lines -->
        <section
            id="direct-transmissions"
            class="mb-12 sm:mb-16"
            in:fly|global={{ y: 50, duration: 600, delay: 200, easing: quintOut }}
        >
            <h2 class="text-xl sm:text-2xl font-semibold text-slate-100 mb-6 text-center">
                Direct Transmission Lines
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {#each contactLinks as link (link.id)}
                    <a  href={link.href}
                        target="_blank" rel="noopener noreferrer"
                        class="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg
                               border border-slate-700
                               transform transition-all duration-200 ease-out
                               hover:scale-105 hover:shadow-xl {link.hoverBgColorClass} {link.bgColorClass} {link.textColorClass}
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space-darkest {link.bgColorClass.replace('bg-','focus:ring-')}"
                        aria-label={link.ariaLabel}
                    >
                        {#if link.iconComponent}
                            <svelte:component this={link.iconComponent} class="w-8 h-8 mb-2"/>
                        {:else if link.iconSvgPath}
                            <img src={link.iconSvgPath} alt="" class="w-8 h-8 mb-2" aria-hidden="true" />
                        {/if}
                        <span class="text-md font-medium">{link.name}</span>
                    </a>
                {/each}
            </div>
        </section>

        <!-- Sección 3: Message Uplink (Formulario de Contacto) -->
        <section
            id="message-uplink"
            class="mb-16 sm:mb-24"
            in:fly|global={{ y: 50, duration: 600, delay: 300, easing: quintOut }}
        >
             <h2 class="text-xl sm:text-2xl font-semibold text-slate-100 mb-6 text-center">
                Send a Message Uplink
            </h2>
             <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                on:submit|preventDefault={handleSubmit}
                class="bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-xl border border-slate-700 space-y-6"
            >
                <!-- Campo oculto para Netlify (nombre del formulario) -->
                <input type="hidden" name="form-name" value="contact" />

                <!-- Campo Honeypot (oculto para usuarios, para atrapar bots) -->
                <p class="hidden">
                    <label>
                        Don’t fill this out if you’re human: <input name="bot-field" />
                    </label>
                </p>

                <div>
                    <label for="name" class="block text-sm font-medium text-slate-300 mb-1">Your Callsign (Name)</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        class="w-full bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500 text-sm rounded-md px-3 py-2.5 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
                        placeholder="Cmdr. Jane Doe"
                    />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-slate-300 mb-1">Your Frequency (Email)</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        class="w-full bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500 text-sm rounded-md px-3 py-2.5 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
                        placeholder="navigator@starmail.system"
                    />
                </div>

                <div>
                    <label for="subject" class="block text-sm font-medium text-slate-300 mb-1">Subject (Optional)</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        class="w-full bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500 text-sm rounded-md px-3 py-2.5 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
                        placeholder="Regarding Project Constellation..."
                    />
                </div>

                <div>
                    <label for="message" class="block text-sm font-medium text-slate-300 mb-1">Your Transmission (Message)</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        required
                        class="w-full bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500 text-sm rounded-md px-3 py-2.5 focus:ring-sky-500 focus:border-sky-500 focus:outline-none"
                        placeholder="Type your message to the Navigator..."
                    ></textarea>
                </div>

                <div class="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
                    <button
                        type="submit"
                        class="w-full sm:w-auto py-2.5 px-6 rounded-md font-semibold text-sm shadow-md
                               bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800
                               transition-colors duration-150"
                    >
                        Transmit Signal
                    </button>
                    {#if formMessage}
                        <div class="text-xs text-center sm:text-right max-w-xs
                                    {formMessageType === 'success' ? 'text-emerald-400' : 'text-red-400'}"
                             in:fade={{duration: 200}}
                        >
                            {formMessage}
                        </div>
                    {/if}
                </div>
            </form>
        </section>

        <footer class="text-center mt-12 sm:mt-16 pb-8">
            <a href="/star-map" class="text-brand-pink hover:text-pink-400 transition-colors text-lg">
                ← Return to Star Map
            </a>
        </footer>
    </main>
</div>

<style>
    h1 /*de Signal Beacon*/ {
        text-shadow: 0 0 10px var(--color-sky-400);
    }
</style>