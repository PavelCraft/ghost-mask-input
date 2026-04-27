/**
 * Базовый фильтр:
 * пропускает любые символы.
 * Используется для свободного текстового ввода.
 */
export class BaseFilter {
    isValidChar() {
        return true;
    }

    filter(value) {
        return value ?? '';
    }

    isMaskSlot(char) {
        return /[A-Za-zА-Яа-яЁё0-9]/u.test(char);
    }

    allowChar() {
        return true;
    }
}