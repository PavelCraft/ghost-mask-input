export class AlphaNumericSpaceFilter {
    isValidChar(char) {
        return /^[a-zA-Zа-яА-ЯёЁ0-9 ]$/u.test(char);
    }

    filter(value) {
        return value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9 ]/gu, '');
    }

    isMaskSlot(char) {
        return /[a-zA-Zа-яА-ЯёЁ0-9]/u.test(char);
    }

    allowChar(ch) {
        return /^[a-zA-Z0-9 ]$/.test(ch);
    }
}