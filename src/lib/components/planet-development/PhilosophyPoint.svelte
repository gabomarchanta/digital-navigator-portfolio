<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    interface PointData {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        imageAlt: string;
    }

    export let point: PointData;
    export let index: number;
    export let delay: number = 0;

    const imageOnLeftLg = index % 2 === 0;
</script>

<div
    class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-6 lg:py-8"
    in:fly={{ y: 50, duration: 500, delay: delay, easing: quintOut }}
>
    <!-- Contenedor de Imagen -->
    <div class:lg:order-1={imageOnLeftLg} class:lg:order-2={!imageOnLeftLg}
         class="lg:w-5/12 xl:w-4/12 flex-shrink-0 flex justify-center lg:justify-start">
        <div class="bg-slate-800/40 p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-[300px] sm:max-w-[350px] aspect-square">
            <img
                src={point.imageUrl}
                alt={point.imageAlt}
                class="w-full h-full rounded-lg object-cover"
            />
        </div>
    </div>

    <!-- Contenedor de Texto -->
    <div class:lg:order-2={imageOnLeftLg} class:lg:order-1={!imageOnLeftLg}
         class="lg:w-7/12 xl:w-8/12 flex flex-col justify-center">
        <div class="prose prose-sm sm:prose-base prose-invert max-w-none
                    prose-headings:text-slate-100 prose-headings:font-semibold prose-headings:mb-3
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-a:text-sky-400 hover:prose-a:text-sky-300
                    prose-strong:text-slate-100 prose-em:text-slate-300
                    prose-code:bg-slate-700 prose-code:text-amber-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono">
            <h3 class="text-xl sm:text-2xl !mt-0">{point.title}</h3>
            {@html point.description}
        </div>
    </div>
</div>