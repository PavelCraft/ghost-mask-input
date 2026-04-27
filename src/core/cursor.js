export function getCharCountBeforeCursor(str, pos, filter) {
    let count = 0;
    for (let i = 0; i < Math.min(pos, str.length); i++) {
        if (filter.isValidChar(str[i])) count++;
    }
    return count;
}

export function getCharPositionInFormatted(str, index, filter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (filter.isValidChar(str[i])) {
            if (count === index) return i;
            count++;
        }
    }
    return str.length;
}

export function getCharCountInSelection(str, start, end, filter) {
    let count = 0;
    for (let i = start; i < end; i++) {
        if (filter.isValidChar(str[i])) count++;
    }
    return count;
}