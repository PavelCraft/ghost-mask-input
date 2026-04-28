// auto-init.js
export async function initGhostMask(root = document) {
    // Динамический импорт внутри функции
    const {
        createAlnumPreset,
        createAlnumSeparatedPreset,
        createLowerTextPreset,
        createNumericSeparatedPreset,
        createTextPreset,
        createTextSeparatedPreset,
        createUpperTextPreset
    } = await import('./index.js');

    const PRESETS = {
        'numeric-separated': createNumericSeparatedPreset,
        'text': createTextPreset,
        'alnum': createAlnumPreset,
        'alnum-separated': createAlnumSeparatedPreset,
        'text-separated': createTextSeparatedPreset,
        'upper-text': createUpperTextPreset,
        'lower-text': createLowerTextPreset
    };

    const inputs = root.querySelectorAll('.ghost-mask-input');

    inputs.forEach((input) => {
        const presetName = input.dataset.preset;
        if (!presetName) return;

        const presetFactory = PRESETS[presetName];

        if (!presetFactory) {
            throw new Error(`Unknown preset: ${presetName}`);
        }

        const container = input.closest('.input-container');
        if (!container) return;

        const typedEl = container.querySelector('.ghost-typed');
        const remainingEl = container.querySelector('.ghost-remaining');

        if (!typedEl || !remainingEl) return;

        const mask = input.dataset.mask;
        const initial = input.dataset.initial;

        const controller = presetFactory(input, {
            mask,
            typedEl,
            remainingEl
        });

        if (initial) {
            controller.setValue(initial);
        }
    });
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        await initGhostMask();
    });
}