import { AlphaNumericFilter } from '../filters/AlphaNumericFilter.js';
import { RawRenderStrategy } from '../renderers/RawRenderStrategy.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createAlnumPreset = createPreset({
    filter: new AlphaNumericFilter(),

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new RawRenderStrategy()
        )
});