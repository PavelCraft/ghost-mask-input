export class BaseFilter {
    filter(str) {
        return str;
    }

    allowChar(ch) {
        return true;
    }

    isValidChar(ch) {
        return true;
    }

    isMaskSlot(ch) {
        return true;
    }
}