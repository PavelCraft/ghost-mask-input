/**
 * Отвечает за преобразование "сырых цифр" → "отформатированная строка".
 * 
 * Это ядро всей логики маски.
 * 
 * Гарантии:
 * - Нет висящих разделителей
 * - Поддержка особого поведения для ")"
 * - Работает одинаково для любых масок
 */

/**
 * Форматирует цифры по маске
 * @param {string} digits
 * @param {string} mask
 * @returns {string}
 */
export function formatByMask(digits, mask) {
    const result = [];
    let digitIndex = 0;

    for (let i = 0; i < mask.length; i++) {
        const ch = mask[i];
        const isDigit = (ch >= '0' && ch <= '9');

        if (isDigit) {
            if (digitIndex < digits.length) {
                result.push(digits[digitIndex++]);
            } else {
                break;
            }
        } else {
            if (digits.length === 0) continue;

            // поиск будущих цифр
            let hasUpcomingFilledSlot = false;
            let upcomingDigitCount = 0;

            for (let j = i + 1; j < mask.length; j++) {
                if (mask[j] >= '0' && mask[j] <= '9') {
                    upcomingDigitCount++;
                    if (digitIndex + upcomingDigitCount <= digits.length) {
                        hasUpcomingFilledSlot = true;
                        break;
                    }
                }
            }

            // спец-логика для ")"
            if (ch === ')') {
                let digitsInside = 0;
                for (let k = i - 1; k >= 0; k--) {
                    if (mask[k] === '(') break;
                    if (mask[k] >= '0' && mask[k] <= '9') digitsInside++;
                }

                if (digitIndex >= digitsInside) {
                    result.push(ch);
                }
            } else {
                if (hasUpcomingFilledSlot) {
                    result.push(ch);
                }
            }
        }
    }

    return result.join('');
}