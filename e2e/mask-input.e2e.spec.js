// e2e/mask-input.e2e.spec.js
import { expect, test } from '@playwright/test';

test.describe('Ghost Mask Input E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/demo/');
    });

    // // ============================================================
    // // 1. Поле "Просто текст" с data-mask="AAAAA" и data-preset="text"
    // // ============================================================
    // test.describe('Поле "Просто текст" (mask: AAAAA, preset: text)', () => {
    //     test('Цепочка 1: "abcde" -> backspace -> delete -> backspace', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAA"][data-preset="text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         // "abcde" -> "abcde"
    //         await input.click();
    //         await input.fill('abcde');
    //         await expect(input).toHaveValue('abcde');
    //         await expect(remaining).toHaveText('');
            
    //         // Курсор после "c", backspace (1) -> "abde"
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('abde');
    //         await expect(remaining).toHaveText('A')
            
    //         // backspace (1) -> "ade"
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('ade');
    //         await expect(remaining).toHaveText('AA')
            
    //         // delete (1) -> "ae"
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('ae');
    //         await expect(remaining).toHaveText('AAA')
            
    //         // delete (3) -> "a"
    //         await input.press('Delete');
    //         await input.press('Delete');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('a');
    //         await expect(remaining).toHaveText('AAAA')
            
    //         // backspace (2) -> ""
    //         await input.press('Backspace');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('');
    //         await expect(remaining).toHaveText('AAAAA')
    //     });

    //     test('Цепочка 2: "ab cd" -> backspace (1) -> "abcd"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAA"][data-preset="text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         // "ab cd" -> "ab cd"
    //         await input.click();
    //         await input.fill('ab cd');
    //         await expect(input).toHaveValue('ab cd');
    //         await expect(remaining).toHaveText('')
            
    //         // Курсор справа от пробела, backspace (1) -> "abcd"
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('abcd');
    //         await expect(remaining).toHaveText('A')
    //     });

    //     test('Цепочка 3: "абвг " -> backspace (5) -> ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAA"][data-preset="text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         // "абвг " -> "абвг "
    //         await input.click();
    //         await input.fill('абвг ');
    //         await expect(input).toHaveValue('абвг ');
    //         await expect(remaining).toHaveText('')
            
    //         // backspace (5) -> ""
    //         for (let i = 0; i < 5; i++) {
    //             await input.press('Backspace');
    //         }
    //         await expect(input).toHaveValue('');
    //         await expect(remaining).toHaveText('AAAAA')
    //     });

    //     test('Цепочка 4: "АBг/" -> "АBг/"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAA"][data-preset="text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('АBг/');
    //         await expect(input).toHaveValue('АBг/');
    //         await expect(remaining).toHaveText('A')
    //     });

    //     test('Цепочка 5: "15 a" -> "15 a", курсор после 5, "b" -> "15b a", выделяем "15b", вставляем "cb" -> "cb a"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAA"][data-preset="text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         // "15 a" -> "15 a"
    //         await input.click();
    //         await input.fill('15 a');
    //         await expect(input).toHaveValue('15 a');
    //         await expect(remaining).toHaveText('A')
            
    //         // Курсор после 5, ввод "b" -> "15b a"
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.type('b');
    //         await expect(input).toHaveValue('15b a');
    //         await expect(remaining).toHaveText('')
            
    //         // Выделяем "15b", вставляем "cb" -> "cb a"
    //         await input.press('ArrowLeft');  // перед 'b'
    //         await input.press('ArrowLeft');  // перед '5'
    //         await input.press('ArrowLeft');  // перед '1'

    //         // Зажимаем Shift и выделяем "15b"
    //         await input.press('Shift+ArrowRight');
    //         await input.press('Shift+ArrowRight');
    //         await input.press('Shift+ArrowRight');

    //         // Вставляем "cb"
    //         await input.type('cb');

    //         // Результат: "cb a"
    //         await expect(input).toHaveValue('cb a');
    //         await expect(remaining).toHaveText('A')
    //     });
    // });

    // // ============================================================
    // // 2. Поле ввода номера телефона
    // // ============================================================
    // test.describe('Поле ввода номера телефона (mask: +7 (912) 345-67-89, preset: numeric-separated)', () => {
    //     test('Цепочка 1: backspace и delete последовательности', async ({ page }) => {
    //         const input = page.locator('[data-mask="+7 (912) 345-67-89"][data-preset="numeric-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         // Начальное значение
    //         await expect(input).toHaveValue('+7 (987) 654-32-10');
    //         await expect(remaining).toHaveText('')
            
    //         // backspace (2) -> "+7 (987) 654-32"
    //         await input.click();
    //         await input.press('End')
    //         await input.press('Backspace');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('+7 (987) 654-32');
    //         await expect(remaining).toHaveText('-89')
            
    //         // backspace (5) -> "+7 (987)"
    //         for (let i = 0; i < 5; i++) {
    //             await input.press('Backspace');
    //         }
    //         await expect(input).toHaveValue('+7 (987)');
    //         await expect(remaining).toHaveText('345-67-89')
            
    //         // backspace (1) -> "+7 (98"
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('+7 (98');
    //         await expect(remaining).toHaveText('2) 345-67-89')
            
    //         // Курсор на начало строки
    //         await input.press('Home');
            
    //         // delete (1) -> "+9 (8"
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('+9 (8');
    //         await expect(remaining).toHaveText('12) 345-67-89')
            
    //         // delete (2) -> ""
    //         await input.press('Delete');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('');
    //         await expect(remaining).toHaveText('+7 (912) 345-67-89')
    //     });

    //     test('Цепочка 2: удаление с начала строки и вставка', async ({ page }) => {
    //         const input = page.locator('[data-mask="+7 (912) 345-67-89"][data-preset="numeric-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         // Курсор на начало строки
    //         await input.press('Home');
            
    //         // delete (10) -> поле освобождается от уже предустановленного значения
    //         for (let i = 0; i < 11; i++) {
    //             await input.press('Delete');
    //         }
    //         await expect(input).toHaveValue('');
    //         await expect(remaining).toHaveText('+7 (912) 345-67-89')
            
    //         // "aГ7!.965" -> "+7 (965)"
    //         await input.type('aГ7!.965');
    //         await expect(input).toHaveValue('+7 (965)');
    //         await expect(remaining).toHaveText('345-67-89')
            
    //         // "1234567" -> "+7 (965) 123-45-67"
    //         await input.type('1234567');
    //         await expect(input).toHaveValue('+7 (965) 123-45-67');
    //         await expect(remaining).toHaveText('')
            
    //         // Курсор после первого дефиса, backspace (1) -> "+7 (965) 124-56-7"
    //         for (let i = 0; i < 5; i++) {
    //             await input.press('ArrowLeft');
    //         }

    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('+7 (965) 124-56-7');
    //         await expect(remaining).toHaveText('9')
            
    //         // "1" -> "+7 (965) 121-45-67"
    //         await input.type('1');
    //         await expect(input).toHaveValue('+7 (965) 121-45-67');
    //         await expect(remaining).toHaveText('')
            
    //         // Курсор сразу после ")", backspace (1) -> "+7 (961) 214-56-7"
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('+7 (961) 214-56-7');
    //         await expect(remaining).toHaveText('9')
            
    //         // Курсор после ") ", backspace (1) -> "+7 (962) 145-67"
    //         await input.press('ArrowRight');
    //         await input.press('ArrowRight');
    //         await input.press('ArrowRight');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('+7 (962) 145-67');
    //         await expect(remaining).toHaveText('-89')
            
    //         // Курсор после 2, delete (1) -> "+7 (962) 456-7"
    //         await input.press('ArrowRight');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('+7 (962) 456-7');
    //         await expect(remaining).toHaveText('7-89')
            
    //         // "3" -> "+7 (962) 345-67"
    //         await input.type('3');
    //         await expect(input).toHaveValue('+7 (962) 345-67');
    //         await expect(remaining).toHaveText('-89')
            
    //         // Курсор после 5, delete (1) -> "+7 (962) 345-7"
    //         await input.press('End');
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('+7 (962) 345-7');
    //         await expect(remaining).toHaveText('7-89')
    //     });

    //     test('Цепочка 3: выделить всё, вставить "71234567890" -> "+7 (123) 456-78-90"', async ({ page }) => {
    //         const input = page.locator('[data-mask="+7 (912) 345-67-89"][data-preset="numeric-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();

    //         // записываем номер в буфер обмена
    //         await page.evaluate(() => {
    //             navigator.clipboard.writeText('71234567890');
    //         });
    //         // выделяем всё в поле
    //         await input.press('ControlOrMeta+a');
    //         // заменяем выделенное содержимое поля содержимым буфера
    //         await page.keyboard.press('ControlOrMeta+v');

    //         await expect(input).toHaveValue('+7 (123) 456-78-90');
    //         await expect(remaining).toHaveText('')
    //     });

    //     test('Цепочка 4: выделить диапазон "12345", вставить вместо него "4321" -> "+7 (432) 167-89-0"', async ({ page }) => {
    //         const input = page.locator('[data-mask="+7 (912) 345-67-89"][data-preset="numeric-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         // записываем номер в буфер обмена
    //         await page.evaluate(() => {
    //             navigator.clipboard.writeText('71234567890');
    //         });
    //         // Сначала устанавливаем значение
    //         await input.press('Home');
    //         await input.press('Shift+End');
    //         await page.keyboard.press('ControlOrMeta+v');
    //         await expect(input).toHaveValue('+7 (123) 456-78-90');
    //         await expect(remaining).toHaveText('')
            
    //         // записываем номер в буфер обмена
    //         await page.evaluate(() => {
    //             navigator.clipboard.writeText('4321');
    //         });
            
    //         // Ставим курсор перед единицей
    //         await input.press('Home')
    //         for (let i = 0; i < 4; i++) {
    //             await input.press('ArrowRight');
    //         }

    //         // Выделяем кусок номера
    //         for (let i = 0; i < 7; i++) {
    //             await input.press('Shift+ArrowRight');
    //         }
            
    //         // заменяем выделенное содержимое поля содержимым буфера
    //         await page.keyboard.press('ControlOrMeta+v');

    //         await expect(input).toHaveValue('+7 (432) 167-89-0');
    //         await expect(remaining).toHaveText('9')
    //     });

    //     test('Цепочка 5: выделить всё, вставить "+7 (934) 111-2222" -> "+7 (934) 111-22-22"', async ({ page }) => {
    //         const input = page.locator('[data-mask="+7 (912) 345-67-89"][data-preset="numeric-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.press('ControlOrMeta+a');
    //         await input.type('+7 (934) 111-2222');
    //         await expect(input).toHaveValue('+7 (934) 111-22-22');
    //         await expect(remaining).toHaveText('')
    //     });

    //     test('Цепочка 6: выделить всё, вставить текст с цифрами -> "+8 (965) 123-45-67"', async ({ page }) => {
    //         const input = page.locator('[data-mask="+7 (912) 345-67-89"][data-preset="numeric-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.press('ControlOrMeta+a');
    //         await input.type('Привет, как дела? запиши мой номер: 8965.123!4567');
    //         await expect(input).toHaveValue('+8 (965) 123-45-67');
    //         await expect(remaining).toHaveText('')
    //     });
    // });

    // // ============================================================
    // // 3. Поле «Код» с data-mask="AAAA1111" и data-preset="alnum"
    // // ============================================================
    // test.describe('Поле «Код» (mask: AAAA1111, preset: alnum)', () => {
    //     test('Цепочка 1: "abcd1234" -> полное заполнение', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd1234');
    //         await expect(input).toHaveValue('abcd1234');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 2: "abcd1234", курсор после d, backspace (1) -> "abc1234", "1"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd1234');
    //         // Курсор после d
    //         for (let i = 0; i < 4; i++) {
    //             await input.press('ArrowLeft');
    //             }
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('abc1234');
    //         await expect(remaining).toHaveText('1');
    //     });

    //     test('Цепочка 3: "ab123", курсор после b, delete (1) -> "ab23", "1111"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ab123');
    //         // Курсор после b
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('ab23');
    //         await expect(remaining).toHaveText('1111');
    //     });

    //     test('Цепочка 4: "a1b2c3" -> "a1b2c3", "11"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('a1b2c3');
    //         await expect(input).toHaveValue('a1b2c3');
    //         await expect(remaining).toHaveText('11');
    //     });

    //     test('Цепочка 5: "abcdefghijk" -> "abcdefgh", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcdefghijk');
    //         await expect(input).toHaveValue('abcdefgh');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 6: "12345678" -> "12345678", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('12345678');
    //         await expect(input).toHaveValue('12345678');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 7: "1234567" -> "1234567", "1"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('1234567');
    //         await expect(input).toHaveValue('1234567');
    //         await expect(remaining).toHaveText('1');
    //     });

    //     test('Цепочка 8: "12abГ3%Ж4cd" -> "12ab34cd", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA1111"][data-preset="alnum"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('12abГ3%Ж4cd');
    //         await expect(input).toHaveValue('12ab34cd');
    //         await expect(remaining).toHaveText('');
    //     });
    // });

    // // ============================================================
    // // 4. Поле «Серийный номер» с data-mask="AAAA-1111-BBBB" и data-preset="alnum-separated"
    // // ============================================================
    // test.describe('Поле «Серийный номер» (mask: AAAA-1111-BBBB, preset: alnum-separated)', () => {
    //     test('Цепочка 1: "abcd" -> "abcd", "-1111-BBBB"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd');
    //         await expect(input).toHaveValue('abcd');
    //         await expect(remaining).toHaveText('-1111-BBBB');
    //     });

    //     test('Цепочка 2: "abcd1234" -> "abcd-1234", "-BBBB"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd1234');
    //         await expect(input).toHaveValue('abcd-1234');
    //         await expect(remaining).toHaveText('-BBBB');
    //     });

    //     test('Цепочка 3: "abcd1234efgh" -> "abcd-1234-efgh", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd1234efgh');
    //         await expect(input).toHaveValue('abcd-1234-efgh');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 4: "abcd1234efg" -> "abcd-1234-efg", "B"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd1234efg');
    //         await expect(input).toHaveValue('abcd-1234-efg');
    //         await expect(remaining).toHaveText('B');
    //     });

    //     test('Цепочка 5: "ab12" -> "ab12", "-1111-BBBB"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ab12');
    //         await expect(input).toHaveValue('ab12');
    //         await expect(remaining).toHaveText('-1111-BBBB');
    //     });

    //     test('Цепочка 6: "abЖОПА12Г%cd" -> "ab12-cd", "11-BBBB"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abЖОПА12Г%cd');
    //         await expect(input).toHaveValue('ab12-cd');
    //         await expect(remaining).toHaveText('11-BBBB');
    //     });

    //     test('Цепочка 7: "a1b2c3d4e5f6g7" -> "a1b2-c3d4-e5f6", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('a1b2c3d4e5f6g7');
    //         await expect(input).toHaveValue('a1b2-c3d4-e5f6');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 8: "a1b2-c3d4-e5f6", курсор после первого дефиса, backspace (1) -> "a1bc-3d4e-5f6", "B"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('a1b2c3d4e5f6g7');
    //         // Курсор после первого дефиса (position 5)
    //         await input.press('Home');
    //         for (let i = 0; i < 5; i++) {
    //             await input.press('ArrowRight');
    //             }
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('a1bc-3d4e-5f6');
    //         await expect(remaining).toHaveText('B');

    //         await input.press('Delete');
    //         await expect(input).toHaveValue('a1b3-d4e5-f6');
    //         await expect(remaining).toHaveText('BB');


    //     });

    //     test('Цепочка 9: "abcd-1234-ZOPA" -> полное заполнение, выделить "1234", вставить "56"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAA-1111-BBBB"][data-preset="alnum-separated"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcd-1234-ZOPA');
    //         await expect(input).toHaveValue('abcd-1234-ZOPA');
    //         await expect(remaining).toHaveText('');
            
    //         // Записываем "56" в буфер обмена
    //         await page.evaluate(() => {
    //             navigator.clipboard.writeText('56');
    //         });
            
    //         // Выделяем "1234"
    //         await input.press('Home');
    //         for (let i = 0; i < 5; i++) {
    //             await input.press('ArrowRight');
    //         }
    //         for (let i = 0; i < 4; i++) {
    //             await input.press('Shift+ArrowRight');
    //         }
            
    //         // Вставляем "56"
    //         await page.keyboard.press('ControlOrMeta+v');
            
    //         // Ожидаемый результат: "abcd-56ZO-PA", "BB"
    //         await expect(input).toHaveValue('abcd-56ZO-PA');
    //         await expect(remaining).toHaveText('BB');
    //     });
    // });

    // // ============================================================
    // // 5. Поле «Верхний регистр» с data-mask="AAAAAAAA" и data-preset="upper-text"
    // // ============================================================
    // test.describe('Поле «Верхний регистр» (mask: AAAAAAAA, preset: upper-text)', () => {
    //     test('Цепочка 1: "abc" -> "ABC", "AAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abc');
    //         await expect(input).toHaveValue('ABC');
    //         await expect(remaining).toHaveText('AAAAA');
    //     });

    //     test('Цепочка 2: "abcde" -> "ABCDE", "AAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcde');
    //         await expect(input).toHaveValue('ABCDE');
    //         await expect(remaining).toHaveText('AAA');
    //     });

    //     test('Цепочка 3: "abcdefgh" -> "ABCDEFGH", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcdefgh');
    //         await expect(input).toHaveValue('ABCDEFGH');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 4: "aBcDeFgH" -> "ABCDEFGH", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('aBcDeFgH');
    //         await expect(input).toHaveValue('ABCDEFGH');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 5: "abcdefghi" -> "ABCDEFGH", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abcdefghi');
    //         await expect(input).toHaveValue('ABCDEFGH');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 6: "abc", курсор после b, backspace (1) -> "AC", "AAAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abc');
    //         // Курсор после b
    //         await input.press('ArrowLeft');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('AC');
    //         await expect(remaining).toHaveText('AAAAAA');
    //     });

    //     test('Цепочка 7: "abc", курсор после a, delete (1) -> "AC", "AAAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('abc');
    //         // Курсор после a
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('AC');
    //         await expect(remaining).toHaveText('AAAAAA');
    //     });

    //     test('Цепочка 8: "123" -> "123", "AAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('123');
    //         await expect(input).toHaveValue('123');
    //         await expect(remaining).toHaveText('AAAAA');
    //     });

    //     test('Цепочка 9: "пап, привет, как дела?" -> "ПАП, ПРИ", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="upper-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('пап, привет, как дела?');
    //         await expect(input).toHaveValue('ПАП, ПРИ');
    //         await expect(remaining).toHaveText('');
    //     });
    // });

    // // ============================================================
    // // 6. Поле «Нижний регистр» с data-mask="AAAAAAAA" и data-preset="lower-text"
    // // ============================================================
    // test.describe('Поле «Нижний регистр» (mask: AAAAAAAA, preset: lower-text)', () => {
    //     test('Цепочка 1: "ABC" -> "abc", "AAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ABC');
    //         await expect(input).toHaveValue('abc');
    //         await expect(remaining).toHaveText('AAAAA');
    //     });

    //     test('Цепочка 2: "ABCDE" -> "abcde", "AAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ABCDE');
    //         await expect(input).toHaveValue('abcde');
    //         await expect(remaining).toHaveText('AAA');
    //     });

    //     test('Цепочка 3: "AbCdEfGh" -> "abcdefgh", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('AbCdEfGh');
    //         await expect(input).toHaveValue('abcdefgh');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 4: "ABCDEFGHI" -> "abcdefgh", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ABCDEFGHI');
    //         await expect(input).toHaveValue('abcdefgh');
    //         await expect(remaining).toHaveText('');
    //     });

    //     test('Цепочка 5: "ABC", курсор после B, backspace (1) -> "ac", "AAAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ABC');
    //         // Курсор после B
    //         await input.press('ArrowLeft');
    //         await input.press('Backspace');
    //         await expect(input).toHaveValue('ac');
    //         await expect(remaining).toHaveText('AAAAAA');
    //     });

    //     test('Цепочка 6: "ABC", курсор после A, delete (1) -> "ac", "AAAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ABC');
    //         // Курсор после A
    //         await input.press('ArrowLeft');
    //         await input.press('ArrowLeft');
    //         await input.press('Delete');
    //         await expect(input).toHaveValue('ac');
    //         await expect(remaining).toHaveText('AAAAAA');
    //     });

    //     test('Цепочка 7: "123" -> "123", "AAAAA"', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('123');
    //         await expect(input).toHaveValue('123');
    //         await expect(remaining).toHaveText('AAAAA');
    //     });

    //     test('Цепочка 8: "ТЫ ДАЛА?" -> "ты дала?", ""', async ({ page }) => {
    //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
    //         const container = input.locator('..').locator('..');
    //         const remaining = container.locator('.ghost-remaining');
            
    //         await input.click();
    //         await input.fill('ТЫ ДАЛА?');
    //         await expect(input).toHaveValue('ты дала?');
    //         await expect(remaining).toHaveText('');
    //     });
    // });

    // ============================================================
    // 7. Поле «ФИО» с data-mask="AA AA" и data-preset="text-separated"
    // ============================================================
    test.describe('Поле «ФИО» (mask: AA AA, preset: text-separated)', () => {
        test('Цепочка 1: "a   b" -> "a   b", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('a   b');
            await expect(input).toHaveValue('a   b');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 2: "ab  c" -> "ab  c", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab  c');
            await expect(input).toHaveValue('ab  c');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 3: "ab cd" -> "ab cd", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab cd');
            await expect(input).toHaveValue('ab cd');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 4: "abcd" -> "ab cd", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('abcd');
            await expect(input).toHaveValue('ab cd');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 5: "a  cd" -> "a  cd", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('a  cd');
            await expect(input).toHaveValue('a  cd');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 6: "ab" -> "ab", " AA"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab');
            await expect(input).toHaveValue('ab');
            await expect(remaining).toHaveText(' AA');
        });

        test('Цепочка 7: "abc" -> "ab c", "A"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('abc');
            await expect(input).toHaveValue('ab c');
            await expect(remaining).toHaveText('A');
        });

        test('Цепочка 8: цепочка "ab" -> "ab", " AA", "c" -> "ab c", "A", "d" -> "ab cd", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab');
            await expect(input).toHaveValue('ab');
            await expect(remaining).toHaveText(' AA');
            
            await input.type('c');
            await expect(input).toHaveValue('ab c');
            await expect(remaining).toHaveText('A');
            
            await input.type('d');
            await expect(input).toHaveValue('ab cd');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 9: "ab", backspace (1) -> "a", " AA"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab');
            await input.press('Backspace');
            await expect(input).toHaveValue('a');
            await expect(remaining).toHaveText('A AA');
        });

        test('Цепочка 10: "ab cd", курсор после пробела, backspace (1) -> "ac d", "A"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab cd');
            // Курсор после пробела
            await input.press('ArrowLeft');
            await input.press('ArrowLeft');
            await input.press('Backspace');
            await expect(input).toHaveValue('ac d');
            await expect(remaining).toHaveText('A');
        });

        test('Цепочка 11: "ab cd", курсор перед пробелом, delete (1) -> "ab d", "A"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('ab cd');
            // Курсор перед пробелом
            await input.press('ArrowLeft');
            await input.press('ArrowLeft');
            await input.press('ArrowLeft');
            await input.press('Delete');
            await expect(input).toHaveValue('ab d');
            await expect(remaining).toHaveText('A');
        });

        test('Цепочка 12: "a  b" -> "a  b", "A"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('a  b');
            await expect(input).toHaveValue('a  b');
            await expect(remaining).toHaveText('A');
        });

        test('Цепочка 13: "a b" -> "a  b", "A"', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('a b');
            await expect(input).toHaveValue('a  b');
            await expect(remaining).toHaveText('A');
        });

        test('Цепочка 14: "a b " -> "a  b ", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('a b ');
            await expect(input).toHaveValue('a  b ');
            await expect(remaining).toHaveText('');
        });

        test('Цепочка 15: "a b  " -> "a  b ", ""', async ({ page }) => {
            const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
            const container = input.locator('..').locator('..');
            const remaining = container.locator('.ghost-remaining');
            
            await input.click();
            await input.fill('a b  ');
            await expect(input).toHaveValue('a  b ');
            await expect(remaining).toHaveText('');
        });
    });

//     // ============================================================
//     // 8. Поле «Дублирующиеся разделители» с data-mask="AA AA--AA..AA" и data-preset="text-separated"
//     // ============================================================
//     test.describe('Поле «Дублирующиеся разделители» (mask: AA AA--AA..AA, preset: text-separated)', () => {
//         test('Цепочка 1: "ab  cde" -> "ab  c--de", ""', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab  cde');
//             await expect(input).toHaveValue('ab  c--de');
//             await expect(remaining).toHaveText('..AA');
//         });

//         test('Цепочка 2: "ab  c d g " -> "ab  c-- d..g ", ""', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab  c d g ');
//             await expect(input).toHaveValue('ab  c-- d..g ');
//             await expect(remaining).toHaveText('');
//         });

//         test('Цепочка 3: "ab cdefgh" -> "ab cd--ef..gh", ""', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab cdefgh');
//             await expect(input).toHaveValue('ab cd--ef..gh');
//             await expect(remaining).toHaveText('');
//         });

//         test('Цепочка 4: "         " -> "     --  ..  ", ""', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('         ');
//             await expect(input).toHaveValue('     --  ..  ');
//             await expect(remaining).toHaveText('');
//         });

//         test('Цепочка 5: "a.b  .c,d " -> "ab  c--d ", "..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('a.b  .c,d ');
//             await expect(input).toHaveValue('ab  c--d ');
//             await expect(remaining).toHaveText('..AA');
//         });

//         test('Цепочка 6: "abcdefghi" -> "ab cd--ef..gh", ""', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('abcdefghi');
//             await expect(input).toHaveValue('ab cd--ef..gh');
//             await expect(remaining).toHaveText('');
//         });

//         test('Цепочка 7: "ab" -> "ab", " AA--AA..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab');
//             await expect(input).toHaveValue('ab');
//             await expect(remaining).toHaveText(' AA--AA..AA');
//         });

//         test('Цепочка 8: "abc" -> "ab c", "A--AA..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('abc');
//             await expect(input).toHaveValue('ab c');
//             await expect(remaining).toHaveText('A--AA..AA');
//         });

//         test('Цепочка 9: "abcd" -> "ab cd", "--AA..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('abcd');
//             await expect(input).toHaveValue('ab cd');
//             await expect(remaining).toHaveText('--AA..AA');
//         });

//         test('Цепочка 10: "abcde" -> "ab cd--e", "A..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('abcde');
//             await expect(input).toHaveValue('ab cd--e');
//             await expect(remaining).toHaveText('A..AA');
//         });

//         test('Цепочка 11: "Г1бdef" -> "Г1 бd--ef", "..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('Г1бdef');
//             await expect(input).toHaveValue('Г1 бd--ef');
//             await expect(remaining).toHaveText('..AA');
//         });

//         test('Цепочка 12: "abcdefg" -> "ab cd--ef..g", "A"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('abcdefg');
//             await expect(input).toHaveValue('ab cd--ef..g');
//             await expect(remaining).toHaveText('A');
//         });

//         test('Цепочка 13: "abcdefgh" -> "ab cd--ef..gh", ""', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('abcdefgh');
//             await expect(input).toHaveValue('ab cd--ef..gh');
//             await expect(remaining).toHaveText('');
//         });

//         test('Цепочка 14: "ab c", курсор после пробела, "d" -> "ab dc", "--AA..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab c');
//             // Курсор после пробела
//             await input.press('ArrowLeft');
//             await input.type('d');
//             await expect(input).toHaveValue('ab dc');
//             await expect(remaining).toHaveText('--AA..AA');
//         });

//         test('Цепочка 15: "ab cd", курсор после c, backspace (1) -> "ab d", "A--AA..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab cd');
//             // Курсор после c
//             await input.press('ArrowLeft');
//             await input.press('Backspace');
//             await expect(input).toHaveValue('ab d');
//             await expect(remaining).toHaveText('A--AA..AA');
//         });

//         test('Цепочка 16: "ab cd", курсор после пробела, backspace (1) -> "ac d", "A--AA..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab cd');
//             // Курсор после пробела
//             await input.press('ArrowLeft');
//             await input.press('ArrowLeft');
//             await input.press('Backspace');
//             await expect(input).toHaveValue('ac d');
//             await expect(remaining).toHaveText('A--AA..AA');
//         });

//         test('Цепочка 17: "ab cd--ef", курсор после первого дефиса, delete (1) -> "ab cd--f", "A..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab cd--ef');
//             // Курсор после первого дефиса (position 7)
//             await input.press('Home');
//             for (let i = 0; i < 6; i++) {
//                 await input.press('ArrowRight');
//             }
//             await input.press('Delete');
//             await expect(input).toHaveValue('ab cd--f');
//             await expect(remaining).toHaveText('A..AA');
//         });

//         test('Цепочка 18: "ab cd--ef", курсор после первого дефиса, backspace (1) -> "ab ce--f", "A..AA"', async ({ page }) => {
//             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
//             const container = input.locator('..').locator('..');
//             const remaining = container.locator('.ghost-remaining');
            
//             await input.click();
//             await input.fill('ab cd--ef');
//             // Курсор после первого дефиса (position 7)
//             await input.press('Home');
//             for (let i = 0; i < 6; i++) {
//                 await input.press('ArrowRight');
//             }
//             await input.press('Backspace');
//             await expect(input).toHaveValue('ab ce--f');
//             await expect(remaining).toHaveText('A..AA');
//         });
//     });
});