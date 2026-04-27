import { BaseRenderStrategy } from './BaseRenderStrategy.js';

const DEFAULT_SEPARATORS = ['+', '-', ',', ':', ';', ' ', '(', '.', ')'];

export class SeparatorAwareRenderer extends BaseRenderStrategy {
    constructor(separators = DEFAULT_SEPARATORS) {
        super();
        this.separators = new Set(separators);
    }

    isSeparator(ch) {
        return this.separators.has(ch);
    }

    update(mask, formatted) {
        let typed = '';
        let remaining = '';

        let formattedIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i];
            const formattedChar = formatted[formattedIndex];

            if (this.isSeparator(maskChar)) {
                if (formattedChar === maskChar) {
                    typed += maskChar;
                    formattedIndex++;
                } else {
                    remaining += maskChar;
                }

                continue;
            }

            if (formattedIndex < formatted.length) {
                typed += formattedChar;
                formattedIndex++;
            } else {
                remaining += maskChar;
            }
        }

        return { typed, remaining };
    }
}