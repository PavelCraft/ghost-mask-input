import { CyrillicAlphaNumericFilter } from '../filters/CyrillicAlphaNumericFilter.js';
import { RawRenderStrategy } from '../renderers/RawRenderStrategy.js';
import { upperTransformer } from '../transformers/UpperCaseTransformer.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createUpperTextPreset = createPreset({
    filter: new CyrillicAlphaNumericFilter(),

    transformer: upperTransformer,

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new RawRenderStrategy()
        )
});