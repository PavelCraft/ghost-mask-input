import { BaseFilter } from './BaseFilter.js';

export class DigitFilter extends BaseFilter {
    filter(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            if (ch >= '0' && ch <= '9') result += ch;
        }
        return result;
    }

    allowChar(ch) {
        return /^\d$/.test(ch);
    }

    isValidChar(ch) {
        return ch >= '0' && ch <= '9';
    }

    isMaskSlot(ch) {
        return ch >= '0' && ch <= '9';
    }
}