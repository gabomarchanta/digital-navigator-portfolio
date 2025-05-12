<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    interface BaseListItem {
        id: number;
        text: string;
    }

    export let item: BaseListItem;
    // export let index: number; // <<-- ELIMINAR ESTA LÍNEA
    export let show: boolean = false;
</script>

{#if show}
    <li
        class="bg-slate-700/50 p-2 rounded text-slate-300 text-sm flex items-center"
        in:fly={{ x: -30, duration: 350, easing: quintOut }}
        out:fly={{ x: 30, duration: 250, easing: quintOut }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 mr-2 text-brand-cyan flex-shrink-0">
            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.03-10.28a.75.75 0 0 0-1.06-1.06L6.22 7.47l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.28-4.28Z" />
        </svg>
        {item.text}
    </li>
{/if}