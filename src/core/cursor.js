/**
 * Логика работы курсора.
 * 
 * Ключевая идея:
 * курсор измеряется в "количестве цифр", а не символов.
 */

/**
 * Сколько цифр до курсора
 */
export function getDigitCountBeforeCursor(formatted, cursorPos) {
    let count = 0;
    for (let i = 0; i < Math.min(cursorPos, formatted.length); i++) {
        if (formatted[i] >= '0' && formatted[i] <= '9') count++;
    }
    return count;
}

/**
 * Позиция курсора по индексу цифры
 */
export function getDigitPositionInFormatted(formatted, digitIndex) {
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] >= '0' && formatted[i] <= '9') {
            if (count === digitIndex) return i;
            count++;
        }
    }
    return formatted.length;
}

/**
 * Сколько цифр внутри выделения
 */
export function getDigitCountInSelection(formatted, start, end) {
    let count = 0;
    for (let i = start; i < end; i++) {
        if (formatted[i] >= '0' && formatted[i] <= '9') count++;
    }
    return count;
}