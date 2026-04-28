/**
 * Форматирует raw-значение по маске.
 *
 * Поддерживает:
 * - separator'ы в маске
 * - ambiguous separator (первый separator на позиции маски считается масочным)
 * - repeated separators
 * - auto-closing bracket ')'
 * - mapping raw <-> formatted для cursor management
 */
export class MaskFormatter {
    /**
     * @param {string} mask
     * @param {Object} filter
     * @param {Object} [options]
     * @param {string[]} [options.separators]
     * @param {boolean} [options.autoCloseBracket=true]
     */
    constructor(mask, filter, options = {}) {
        this.mask = mask;
        this.filter = filter;

        this.separators = new Set(
            options.separators ?? ['+', '-', ',', ':', ';', ' ', '(', '.', ')']
        );

        this.autoCloseBracket = options.autoCloseBracket ?? true;
    }

    /**
     * Форматирует raw строку в formatted.
     *
     * @param {string} rawValue
     * @returns {{
     *   raw: string,
     *   formatted: string,
     *   rawToFormatted: number[],
     *   formattedToRaw: (number|null)[]
     * }}
     */
    format(rawValue) {
        const raw = [...rawValue];

        let formatted = '';
        const rawToFormatted = [];
        const formattedToRaw = [];

        let rawIndex = 0;

        const sepCounters = {};
        for (const sep of this.separators) {
            sepCounters[sep] = 0;
        }

        for (let maskIndex = 0; maskIndex < this.mask.length; maskIndex++) {
            const maskChar = this.mask[maskIndex];
            const isSlot = this.filter.isMaskSlot(maskChar);

            if (isSlot) {
                if (rawIndex >= raw.length) break;

                formatted += raw[rawIndex];

                rawToFormatted[rawIndex] = formatted.length - 1;
                formattedToRaw[formatted.length - 1] = rawIndex;

                for (const sep in sepCounters) {
                    sepCounters[sep] = 0;
                }

                rawIndex++;
                continue;
            }

            if (this.autoCloseBracket && maskChar === ')') {
                if (this._shouldAutoCloseBracket(maskIndex, rawIndex)) {
                    formatted += ')';
                    formattedToRaw[formatted.length - 1] = null;
                    continue;
                }

                break;
            }

            if (rawIndex >= raw.length) break;

            const currentRaw = raw[rawIndex];

            if (
                this.separators.has(maskChar) &&
                currentRaw === maskChar
            ) {
                sepCounters[maskChar]++;

                if (sepCounters[maskChar] === 1) {
                    formatted += maskChar;
                    formattedToRaw[formatted.length - 1] = rawIndex;

                    rawToFormatted[rawIndex] = formatted.length - 1;

                    rawIndex++;
                    continue;
                }
            } else {
                sepCounters[maskChar] = 0;
            }

            if (this._hasUpcomingFillables(maskIndex, raw.length, rawIndex)) {
                formatted += maskChar;
                formattedToRaw[formatted.length - 1] = null;
                continue;
            }

            break;
        }

        return {
            raw: rawValue,
            formatted,
            rawToFormatted,
            formattedToRaw
        };
    }

    /**
     * Проверяет, есть ли дальше по маске ещё заполняемые слоты.
     *
     * @param {number} maskIndex
     * @param {number} rawLength
     * @param {number} rawIndex
     * @returns {boolean}
     */
    _hasUpcomingFillables(maskIndex, rawLength, rawIndex) {
        let remainingSlots = 0;

        for (let i = maskIndex + 1; i < this.mask.length; i++) {
            if (this.filter.isMaskSlot(this.mask[i])) {
                remainingSlots++;
            }
        }

        return rawLength > rawIndex && remainingSlots > 0;
    }

    /**
     * Проверяет, нужно ли автозакрыть ')'
     * после заполнения всех slot'ов внутри скобок.
     *
     * @param {number} maskIndex
     * @param {number} rawIndex
     * @returns {boolean}
     */
    _shouldAutoCloseBracket(maskIndex, rawIndex) {
        let slotsInside = 0;

        for (let i = maskIndex - 1; i >= 0; i--) {
            if (this.mask[i] === '(') break;

            if (this.filter.isMaskSlot(this.mask[i])) {
                slotsInside++;
            }
        }

        return rawIndex >= slotsInside;
    }

    /**
     * Конвертирует позицию курсора formatted -> raw index.
     *
     * @param {number} pos
     * @param {Object} mapping
     * @returns {number}
     */
    formattedPosToRawIndex(pos, mapping) {
        if (pos <= 0) return 0;

        if (pos >= mapping.formatted.length) {
            return mapping.rawToFormatted.length;
        }

        for (let i = pos - 1; i >= 0; i--) {
            const rawIndex = mapping.formattedToRaw[i];

            if (rawIndex !== null && rawIndex !== undefined) {
                return rawIndex + 1;
            }
        }

        return 0;
    }

    /**
     * Конвертирует raw index -> позицию курсора в formatted.
     *
     * @param {number} rawIndex
     * @param {Object} mapping
     * @returns {number}
     */
    rawIndexToFormattedPos(rawIndex, mapping) {
        if (rawIndex <= 0) return 0;

        if (rawIndex - 1 >= mapping.rawToFormatted.length) {
            return mapping.formatted.length;
        }

        return mapping.rawToFormatted[rawIndex - 1] + 1;
    }
}