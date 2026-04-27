import { BaseRenderStrategy } from './BaseRenderStrategy.js';

export class RawRenderStrategy extends BaseRenderStrategy {
    update(mask, formatted) {
        return {
            typed: formatted,
            remaining: mask.slice(formatted.length)
        };
    }
}