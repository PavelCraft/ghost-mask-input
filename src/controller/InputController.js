import {
    getCharCountBeforeCursor,
    getCharCountInSelection,
    getCharPositionInFormatted
} from '../core/cursor.js';

import { formatByMask } from '../core/format.js';

import { DigitFilter } from '../filters/DigitFilter.js';

export class InputController {
    constructor(inputElement, options = {}) {
        this.inputElement = inputElement;
        this.mask = options.mask;
        this.renderer = options.renderer;
        this.country = options.country || null;

        // 👉 фильтр (по умолчанию цифры)
        this.filter = options.filter || new DigitFilter();

        this.lastValue = "";
        this.lastFormatted = "";

        this._bindEvents();
        this._init();
        this._updateUI('');
        console.log('FILTER:', this.filter);
        console.log('allowChar:', this.filter?.allowChar);
    }

    _bindEvents() {
        this.inputElement.addEventListener('input', this._onInput.bind(this));
        this.inputElement.addEventListener('keydown', this._onKeyDown.bind(this));
        this.inputElement.addEventListener('paste', this._onPaste.bind(this));

        this._syncRenderer();
    }

    _init() {
        this.inputElement.value = '';
        this.lastValue = '';
        this.lastFormatted = '';
    }

    _onKeyDown(event) {
        const val = this.inputElement.value;
        const pos = this.inputElement.selectionStart;

        // --- Backspace ---
        if (event.key === 'Backspace') {
            if (pos > 0 && !this.filter.isValidChar(val[pos - 1])) {
                event.preventDefault();

                const value = this.filter.filter(val);
                const charPos = getCharCountBeforeCursor(val, pos, this.filter);

                if (charPos > 0) {
                    const newValue =
                        value.slice(0, charPos - 1) +
                        value.slice(charPos);

                    this._applyValue(newValue, charPos - 1);
                }
                return;
            }
        }

        // --- Delete ---
        if (event.key === 'Delete') {
            if (pos < val.length && !this.filter.isValidChar(val[pos])) {
                event.preventDefault();

                const value = this.filter.filter(val);
                const charPos = getCharCountBeforeCursor(val, pos, this.filter);

                if (charPos < value.length) {
                    const newValue =
                        value.slice(0, charPos) +
                        value.slice(charPos + 1);

                    this._applyValue(newValue, charPos);
                }
                return;
            }
        }

        // --- Shift+Insert ---
        if (event.shiftKey && event.key === 'Insert') {
            event.preventDefault();

            navigator.clipboard.readText().then(text => {
                this._onPaste({
                    clipboardData: { getData: () => text },
                    preventDefault: () => {}
                });
            });

            return;
        }

        const controlKeys = [
            'Backspace','Delete','Tab','Escape','Enter',
            'ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
            'Home','End'
        ];

        if (controlKeys.includes(event.key)) return;
        if (event.ctrlKey || event.metaKey) return;

        // 👉 фильтр решает, можно ли вводить символ
        if (!this.filter.allowChar(event.key)) {
            event.preventDefault();
        }
    }

    _onPaste(event) {
        event.preventDefault();

        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;
        const hasSelection = start !== end;

        const currentFormatted = this.inputElement.value;
        const currentValue = this.filter.filter(currentFormatted);

        const pasted = this.filter.filter(
            event.clipboardData.getData('text')
        );

        if (!pasted.length) return;

        let newValue;
        let targetIndex;

        if (hasSelection) {
            const before = getCharCountBeforeCursor(currentFormatted, start, this.filter);
            const inSelection = getCharCountInSelection(currentFormatted, start, end, this.filter);

            newValue =
                currentValue.slice(0, before) +
                pasted +
                currentValue.slice(before + inSelection);

            targetIndex = before + pasted.length;

        } else {
            const before = getCharCountBeforeCursor(currentFormatted, start, this.filter);

            newValue =
                currentValue.slice(0, before) +
                pasted +
                currentValue.slice(before);

            targetIndex = before + pasted.length;
        }

        const max = this._getMaxMaskLength();
        newValue = newValue.slice(0, max);

        this._applyValue(newValue, targetIndex);
    }

    _onInput() {
        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;
        const hasSelection = start !== end;

        const currentFormatted = this.inputElement.value;
        const currentValue = this.filter.filter(currentFormatted);

        // 👉 если пользователь ввёл разделитель → откат
        if (currentValue === this.lastValue) {
            this._restore(start);
            return;
        }

        const oldValue = this.lastValue;

        let newValue;
        let targetIndex;

        const before = getCharCountBeforeCursor(this.lastFormatted, start, this.filter);

        if (hasSelection) {
            const inSelection = getCharCountInSelection(this.lastFormatted, start, end, this.filter);

            if (currentValue.length > oldValue.length - inSelection) {
                const insertedCount = currentValue.length - (oldValue.length - inSelection);

                newValue =
                    oldValue.slice(0, before) +
                    currentValue.slice(before, before + insertedCount) +
                    oldValue.slice(before + inSelection);

            } else {
                newValue = currentValue;
            }

            targetIndex = getCharCountBeforeCursor(currentFormatted, start, this.filter);

        } else {
            newValue = currentValue;
            targetIndex = getCharCountBeforeCursor(currentFormatted, start, this.filter);
        }

        const max = this._getMaxMaskLength();
        newValue = newValue.slice(0, max);

        this._applyValue(newValue, targetIndex);
    }

    _applyValue(value, targetIndex) {
        const formatted = formatByMask(value, this.mask, this.filter);

        if (this.transformer) {
            value = this.transformer(value ?? '');
        }

        this.inputElement.value = formatted;
        this._updateUI(formatted);

        let cursor = getCharPositionInFormatted(
            formatted,
            targetIndex,
            this.filter
        );

        // 👉 пропускаем разделители
        while (
            cursor < formatted.length &&
            !this.filter.isValidChar(formatted[cursor])
        ) {
            cursor++;
        }

        setTimeout(() => {
            this.inputElement.setSelectionRange(cursor, cursor);
        }, 0);

        this.lastValue = value;
        this.lastFormatted = formatted;

        this._syncRenderer();
    }

    _restore(cursorPos) {
        this.inputElement.value = this.lastFormatted;
        this._updateUI(this.lastFormatted);

        const pos = Math.min(cursorPos, this.lastFormatted.length);
        this.inputElement.setSelectionRange(pos, pos);
    }

    _updateUI(formatted) {
        if (this.renderer) {
            this.renderer.update(formatted);
        }
    }

    _syncRenderer() {
        if (!this.renderer) return;

        this.renderer.syncStyles(this.inputElement);
        this.renderer.update(this.inputElement.value);
    }

    _getMaxMaskLength() {
        let count = 0;
        for (let i = 0; i < this.mask.length; i++) {
            if (this.filter.isMaskSlot(this.mask[i])) count++;
        }
        return count;
    }

    // --- публичные методы ---

    getValue() {
        return this.lastValue;
    }

    setValue(value) {
        const clean = this.filter.filter(value).slice(0, this._getMaxMaskLength());
        this._applyValue(clean, clean.length);
    }

    clear() {
        this._applyValue('', 0);
    }

    updateMask(newMask) {
        this.mask = newMask;
        const value = this.filter.filter(this.inputElement.value);
        this._applyValue(value, value.length);
    }
}