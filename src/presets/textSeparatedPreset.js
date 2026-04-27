import { AlphaNumericSpaceFilter } from '../filters/AlphaNumericSpaceFilter.js';
import { SeparatorAwareRenderer } from '../renderers/SeparatorAwareRenderer.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createTextSeparatedPreset = createPreset({
    filter: new AlphaNumericSpaceFilter(),

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new SeparatorAwareRenderer()
        )
});