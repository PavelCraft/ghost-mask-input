/**
 * InputController
 * -----------------
 * Связывает DOM (input) с ядром маски (MaskEngine + utils).
 * 
 * Отвечает за:
 * - обработку событий (input, keydown, paste)
 * - работу с курсором (selectionStart / selectionEnd)
 * - корректное поведение Backspace / Delete
 * - вставку (Ctrl+V, Shift+Insert)
 * 
 * ВАЖНО:
 * - вся бизнес-логика маски уже вынесена в core
 * - здесь только orchestration
 */

import {
    getDigitCountBeforeCursor,
    getDigitCountInSelection,
    getDigitPositionInFormatted
} from '../core/cursor.js';
import { formatByMask } from '../core/format.js';
import { extractDigits, getMaxDigitsInMask } from '../core/utils.js';

export class InputController {
    constructor(inputElement, options = {}) {
        this.inputElement = inputElement;
        this.mask = options.mask;
        this.renderer = options.renderer;
        this.country = options.country || null;

        this.lastDigits = "";
        this.lastFormatted = "";

        this._bindEvents();
        this._init();
        this._updateUI('');
    }

    _bindEvents() {
        this.inputElement.addEventListener('input', this._onInput.bind(this));
        this._syncRenderer();
        this.inputElement.addEventListener('keydown', this._onKeyDown.bind(this));
        this.inputElement.addEventListener('paste', this._onPaste.bind(this));
    }

    _init() {
        this.inputElement.value = '';
        this.lastDigits = '';
        this.lastFormatted = '';
    }

    _onKeyDown(event) {
        const val = this.inputElement.value;
        const pos = this.inputElement.selectionStart;

        // --- Backspace ---
        if (event.key === 'Backspace') {
            if (pos > 0 && !(val[pos - 1] >= '0' && val[pos - 1] <= '9')) {
                event.preventDefault();

                const digits = extractDigits(val);
                const digitPos = getDigitCountBeforeCursor(val, pos);

                if (digitPos > 0) {
                    const newDigits =
                        digits.slice(0, digitPos - 1) +
                        digits.slice(digitPos);

                    this._applyDigits(newDigits, digitPos - 1);
                }
                return;
            }
        }

        // --- Delete ---
        if (event.key === 'Delete') {
            if (pos < val.length && !(val[pos] >= '0' && val[pos] <= '9')) {
                event.preventDefault();

                const digits = extractDigits(val);
                const digitPos = getDigitCountBeforeCursor(val, pos);

                if (digitPos < digits.length) {
                    const newDigits =
                        digits.slice(0, digitPos) +
                        digits.slice(digitPos + 1);

                    this._applyDigits(newDigits, digitPos);
                }
                return;
            }
        }

        // --- Shift+Insert (как Ctrl+V) ---
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

        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
        }
    }

    _onPaste(event) {
        event.preventDefault();

        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;
        const hasSelection = start !== end;

        const currentFormatted = this.inputElement.value;
        const currentDigits = extractDigits(currentFormatted);

        const pastedDigits = extractDigits(event.clipboardData.getData('text'));
        if (!pastedDigits.length) return;

        let newDigits;
        let targetDigitIndex;

        if (hasSelection) {
            const digitsBefore = getDigitCountBeforeCursor(currentFormatted, start);
            const digitsInSelection = getDigitCountInSelection(currentFormatted, start, end);

            newDigits =
                currentDigits.slice(0, digitsBefore) +
                pastedDigits +
                currentDigits.slice(digitsBefore + digitsInSelection);

            targetDigitIndex = digitsBefore + pastedDigits.length;

        } else {
            const digitsBefore = getDigitCountBeforeCursor(currentFormatted, start);

            newDigits =
                currentDigits.slice(0, digitsBefore) +
                pastedDigits +
                currentDigits.slice(digitsBefore);

            targetDigitIndex = digitsBefore + pastedDigits.length;
        }

        const max = getMaxDigitsInMask(this.mask);
        newDigits = newDigits.slice(0, max);

        this._applyDigits(newDigits, targetDigitIndex);
    }

    _onInput() {
        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;
        const hasSelection = start !== end;

        const currentFormatted = this.inputElement.value;
        const currentDigits = extractDigits(currentFormatted);

        // ввод разделителя вручную → откат
        if (currentDigits === this.lastDigits) {
            this._restore(start);
            return;
        }

        const oldDigits = this.lastDigits;
        let newDigits;
        let targetDigitIndex;

        const digitsBefore = getDigitCountBeforeCursor(this.lastFormatted, start);

        if (hasSelection) {
            const digitsInSelection = getDigitCountInSelection(this.lastFormatted, start, end);

            if (currentDigits.length > oldDigits.length - digitsInSelection) {
                // вставка
                const insertedCount = currentDigits.length - (oldDigits.length - digitsInSelection);

                newDigits =
                    oldDigits.slice(0, digitsBefore) +
                    currentDigits.slice(digitsBefore, digitsBefore + insertedCount) +
                    oldDigits.slice(digitsBefore + digitsInSelection);

            } else {
                // удаление
                newDigits = currentDigits;
            }

            targetDigitIndex = getDigitCountBeforeCursor(currentFormatted, start);

        } else {
            newDigits = currentDigits;
            targetDigitIndex = getDigitCountBeforeCursor(currentFormatted, start);
        }

        const max = getMaxDigitsInMask(this.mask);
        newDigits = newDigits.slice(0, max);

        this._applyDigits(newDigits, targetDigitIndex);
    }

    _applyDigits(digits, targetDigitIndex) {
        const formatted = formatByMask(digits, this.mask);

        this.inputElement.value = formatted;
        this._updateUI(formatted);

        let cursor = getDigitPositionInFormatted(formatted, targetDigitIndex);

        while (
            cursor < formatted.length &&
            !(formatted[cursor] >= '0' && formatted[cursor] <= '9')
        ) {
            cursor++;
        }

        setTimeout(() => {
            this.inputElement.setSelectionRange(cursor, cursor);
        }, 0);

        this.lastDigits = digits;
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

    // --- публичные методы ---

    getDigits() {
        return this.lastDigits;
    }

    setDigits(digits) {
        const max = getMaxDigitsInMask(this.mask);
        const clean = extractDigits(digits).slice(0, max);
        this._applyDigits(clean, clean.length);
    }

    clear() {
        this._applyDigits('', 0);
    }

    updateMask(newMask) {
        this.mask = newMask;
        const digits = extractDigits(this.inputElement.value);
        this._applyDigits(digits, digits.length);
    }

    /**
     * Обновляет overlay (typed / remaining)
     */
    _syncRenderer() {
        if (!this.renderer) return;

        this.renderer.syncStyles(this.inputElement);
        this.renderer.update(this.inputElement.value);
    }
}