import { BaseFilter } from '../filters/BaseFilter.js';
import { RawRenderStrategy } from '../renderers/RawRenderStrategy.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createTextPreset = createPreset({
    filter: new BaseFilter(),

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new RawRenderStrategy()
        )
});