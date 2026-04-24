import { InputController } from './core/InputController.js';
import { GhostRenderer } from './ui/GhostRenderer.js';

/**
 * Автоматически находит все инпуты с классом `.ghost-mask-input`
 * и инициализирует маску + рендерер.
 *
 * Требования к HTML-структуре:
 * .input-container
 *   ├── input.ghost-mask-input
 *   └── .mask-placeholder
 *         ├── .ghost-typed
 *         └── .ghost-remaining
 */
export function initGhostMask(root = document) {
    const inputs = root.querySelectorAll('.ghost-mask-input');

    inputs.forEach((input) => {
        const container = input.closest('.input-container');
        if (!container) return;

        const typed = container.querySelector('.ghost-typed');
        const remaining = container.querySelector('.ghost-remaining');

        if (!typed || !remaining) return;

        const mask = input.dataset.mask;
        const initial = input.dataset.initial;
        const country = input.dataset.country || null;
        if (!mask) return;

        const renderer = new GhostRenderer(mask, typed, remaining);

        const handler = new InputController(input, {
            mask,
            renderer
        })

        // 👉 добавляем начальное значение (если есть)
        if (initial) {
            handler.setDigits(initial);
        }
    });
}

/**
 * Авто-старт при загрузке DOM
 */
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initGhostMask();
    });
}