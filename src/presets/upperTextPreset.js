import { BaseFilter } from '../filters/BaseFilter.js';
import { RawRenderStrategy } from '../renderers/RawRenderStrategy.js';
import { upperTransformer } from '../transformers/UpperCaseTransformer.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createUpperTextPreset = createPreset({
    filter: new BaseFilter(),

    transformer: upperTransformer,

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new RawRenderStrategy()
        )
});