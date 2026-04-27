import { BaseRenderStrategy } from './BaseRenderStrategy.js';

/**
 * Показывает реально введённую formatted-часть,
 * а remaining берёт из хвоста mask.
 */
export class SeparatorAwareRenderer extends BaseRenderStrategy {
    update(mask, formatted) {
        const maskChars = [...mask];
        const formattedChars = [...formatted];

        return {
            typed: formatted,
            remaining: maskChars
                .slice(formattedChars.length)
                .join('')
        };
    }
}