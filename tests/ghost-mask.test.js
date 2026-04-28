/**
 * @jest-environment jsdom
 */

import { initGhostMask } from '../src/index.js';

describe('1. Поле "Просто текст" с data-mask="AAAAA" и data-preset="text"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AAAAA" data-preset="text">';
    input = document.querySelector('input');
    initGhostMask();
  });

  // Симуляция ввода символа через KeyboardEvent
  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  // Симуляция ввода текста
  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "abcde" -> "abcde", курсор в конец', () => {
    simulateInput(input, 'abcde');
    expect(input.value).toBe('abcde');
    expect(input.selectionStart).toBe(5);
  });

  test('Ввод "ab cd" -> "ab cd", курсор справа от пробела', () => {
    simulateInput(input, 'ab cd');
    expect(input.value).toBe('ab cd');
    expect(input.selectionStart).toBe(5);
  });

  test('Ввод "абвг " -> "абвг ", кириллица поддерживается', () => {
    simulateInput(input, 'абвг ');
    expect(input.value).toBe('абвг ');
  });

  test('Backspace удаляет символ справа от курсора', () => {
    simulateInput(input, 'abcde');
    input.setSelectionRange(3, 3); // курсор после 'c'
    simulateKey(input, 'Backspace');
    expect(input.value).toBe('abde');
  });

  test('Delete удаляет символ слева от курсора', () => {
    simulateInput(input, 'abcde');
    input.setSelectionRange(3, 3); // курсор после 'c'
    simulateKey(input, 'Delete');
    expect(input.value).toBe('abce');
  });
});

describe('2. Поле ввода номера телефона с data-mask="+7 (912) 345-67-89"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="+7 (912) 345-67-89" data-initial="+7 (987) 654-32-10" data-preset="numeric-separated">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Начальное значение устанавливается корректно', () => {
    expect(input.value).toBe('+7 (987) 654-32-10');
  });

  test('Backspace удаляет последнюю цифру', () => {
    simulateKey(input, 'Backspace');
    expect(input.value).toBe('+7 (987) 654-32-');
  });

  test('Ввод цифр перезаписывает существующие', () => {
    simulateInput(input, '1234567');
    expect(input.value).toBe('+7 (123) 456-67-');
  });

  test('Ввод букв игнорируется', () => {
    simulateInput(input, 'abc');
    expect(input.value).toBe('+7 (987) 654-32-10');
  });
});

describe('3. Поле "Код" с data-mask="AAAA1111" и data-preset="alnum"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AAAA1111" data-preset="alnum">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "abcd1234" -> полное заполнение', () => {
    simulateInput(input, 'abcd1234');
    expect(input.value).toBe('abcd1234');
    expect(input.selectionStart).toBe(8);
  });

  test('Ввод "ab123" -> частичное заполнение', () => {
    simulateInput(input, 'ab123');
    expect(input.value).toBe('ab123');
  });

  test('Ввод "12345678" -> только цифры', () => {
    simulateInput(input, '12345678');
    expect(input.value).toBe('12345678');
  });

  test('Кириллица игнорируется', () => {
    simulateInput(input, 'абвг');
    expect(input.value).toBe('');
  });
});

describe('4. Поле "Серийный номер" с data-mask="AAAA-1111-BBBB" и data-preset="alnum-separated"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AAAA-1111-BBBB" data-preset="alnum-separated">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "abcd" -> "abcd", remaining "-1111-BBBB"', () => {
    simulateInput(input, 'abcd');
    expect(input.value).toBe('abcd');
  });

  test('Ввод "abcd1234" -> "abcd-1234", remaining "-BBBB"', () => {
    simulateInput(input, 'abcd1234');
    expect(input.value).toBe('abcd-1234');
  });

  test('Ввод "abcd1234efgh" -> полное заполнение', () => {
    simulateInput(input, 'abcd1234efgh');
    expect(input.value).toBe('abcd-1234-efgh');
  });

  test('Кириллица и спецсимволы фильтруются', () => {
    simulateInput(input, 'аб12ВГ');
    expect(input.value).toBe('ab12');
  });
});

describe('5. Поле "Верхний регистр" с data-mask="AAAAAAAA" и data-preset="upper-text"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AAAAAAAA" data-preset="upper-text">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "abc" -> "ABC", remaining "AAAAA"', () => {
    simulateInput(input, 'abc');
    expect(input.value).toBe('ABC');
  });

  test('Ввод "abcde" -> "ABCDE", remaining "AAA"', () => {
    simulateInput(input, 'abcde');
    expect(input.value).toBe('ABCDE');
  });

  test('Ввод "abcdefgh" -> полное заполнение', () => {
    simulateInput(input, 'abcdefgh');
    expect(input.value).toBe('ABCDEFGH');
  });

  test('Backspace работает корректно', () => {
    simulateInput(input, 'abc');
    input.setSelectionRange(2, 2);
    simulateKey(input, 'Backspace');
    expect(input.value).toBe('AC');
  });
});

describe('6. Поле "Нижний регистр" с data-mask="AAAAAAAA" и data-preset="lower-text"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AAAAAAAA" data-preset="lower-text">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "ABC" -> "abc", remaining "AAAAA"', () => {
    simulateInput(input, 'ABC');
    expect(input.value).toBe('abc');
  });

  test('Ввод "ABCDE" -> "abcde", remaining "AAA"', () => {
    simulateInput(input, 'ABCDE');
    expect(input.value).toBe('abcde');
  });

  test('Ввод "AbCdEfGh" -> полное заполнение в нижнем регистре', () => {
    simulateInput(input, 'AbCdEfGh');
    expect(input.value).toBe('abcdefgh');
  });

  test('Кириллица преобразуется в нижний регистр', () => {
    simulateInput(input, 'ПРИВЕТ');
    expect(input.value).toBe('привет');
  });
});

describe('7. Поле "ФИО" с data-mask="AA AA" и data-preset="text-separated"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AA AA" data-preset="text-separated">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "ab" -> "ab", remaining " AA"', () => {
    simulateInput(input, 'ab');
    expect(input.value).toBe('ab');
  });

  test('Ввод "ab cd" -> полное заполнение', () => {
    simulateInput(input, 'ab cd');
    expect(input.value).toBe('ab cd');
  });

  test('Ввод "abcd" -> автодобавление пробела', () => {
    simulateInput(input, 'abcd');
    expect(input.value).toBe('ab cd');
  });

  test('Ввод "a b" -> "a  b" (два пробела)', () => {
    simulateInput(input, 'a b');
    expect(input.value).toBe('a  b');
  });

  test('Backspace удаляет символ перед курсором', () => {
    simulateInput(input, 'ab cd');
    input.setSelectionRange(3, 3); // курсор после пробела
    simulateKey(input, 'Backspace');
    expect(input.value).toBe('ac d');
  });
});

describe('8. Поле "Дублирующиеся разделители" с data-mask="AA AA--AA..AA" и data-preset="text-separated"', () => {
  let input;

  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="ghost-mask-input" data-mask="AA AA--AA..AA" data-preset="text-separated">';
    input = document.querySelector('input');
    initGhostMask();
  });

  function simulateKey(input, key) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    input.dispatchEvent(event);
  }

  function simulateInput(input, text) {
    for (const char of text) {
      simulateKey(input, char);
    }
  }

  test('Ввод "ab" -> "ab", remaining " AA--AA..AA"', () => {
    simulateInput(input, 'ab');
    expect(input.value).toBe('ab');
  });

  test('Ввод "abc" -> "ab c", remaining "A--AA..AA"', () => {
    simulateInput(input, 'abc');
    expect(input.value).toBe('ab c');
  });

  test('Ввод "abcd" -> "ab cd", remaining "--AA..AA"', () => {
    simulateInput(input, 'abcd');
    expect(input.value).toBe('ab cd');
  });

  test('Ввод "abcde" -> "ab cd--e", remaining "A..AA"', () => {
    simulateInput(input, 'abcde');
    expect(input.value).toBe('ab cd--e');
  });

  test('Ввод "abcdefgh" -> полное заполнение', () => {
    simulateInput(input, 'abcdefgh');
    expect(input.value).toBe('ab cd--ef..gh');
  });

  test('Кириллица поддерживается', () => {
    simulateInput(input, 'Г1бдеф');
    expect(input.value).toBe('Г1 бд--еф');
  });

  test('Backspace работает с множественными разделителями', () => {
    simulateInput(input, 'ab cd');
    input.setSelectionRange(3, 3); // курсор после пробела
    simulateKey(input, 'Backspace');
    expect(input.value).toBe('ac d');
  });
});