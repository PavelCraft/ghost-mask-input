/**
 * Набор чистых утилит для работы со строками и цифрами.
 * 
 * ВАЖНО:
 * - Не содержит побочных эффектов
 * - Не зависит от DOM
 * - Может переиспользоваться в любых масках (не только телефон)
 */

/**
 * Извлекает только цифры из строки
 * @param {string} str
 * @returns {string}
 */
export function extractDigits(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch >= '0' && ch <= '9') result += ch;
    }
    return result;
}

/**
 * Считает количество цифр в маске
 * @param {string} mask
 * @returns {number}
 */
export function getMaxDigitsInMask(mask) {
    let count = 0;
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] >= '0' && mask[i] <= '9') count++;
    }
    return count;
}