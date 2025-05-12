interface RippleOptions {
    duration?: number;
    color?: string;
    easing?: string; // CSS easing function string
}

export function ripple(node: HTMLElement, options?: RippleOptions) {
    const defaultOptions: Required<RippleOptions> = {
        duration: 600,
        color: 'rgba(255, 255, 255, 0.3)',
        easing: 'linear',
    };

    let currentOptions = { ...defaultOptions, ...options };

    function createRippleEffect(event: MouseEvent) {
        const existingRipple = node.querySelector('.ripple-effect-span');
        if (existingRipple) {
            existingRipple.remove();
        }

        const rippleEl = document.createElement('span');
        const rect = node.getBoundingClientRect();
        const diameter = Math.max(node.clientWidth, node.clientHeight);
        const radius = diameter / 2;

        rippleEl.style.width = rippleEl.style.height = `${diameter}px`;
        rippleEl.style.left = `${event.clientX - rect.left - radius}px`;
        rippleEl.style.top = `${event.clientY - rect.top - radius}px`;
        rippleEl.classList.add('ripple-effect-span'); // Usaremos una clase para la animación

        // Aplicar color y duración de la animación desde las opciones
        rippleEl.style.setProperty('--ripple-bg-color', currentOptions.color);
        rippleEl.style.setProperty('--ripple-duration', `${currentOptions.duration}ms`);
        rippleEl.style.setProperty('--ripple-easing', currentOptions.easing);

        node.appendChild(rippleEl);

        // El ripple se auto-elimina por la animación CSS 'forwards' y luego el 'if (existingRipple)'
    }

    node.addEventListener('mousedown', createRippleEffect); // Usar mousedown para que se vea antes del 'click'

    return {
        destroy() {
            node.removeEventListener('mousedown', createRippleEffect);
            const existingRipple = node.querySelector('.ripple-effect-span');
            if (existingRipple) {
                existingRipple.remove();
            }
        },
        update(newOptions?: RippleOptions) {
            currentOptions = { ...defaultOptions, ...newOptions };
        }
    };
}