export class AlphaNumericFilter {
    isValidChar(char) {
        return /^[a-zA-Z0-9]$/.test(char);
    }

    filter(value) {
        return value.replace(/[^a-zA-Z0-9]/g, '');
    }

    isMaskSlot(char) {
        return /[a-zA-Z0-9]/.test(char);
    }

    allowChar(ch) {
        return /^[a-zA-Z0-9]$/.test(ch);
    }
}