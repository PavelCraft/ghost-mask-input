# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/mask-input.e2e.spec.js >> Ghost Mask Input E2E Tests >> Поле «ФИО» (mask: AA AA, preset: text-separated) >> Цепочка 11: "ab cd", курсор перед пробелом, delete (1) -> "ab d", "A"
- Location: e2e/mask-input.e2e.spec.js:928:9

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-mask="AA AA"][data-preset="text-separated"]').first()
Expected: "ab d"
Received: "a  c"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-mask="AA AA"][data-preset="text-separated"]').first()
    9 × locator resolved to <input type="text" placeholder=" " data-mask="AA AA" class="ghost-mask-input" data-preset="text-separated"/>
      - unexpected value "a  c"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "📞 Демо поля ввода текста" [level=2] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]: Просто текст
    - generic [ref=e7]:
      - textbox [ref=e8]:
        - /placeholder: " "
      - generic:
        - generic: AAAAA
  - generic [ref=e9]:
    - generic [ref=e10]: Поле ввода номера телефона
    - generic [ref=e11]:
      - generic [ref=e12]: 🇷🇺 +7
      - generic [ref=e13]:
        - textbox [ref=e14]:
          - /placeholder: " "
          - text: +7 (987) 654-32-10
        - generic:
          - generic: +7 (987) 654-32-10
  - generic [ref=e15]:
    - generic [ref=e16]: Код
    - generic [ref=e18]:
      - textbox [ref=e19]:
        - /placeholder: " "
      - generic:
        - generic: AAAA1111
  - generic [ref=e20]:
    - generic [ref=e21]: Серийный номер
    - generic [ref=e23]:
      - textbox [ref=e24]:
        - /placeholder: " "
      - generic:
        - generic: AAAA-1111-BBBB
  - generic [ref=e25]:
    - generic [ref=e26]: ФИО
    - generic [ref=e28]:
      - textbox [active] [ref=e29]:
        - /placeholder: " "
        - text: a c
      - generic:
        - generic: a c
        - generic: A
  - generic [ref=e30]:
    - generic [ref=e31]: Дублирующиеся разделители
    - generic [ref=e33]:
      - textbox [ref=e34]:
        - /placeholder: " "
      - generic:
        - generic: AA AA--AA..AA
  - generic [ref=e35]:
    - generic [ref=e36]: Верхний регистр
    - generic [ref=e38]:
      - textbox [ref=e39]:
        - /placeholder: " "
      - generic:
        - generic: AAAAAAAA
  - generic [ref=e40]:
    - generic [ref=e41]: Нижний регистр
    - generic [ref=e43]:
      - textbox [ref=e44]:
        - /placeholder: " "
      - generic:
        - generic: AAAAAAAA
```

# Test source

```ts
  840  |             const container = input.locator('..').locator('..');
  841  |             const remaining = container.locator('.ghost-remaining');
  842  |             
  843  |             await input.click();
  844  |             await input.fill('abcd');
  845  |             await expect(input).toHaveValue('ab cd');
  846  |             await expect(remaining).toHaveText('');
  847  |         });
  848  | 
  849  |         test('Цепочка 5: "a  cd" -> "a  cd", ""', async ({ page }) => {
  850  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  851  |             const container = input.locator('..').locator('..');
  852  |             const remaining = container.locator('.ghost-remaining');
  853  |             
  854  |             await input.click();
  855  |             await input.fill('a  cd');
  856  |             await expect(input).toHaveValue('a  cd');
  857  |             await expect(remaining).toHaveText('');
  858  |         });
  859  | 
  860  |         test('Цепочка 6: "ab" -> "ab", " AA"', async ({ page }) => {
  861  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  862  |             const container = input.locator('..').locator('..');
  863  |             const remaining = container.locator('.ghost-remaining');
  864  |             
  865  |             await input.click();
  866  |             await input.fill('ab');
  867  |             await expect(input).toHaveValue('ab');
  868  |             await expect(remaining).toHaveText(' AA');
  869  |         });
  870  | 
  871  |         test('Цепочка 7: "abc" -> "ab c", "A"', async ({ page }) => {
  872  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  873  |             const container = input.locator('..').locator('..');
  874  |             const remaining = container.locator('.ghost-remaining');
  875  |             
  876  |             await input.click();
  877  |             await input.fill('abc');
  878  |             await expect(input).toHaveValue('ab c');
  879  |             await expect(remaining).toHaveText('A');
  880  |         });
  881  | 
  882  |         test('Цепочка 8: цепочка "ab" -> "ab", " AA", "c" -> "ab c", "A", "d" -> "ab cd", ""', async ({ page }) => {
  883  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  884  |             const container = input.locator('..').locator('..');
  885  |             const remaining = container.locator('.ghost-remaining');
  886  |             
  887  |             await input.click();
  888  |             await input.fill('ab');
  889  |             await expect(input).toHaveValue('ab');
  890  |             await expect(remaining).toHaveText(' AA');
  891  |             
  892  |             await input.type('c');
  893  |             await expect(input).toHaveValue('ab c');
  894  |             await expect(remaining).toHaveText('A');
  895  |             
  896  |             await input.type('d');
  897  |             await expect(input).toHaveValue('ab cd');
  898  |             await expect(remaining).toHaveText('');
  899  |         });
  900  | 
  901  |         test('Цепочка 9: "ab", backspace (1) -> "a", " AA"', async ({ page }) => {
  902  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  903  |             const container = input.locator('..').locator('..');
  904  |             const remaining = container.locator('.ghost-remaining');
  905  |             
  906  |             await input.click();
  907  |             await input.fill('ab');
  908  |             await input.press('Backspace');
  909  |             await expect(input).toHaveValue('a');
  910  |             await expect(remaining).toHaveText('A AA');
  911  |         });
  912  | 
  913  |         test('Цепочка 10: "ab cd", курсор после пробела, backspace (1) -> "ac d", "A"', async ({ page }) => {
  914  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  915  |             const container = input.locator('..').locator('..');
  916  |             const remaining = container.locator('.ghost-remaining');
  917  |             
  918  |             await input.click();
  919  |             await input.fill('ab cd');
  920  |             // Курсор после пробела
  921  |             await input.press('ArrowLeft');
  922  |             await input.press('ArrowLeft');
  923  |             await input.press('Backspace');
  924  |             await expect(input).toHaveValue('ac d');
  925  |             await expect(remaining).toHaveText('A');
  926  |         });
  927  | 
  928  |         test('Цепочка 11: "ab cd", курсор перед пробелом, delete (1) -> "ab d", "A"', async ({ page }) => {
  929  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  930  |             const container = input.locator('..').locator('..');
  931  |             const remaining = container.locator('.ghost-remaining');
  932  |             
  933  |             await input.click();
  934  |             await input.fill('ab cd');
  935  |             // Курсор перед пробелом
  936  |             await input.press('ArrowLeft');
  937  |             await input.press('ArrowLeft');
  938  |             await input.press('ArrowLeft');
  939  |             await input.press('Delete');
> 940  |             await expect(input).toHaveValue('ab d');
       |                                 ^ Error: expect(locator).toHaveValue(expected) failed
  941  |             await expect(remaining).toHaveText('A');
  942  |         });
  943  | 
  944  |         test('Цепочка 12: "a  b" -> "a  b", "A"', async ({ page }) => {
  945  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  946  |             const container = input.locator('..').locator('..');
  947  |             const remaining = container.locator('.ghost-remaining');
  948  |             
  949  |             await input.click();
  950  |             await input.fill('a  b');
  951  |             await expect(input).toHaveValue('a  b');
  952  |             await expect(remaining).toHaveText('A');
  953  |         });
  954  | 
  955  |         test('Цепочка 13: "a b" -> "a  b", "A"', async ({ page }) => {
  956  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  957  |             const container = input.locator('..').locator('..');
  958  |             const remaining = container.locator('.ghost-remaining');
  959  |             
  960  |             await input.click();
  961  |             await input.fill('a b');
  962  |             await expect(input).toHaveValue('a  b');
  963  |             await expect(remaining).toHaveText('A');
  964  |         });
  965  | 
  966  |         test('Цепочка 14: "a b " -> "a  b ", ""', async ({ page }) => {
  967  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  968  |             const container = input.locator('..').locator('..');
  969  |             const remaining = container.locator('.ghost-remaining');
  970  |             
  971  |             await input.click();
  972  |             await input.fill('a b ');
  973  |             await expect(input).toHaveValue('a  b ');
  974  |             await expect(remaining).toHaveText('');
  975  |         });
  976  | 
  977  |         test('Цепочка 15: "a b  " -> "a  b ", ""', async ({ page }) => {
  978  |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  979  |             const container = input.locator('..').locator('..');
  980  |             const remaining = container.locator('.ghost-remaining');
  981  |             
  982  |             await input.click();
  983  |             await input.fill('a b  ');
  984  |             await expect(input).toHaveValue('a  b ');
  985  |             await expect(remaining).toHaveText('');
  986  |         });
  987  |     });
  988  | 
  989  | //     // ============================================================
  990  | //     // 8. Поле «Дублирующиеся разделители» с data-mask="AA AA--AA..AA" и data-preset="text-separated"
  991  | //     // ============================================================
  992  | //     test.describe('Поле «Дублирующиеся разделители» (mask: AA AA--AA..AA, preset: text-separated)', () => {
  993  | //         test('Цепочка 1: "ab  cde" -> "ab  c--de", ""', async ({ page }) => {
  994  | //             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  995  | //             const container = input.locator('..').locator('..');
  996  | //             const remaining = container.locator('.ghost-remaining');
  997  |             
  998  | //             await input.click();
  999  | //             await input.fill('ab  cde');
  1000 | //             await expect(input).toHaveValue('ab  c--de');
  1001 | //             await expect(remaining).toHaveText('..AA');
  1002 | //         });
  1003 | 
  1004 | //         test('Цепочка 2: "ab  c d g " -> "ab  c-- d..g ", ""', async ({ page }) => {
  1005 | //             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1006 | //             const container = input.locator('..').locator('..');
  1007 | //             const remaining = container.locator('.ghost-remaining');
  1008 |             
  1009 | //             await input.click();
  1010 | //             await input.fill('ab  c d g ');
  1011 | //             await expect(input).toHaveValue('ab  c-- d..g ');
  1012 | //             await expect(remaining).toHaveText('');
  1013 | //         });
  1014 | 
  1015 | //         test('Цепочка 3: "ab cdefgh" -> "ab cd--ef..gh", ""', async ({ page }) => {
  1016 | //             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1017 | //             const container = input.locator('..').locator('..');
  1018 | //             const remaining = container.locator('.ghost-remaining');
  1019 |             
  1020 | //             await input.click();
  1021 | //             await input.fill('ab cdefgh');
  1022 | //             await expect(input).toHaveValue('ab cd--ef..gh');
  1023 | //             await expect(remaining).toHaveText('');
  1024 | //         });
  1025 | 
  1026 | //         test('Цепочка 4: "         " -> "     --  ..  ", ""', async ({ page }) => {
  1027 | //             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1028 | //             const container = input.locator('..').locator('..');
  1029 | //             const remaining = container.locator('.ghost-remaining');
  1030 |             
  1031 | //             await input.click();
  1032 | //             await input.fill('         ');
  1033 | //             await expect(input).toHaveValue('     --  ..  ');
  1034 | //             await expect(remaining).toHaveText('');
  1035 | //         });
  1036 | 
  1037 | //         test('Цепочка 5: "a.b  .c,d " -> "ab  c--d ", "..AA"', async ({ page }) => {
  1038 | //             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1039 | //             const container = input.locator('..').locator('..');
  1040 | //             const remaining = container.locator('.ghost-remaining');
```