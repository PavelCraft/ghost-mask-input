import { CyrillicAlphaNumericFilter } from '../filters/CyrillicAlphaNumericFilter.js';
import { RawRenderStrategy } from '../renderers/RawRenderStrategy.js';
import { lowerTransformer } from '../transformers/LowerCaseTransformer.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createLowerTextPreset = createPreset({
    filter: new CyrillicAlphaNumericFilter(),

    transformer: lowerTransformer,

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new RawRenderStrategy()
        )
});