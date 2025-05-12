<script lang="ts">
    import { fly } from 'svelte/transition';

    // Datos de ejemplo para las tarjetas
    const cardData = [
        {
            id: 1,
            imageUrl: '/images/cards/strategic-planning.png',
            altText: 'Business meeting discussion',
            category: 'Project Alpha',
            categoryColor: 'text-brand-cyan', // Usando tus colores de marca
            title: 'Strategic Planning Session',
            description: 'A deep dive into the next quarter\'s objectives, focusing on innovation and market expansion. Key stakeholders aligned on a new path forward.',
            authorName: 'Jane Navigator',
            authorRole: 'Lead Designer',
            authorAvatar: '/images/avatars/avatar-female-1.png' // Placeholder - crea esta imagen
        },
        {
            id: 2,
            imageUrl: '/images/cards/workflow-optimization.png',
            altText: 'Team working collaboratively',
            category: 'Workflow Optimization',
            categoryColor: 'text-brand-pink',
            title: 'New Agile Workflow Implemented',
            description: 'Successfully rolled out a new agile methodology across development teams, resulting in faster iteration cycles and improved collaboration.',
            authorName: 'John Coder',
            authorRole: 'Scrum Master',
            authorAvatar: '/images/avatars/avatar-male-1.png' // Placeholder - crea esta imagen
        }
    ];

    // Placeholder para avatares si no los tienes (usa un SVG simple o iniciales)
    // Crea la carpeta static/images/avatars/ y pon algunas imágenes de avatar allí.
    // Ej: avatar-female-1.png, avatar-male-1.png
</script>

<div class="bg-slate-800 p-6 rounded-lg shadow-xl">
    <h4 class="text-xl font-semibold text-emerald-400 mb-1">Cards</h4> <!-- Color de acento diferente para esta sección -->
    <p class="text-sm text-slate-400 mb-6">
        Flexible containers for displaying grouped content like articles, products, or profiles.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each cardData as card (card.id)}
            <div
                class="bg-slate-700/50 rounded-lg overflow-hidden shadow-md
                       transition-all duration-300 ease-in-out
                       hover:shadow-lg hover:shadow-slate-600/30 transform hover:-translate-y-1"
                in:fly={{ y: 30, duration: 400, delay: 100 * card.id }}
            >
                {#if card.imageUrl}
                    <img src={card.imageUrl} alt={card.altText} class="w-full h-48 object-cover">
                {/if}
                <div class="p-5">
                    <p class="text-xs font-semibold uppercase tracking-wider mb-1 {card.categoryColor}">
                        {card.category}
                    </p>
                    <h5 class="text-lg font-bold text-slate-100 mb-2 truncate" title={card.title}>
                        {card.title}
                    </h5>
                    <p class="text-sm text-slate-300 leading-relaxed h-20 overflow-hidden text-ellipsis">
                        {card.description}
                    </p>

                    <div class="mt-4 pt-4 border-t border-slate-600/70 flex justify-center">
                        <div class="flex items-center">
                            {#if card.authorAvatar}
                                <img src={card.authorAvatar} alt={`Avatar of ${card.authorName}`} class="w-8 h-8 rounded-full mr-3">
                            {:else}
                                <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-slate-400 text-xs font-semibold mr-3">
                                    {card.authorName.substring(0,1).toUpperCase()}
                                </div>
                            {/if}
                            <div>
                                <p class="text-sm font-semibold text-slate-200 text-left">{card.authorName}</p>
                                <p class="text-xs text-slate-400 text-left">{card.authorRole}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <p class="text-xs text-slate-500 mt-6 text-center">
        Cards can be adapted for various content types, featuring images, text, and author attribution.
    </p>
</div>

<!-- No se necesitan estilos específicos aquí si todo es con Tailwind -->
<style>
    /* Pequeño ajuste para el text-ellipsis en múltiples líneas (puede requerir más para compatibilidad total) */
    .h-20.overflow-hidden.text-ellipsis {
        display: -webkit-box;
        line-clamp: 3; /* Número de líneas a mostrar antes de truncar */
        -webkit-box-orient: vertical;
        /* text-overflow: ellipsis; /* Ya está en Tailwind */
    }
</style>