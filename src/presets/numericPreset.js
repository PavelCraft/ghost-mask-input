import { DigitFilter } from '../filters/DigitFilter.js';
import { RawRenderStrategy } from '../renderers/RawRenderStrategy.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createNumericPreset = createPreset({
    filter: new DigitFilter(),

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new RawRenderStrategy()
        )
});