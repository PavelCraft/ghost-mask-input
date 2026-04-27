import {
    createNumericSeparatedPreset
} from '../src/index.js';

const input = document.getElementById('phone1');

const typedEl = document.querySelector('#phone1 + .mask-placeholder .ghost-typed');
const remainingEl = document.querySelector('#phone1 + .mask-placeholder .ghost-remaining');

createNumericSeparatedPreset(input, {
    mask: '+7 (999) 999-99-99',
    typedEl,
    remainingEl
});