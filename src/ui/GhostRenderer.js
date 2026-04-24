/**
 * Отвечает за визуальный "фейковый placeholder".
 * 
 * Полностью изолирован от логики маски.
 */

export class GhostRenderer {
    constructor(mask, typedEl, remainingEl) {
        this.typedEl = typedEl;
        this.remainingEl = remainingEl;
        this.mask = mask;
        this.typedEl = typedEl;
        this.remainingEl = remainingEl;
    }

    /**
     * Обновляет отображение placeholder
     * @param {string} formatted
     */
    update(formatted) {
        let typed = '';
        let remaining = '';

        for (let i = 0; i < this.mask.length; i++) {
            const maskChar = this.mask[i];
            const f = formatted[i];

            if (maskChar >= '0' && maskChar <= '9') {
                if (f && f >= '0' && f <= '9') {
                    typed += maskChar;
                } else {
                    remaining += maskChar;
                }
            } else {
                if (f === maskChar) {
                    typed += maskChar;
                } else {
                    remaining += maskChar;
                }
            }
        }

        this.typedEl.textContent = typed;
        this.remainingEl.textContent = remaining;
    }

    /**
     * Синхронизирует стили input → overlay
     * чтобы плейсхолдер всегда совпадал с полем ввода 1:1
     */
    syncStyles(inputEl) {
        const styles = window.getComputedStyle(inputEl);

        const props = [
            "fontFamily",
            "fontSize",
            "fontWeight",
            "letterSpacing",
            "lineHeight",
            "textTransform"
        ];

        const apply = (el) => {
            for (const p of props) {
                el.style[p] = styles[p];
            }
        };

        apply(this.typedEl);
        apply(this.remainingEl);
    }
}