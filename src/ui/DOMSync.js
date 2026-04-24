/**
 * Синхронизирует визуальные стили input → ghost overlay
 * чтобы плейсхолдер всегда совпадал 1:1 с текстом input
 */
export function syncGhostStyles(inputEl, typedEl, remainingEl) {
    const styles = window.getComputedStyle(inputEl);

    const props = [
        "fontFamily",
        "fontSize",
        "fontWeight",
        "letterSpacing",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
        "lineHeight"
    ];

    const apply = (el) => {
        props.forEach(prop => {
            el.style[prop] = styles[prop];
        });
    };

    apply(typedEl);
    apply(remainingEl);
}