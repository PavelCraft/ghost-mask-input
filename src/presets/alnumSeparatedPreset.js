import { AlphaNumericFilter } from '../filters/AlphaNumericFilter.js';
import { SeparatorAwareRenderer } from '../renderers/SeparatorAwareRenderer.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createAlnumSeparatedPreset = createPreset({
    filter: new AlphaNumericFilter(),

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new SeparatorAwareRenderer()
        )
});