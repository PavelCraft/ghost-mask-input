export class BaseRenderStrategy {
    update(mask, formatted) {
        throw new Error('update() must be implemented');
    }
}