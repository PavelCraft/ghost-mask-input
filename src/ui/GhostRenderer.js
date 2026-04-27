export class GhostRenderer {
    constructor(mask, typedEl, remainingEl, strategy) {
        this.mask = mask;
        this.typedEl = typedEl;
        this.remainingEl = remainingEl;
        this.strategy = strategy;
    }

    update(formatted) {
        const { typed, remaining } = this.strategy.update(
            this.mask,
            formatted
        );

        this.typedEl.textContent = typed;
        this.remainingEl.textContent = remaining;
    }

    syncStyles(inputEl) {
        const styles = window.getComputedStyle(inputEl);

        const props = [
            'fontFamily',
            'fontSize',
            'fontWeight',
            'letterSpacing',
            'lineHeight',
            'textTransform'
        ];

        for (const prop of props) {
            this.typedEl.style[prop] = styles[prop];
            this.remainingEl.style[prop] = styles[prop];
        }
    }
}