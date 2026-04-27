/**
 * Форматирует введённые символы (value) по маске (mask).
 * 
 * Правила:
 * - Слоты маски определяются фильтром (filter.isMaskSlot)
 * - Разделители появляются только если после них есть заполняемые слоты
 * - Закрывающая скобка ")" появляется сразу, как только заполнены все слоты внутри скобок
 * 
 * @param {string} value - введённые символы (уже отфильтрованные)
 * @param {string} mask - маска, например "+7 (###) ###-##-##"
 * @param {Object} filter - объект с методом isMaskSlot(ch)
 * @returns {string} отформатированная строка
 */
export function formatByMask(value, mask, filter) {
    const result = [];
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
        const ch = mask[i];
        const isSlot = filter.isMaskSlot(ch);

        if (isSlot) {
            if (valueIndex < value.length) {
                result.push(value[valueIndex++]);
            } else {
                break;
            }
        } else {
            if (value.length === 0) continue;

            // Проверка: есть ли впереди ещё слоты, которые будут заполнены
            let hasUpcomingSlot = false;
            let slotCount = 0;

            for (let j = i + 1; j < mask.length; j++) {
                if (filter.isMaskSlot(mask[j])) {
                    slotCount++;
                    if (valueIndex + slotCount <= value.length) {
                        hasUpcomingSlot = true;
                        break;
                    }
                }
            }

            // Специальная логика для закрывающей скобки
            if (ch === ')') {
                let slotsInside = 0;
                for (let k = i - 1; k >= 0; k--) {
                    if (mask[k] === '(') break;
                    if (filter.isMaskSlot(mask[k])) {
                        slotsInside++;
                    }
                }

                if (valueIndex >= slotsInside) {
                    result.push(ch);
                }
            } else {
                if (hasUpcomingSlot) {
                    result.push(ch);
                }
            }
        }
    }

    return result.join('');
}