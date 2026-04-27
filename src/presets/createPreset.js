import { InputController } from '../controller/InputController.js';

export function createPreset(baseConfig) {
    return function initPreset(inputElement, options = {}) {
        const config = {
            ...baseConfig,
            ...options
        };

        const renderer = config.rendererFactory(config);

        return new InputController(inputElement, {
            mask: config.mask,
            filter: config.filter,
            transformer: config.transformer,
            renderer
        });
    };
}