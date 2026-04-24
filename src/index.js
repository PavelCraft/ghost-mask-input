/**
 * Точка входа библиотеки (public API)
 * 
 * Здесь экспортируется только то, что должно быть доступно пользователю.
 * Внутренние файлы (core) скрыты.
 */

// Основной класс для телефонов
export { InputController } from './core/InputController.js';

// (опционально) если хочешь дать доступ к ядру:
export { MaskEngine } from './core/MaskEngine.js';

// (опционально) для кастомных UI
export { GhostRenderer } from './ui/GhostRenderer.js';

export { initGhostMask } from './auto-init.js';
