import { DigitFilter } from '../filters/DigitFilter.js';
import { SeparatorAwareRenderer } from '../renderers/SeparatorAwareRenderer.js';
import { GhostRenderer } from '../ui/GhostRenderer.js';
import { createPreset } from './createPreset.js';

export const createNumericSeparatedPreset = createPreset({
    filter: new DigitFilter(),

    rendererFactory: (options) =>
        new GhostRenderer(
            options.mask,
            options.typedEl,
            options.remainingEl,
            new SeparatorAwareRenderer()
        )
});