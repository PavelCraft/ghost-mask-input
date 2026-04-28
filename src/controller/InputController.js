import { MaskFormatter } from '../core/maskFormatter.js';
import { DigitFilter } from '../filters/DigitFilter.js';

/**
 * Контроллер masked input.
 *
 * Source of truth:
 * - rawValue: реальные пользовательские данные
 * - formattedValue: отображаемое значение input по маске
 *
 * DOM input.value никогда не используется как источник истины.
 */
export class InputController {
    /**
     * @param {HTMLInputElement} inputElement
     * @param {Object} options
     * @param {string} options.mask
     * @param {Object} [options.filter]
     * @param {Function} [options.transformer]
     * @param {Object} [options.renderer]
     * @param {string[]} [options.separators]
     * @param {boolean} [options.autoCloseBracket]
     */
    constructor(inputElement, options = {}) {
        this.inputElement = inputElement;

        this.mask = options.mask;
        this.renderer = options.renderer ?? null;
        this.transformer = options.transformer ?? null;

        this.filter = options.filter ?? new DigitFilter();

        this.formatter = new MaskFormatter(
            this.mask,
            this.filter,
            {
                separators: options.separators,
                autoCloseBracket: options.autoCloseBracket
            }
        );

        /**
         * Реальные пользовательские данные без масочных separator.
         * Может содержать символы, совпадающие с separator.
         * @type {string}
         */
        this.rawValue = '';

        /**
         * Отформатированное значение input.
         * @type {string}
         */
        this.formattedValue = '';

        /**
         * Последний mapping formatter-а.
         * @type {Object|null}
         */
        this.mapping = null;

        this._bindEvents();
        this._render();
    }

    /**
     * Подписка на DOM-события.
     * @private
     */
    _bindEvents() {
        this.inputElement.addEventListener('keydown', this._onKeyDown.bind(this));
        this.inputElement.addEventListener('paste', this._onPaste.bind(this));
        this.inputElement.addEventListener(
            'input',
            this._onNativeInput.bind(this)
        );
    }

    /**
     * Главный рендер пайплайн.
     *
     * 1. Применяет transformer
     * 2. Форматирует rawValue по mask
     * 3. Обновляет DOM
     * 4. Синхронизирует renderer
     *
     * @private
     */
    _render() {
        let raw = this.rawValue;

        if (this.transformer) {
            raw = this.transformer(raw);
        }

        const mapping = this.formatter.format(raw);

        this.rawValue = raw;
        this.formattedValue = mapping.formatted;
        this.mapping = mapping;

        this.inputElement.value = this.formattedValue;

        if (this.renderer) {
            this.renderer.syncStyles(this.inputElement);
            this.renderer.update(this.formattedValue);
        }
    }

    /**
     * Обработка keydown.
     *
     * Полностью перехватывает ввод.
     * Нативный input event не используется.
     *
     * @param {KeyboardEvent} event
     * @private
     */
    _onKeyDown(event) {
        console.log({
            key: event.key,
            composing: event.isComposing,
            rawValue: this.rawValue,
            formattedValue: this.formattedValue,
            domValue: this.inputElement.value
        });
        if (event.isComposing || event.key === 'Process') {
            return;
        }

        const controlKeys = [
            'Tab', 'Escape', 'Enter',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Home', 'End',
            'Shift', 'CapsLock', 'Meta', 'Control', 'Alt'
        ];

        if (controlKeys.includes(event.key)) return;
        if (event.ctrlKey || event.metaKey) return;

        event.preventDefault();


        if (event.key === 'Backspace') {
            this._handleBackspace();
            return;
        }

        if (event.key === 'Delete') {
            this._handleDelete();
            return;
        }

        if (!this.filter.allowChar(event.key)) {
            return;
        }

        this._handleInsert(event.key);
    }

    /**
     * Обработка paste.
     *
     * @param {ClipboardEvent} event
     * @private
     */
    _onPaste(event) {
        event.preventDefault();

        const pasted = this.filter.filter(
            event.clipboardData.getData('text')
        );

        if (!pasted.length) return;

        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;

        const rawStart = this.formatter.formattedPosToRawIndex(start, this.mapping);
        const rawEnd = this.formatter.formattedPosToRawIndex(end, this.mapping);

        this.rawValue =
            this.rawValue.slice(0, rawStart) +
            pasted +
            this.rawValue.slice(rawEnd);

        this._truncateToMask();
        this._render();

        const cursorPos = this.formatter.rawIndexToFormattedPos(
            rawStart + pasted.length,
            this.mapping
        );

        this._setCursor(cursorPos);
    }

    /**
     * Вставка одного символа.
     *
     * @param {string} char
     * @private
     */
    _handleInsert(char) {
        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;

        const rawStart = this.formatter.formattedPosToRawIndex(start, this.mapping);
        const rawEnd = this.formatter.formattedPosToRawIndex(end, this.mapping);

        this.rawValue =
            this.rawValue.slice(0, rawStart) +
            char +
            this.rawValue.slice(rawEnd);

        this._truncateToMask();
        this._render();

        // После _render() this.mapping уже новый,
        // поэтому используем актуальный маппинг
        const cursorPos = this.formatter.rawIndexToFormattedPos(
            rawStart + 1,
            this.mapping
        );

        this._setCursor(cursorPos);
    }

    /**
     * Backspace по rawValue.
     * @private
     */
    _handleBackspace() {
        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;

        const rawStart = this.formatter.formattedPosToRawIndex(start, this.mapping);
        const rawEnd = this.formatter.formattedPosToRawIndex(end, this.mapping);

        if (start !== end) {
            this.rawValue =
                this.rawValue.slice(0, rawStart) +
                this.rawValue.slice(rawEnd);

            this._render();
            this._setCursor(
                this.formatter.rawIndexToFormattedPos(rawStart, this.mapping)
            );
            return;
        }

        if (rawStart === 0) return;

        this.rawValue =
            this.rawValue.slice(0, rawStart - 1) +
            this.rawValue.slice(rawStart);

        this._render();

        this._setCursor(
            this.formatter.rawIndexToFormattedPos(rawStart - 1, this.mapping)
        );
    }

    /**
     * Delete по rawValue.
     * @private
     */
    _handleDelete() {
        const start = this.inputElement.selectionStart;
        const end = this.inputElement.selectionEnd;

        const rawStart = this.formatter.formattedPosToRawIndex(start, this.mapping);
        const rawEnd = this.formatter.formattedPosToRawIndex(end, this.mapping);

        if (start !== end) {
            this.rawValue =
                this.rawValue.slice(0, rawStart) +
                this.rawValue.slice(rawEnd);

            this._render();
            this._setCursor(
                this.formatter.rawIndexToFormattedPos(rawStart, this.mapping)
            );
            return;
        }

        if (rawStart >= this.rawValue.length) return;

        this.rawValue =
            this.rawValue.slice(0, rawStart) +
            this.rawValue.slice(rawStart + 1);

        this._render();

        this._setCursor(
            this.formatter.rawIndexToFormattedPos(rawStart, this.mapping)
        );
    }

    /**
     * Ограничивает rawValue по количеству slot в mask.
     * @private
     */
    _truncateToMask() {
const maxSlots = this._getMaxRawLength();
        let countSlots = 0;
        let cutIndex = this.rawValue.length;

        for (let i = 0; i < this.rawValue.length; i++) {
            const ch = this.rawValue[i];
            if (this.filter.isMaskSlot(ch)) {
                countSlots++;
                if (countSlots > maxSlots) {
                    cutIndex = i;
                    break;
                }
            }
        }

        if (cutIndex < this.rawValue.length) {
            this.rawValue = this.rawValue.slice(0, cutIndex);
        }
    }

    /**
     * Подсчёт максимально допустимой длины rawValue.
     *
     * = количество slot-символов в mask.
     *
     * @returns {number}
     * @private
     */
    _getMaxRawLength() {
        let count = 0;

        for (const ch of this.mask) {
            if (this.filter.isMaskSlot(ch)) {
                count++;
            }
        }

        return count;
    }

    /**
     * Устанавливает курсор.
     *
     * @param {number} pos
     * @private
     */
    _setCursor(pos) {
        this.inputElement.setSelectionRange(pos, pos);
    }

    /**
     * Получить rawValue.
     *
     * @returns {string}
     */
    getValue() {
        return this.rawValue;
    }

    /**
     * Установить rawValue программно.
     *
     * @param {string} value
     */
    setValue(value) {
        this.rawValue = this.filter.filter(value);

        this._truncateToMask();
        this._render();

        this._setCursor(this.formattedValue.length);
    }

    /**
     * Очистить поле.
     */
    clear() {
        this.rawValue = '';
        this._render();
        this._setCursor(0);
    }

    /**
     * Обновить mask.
     *
     * @param {string} newMask
     */
    updateMask(newMask) {
        this.mask = newMask;

        this.formatter = new MaskFormatter(
            this.mask,
            this.filter
        );

        this._truncateToMask();
        this._render();
    }

    _onNativeInput() {
        const domValue = this.inputElement.value;

        if (domValue === this.formattedValue) {
            return;
        }

        this.rawValue = this.filter.filter(domValue);

        this._truncateToMask();
        this._render();

        this._setCursor(this.formattedValue.length);
    }
}