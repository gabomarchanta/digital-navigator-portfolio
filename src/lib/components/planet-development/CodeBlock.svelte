<!-- src/lib/components/planet-development/CodeBlock.svelte -->
<script lang="ts">
    import { Highlight, HighlightAuto } from 'svelte-highlight';
    // Importa los módulos de lenguaje de highlight.js
    // Estos son objetos/funciones que definen el lenguaje para highlight.js
    import hljs_typescript from 'highlight.js/lib/languages/typescript';
    import hljs_xml from 'highlight.js/lib/languages/xml'; // Para HTML, Svelte
    import hljs_css from 'highlight.js/lib/languages/css';
    import hljs_bash from 'highlight.js/lib/languages/bash';
    // Si quieres un resaltado específico para Svelte que no sea solo XML:
    // import hljs_svelte from 'svelte-highlight/languages/svelte'; // Si esta ruta existe y exporta un módulo compatible

    export let code: string;
    // El prop 'languageKey' será nuestro string identificador
    export let languageKey: 'typescript' | 'svelte' | 'html' | 'css' | 'bash' | 'auto' = 'auto';
    export let title: string | undefined = undefined;

    // Mapeo de nuestra 'languageKey' al módulo de highlight.js importado
    const langModuleMap = {
        typescript: hljs_typescript,
        // Si usas el lenguaje svelte específico de svelte-highlight, asegúrate de importarlo:
        // svelte: hljs_svelte,
        // Si no, xml es un buen fallback para la estructura de Svelte:
        svelte: hljs_xml,
        html: hljs_xml,
        css: hljs_css,
        bash: hljs_bash
    };

    // Determina el módulo de lenguaje a usar para el prop 'lang' de Highlight
    $: langModuleForHighlight = languageKey !== 'auto' ? langModuleMap[languageKey] : undefined;

</script>

<div class="my-6 rounded-lg overflow-hidden shadow-lg bg-[#282c34] border border-slate-700 text-left">
    {#if title}
        <div class="bg-slate-700/50 px-4 py-2 text-xs text-slate-300 font-mono border-b border-slate-600">
            {title}
        </div>
    {/if}

    {#if langModuleForHighlight}
        <!-- CORRECTO: Pasa el MÓDULO de lenguaje al prop 'lang' del componente Highlight -->
        <Highlight lang={langModuleForHighlight} code={code} />
    {:else}
        <!-- Si no hay módulo específico (o languageKey es 'auto'), usa HighlightAuto -->
        <HighlightAuto code={code} />
    {/if}
</div>

<style>
    :global(pre code.hljs) {
        padding: 1rem !important;
        font-size: 0.875rem; /* text-sm */
        line-height: 1.6;
        background: transparent !important;
    }
    :global(.hljs-comment) {
        font-style: italic;
    }
    :global(pre.hljs) {
        background: transparent !important;
        margin: 0;
    }
</style>