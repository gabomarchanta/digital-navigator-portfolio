// src/lib/actions/trapFocus.ts
export function trapFocus(node: HTMLElement) {
    const previousActiveElement = typeof document !== 'undefined' ? document.activeElement as HTMLElement : null;

    // Query para todos los elementos enfocables dentro del nodo
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    function handleKeydown(event: KeyboardEvent) {
        if (event.key !== 'Tab') return;

        const focusableElements = Array.from(node.querySelectorAll<HTMLElement>(focusableElementsString));
        if (focusableElements.length === 0) return;

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }

    // Mover el foco al primer elemento enfocable del modal al montarse (o al nodo mismo si no hay otros)
    // Usamos un pequeño timeout para asegurar que la transición de entrada del modal haya terminado
    // y los elementos sean realmente enfocables.
    setTimeout(() => {
        const focusableElements = Array.from(node.querySelectorAll<HTMLElement>(focusableElementsString));
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            node.focus(); // Enfoca el modal mismo si no hay nada más
        }
    }, 50); // Pequeño delay, ajusta si es necesario después de la transición del modal

    node.addEventListener('keydown', handleKeydown);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeydown);
            if (previousActiveElement) {
                previousActiveElement.focus(); // Devuelve el foco al elemento anterior cuando el modal se destruye
            }
        }
    };
}