/**
 * Центральный слой логики.
 * 
 * НЕ работает с DOM напрямую.
 * Только:
 * - принимает текущее состояние
 * - возвращает новое состояние
 * 
 * Это позволит потом использовать:
 * - React
 * - Vue
 * - Django (через JS)
 */

import { formatByMask } from './format.js';
import { extractDigits, getMaxDigitsInMask } from './utils.js';

export class MaskEngine {
    constructor(mask) {
        this.mask = mask;
    }

    /**
     * Применяет изменения ввода
     * @param {string} formatted
     * @param {number} cursorPos
     * @returns {{formatted: string, cursor: number}}
     */
    apply(formatted, cursorPos) {
        const digits = extractDigits(formatted);
        const max = getMaxDigitsInMask(this.mask);
        const clean = digits.slice(0, max);

        const newFormatted = formatByMask(clean, this.mask);
        const digitIndex = getDigitCountBeforeCursor(formatted, cursorPos);
        const newCursor = getDigitPositionInFormatted(newFormatted, digitIndex);

        return {
            formatted: newFormatted,
            cursor: newCursor
        };
    }
}