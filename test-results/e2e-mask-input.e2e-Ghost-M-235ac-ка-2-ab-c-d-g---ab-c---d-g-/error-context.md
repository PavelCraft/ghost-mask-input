# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/mask-input.e2e.spec.js >> Ghost Mask Input E2E Tests >> Поле «Дублирующиеся разделители» (mask: AA AA--AA..AA, preset: text-separated) >> Цепочка 2: "ab  c d g " -> "ab  c-- d.. g", ""
- Location: e2e/mask-input.e2e.spec.js:1004:9

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first()
Expected: "ab  c-- d..g "
Received: "ab  c-- d.. g"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first()
    9 × locator resolved to <input type="text" placeholder=" " class="ghost-mask-input" data-mask="AA AA--AA..AA" data-preset="text-separated"/>
      - unexpected value "ab  c-- d.. g"

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
      - textbox [ref=e29]:
        - /placeholder: " "
      - generic:
        - generic: AA AA
  - generic [ref=e30]:
    - generic [ref=e31]: Дублирующиеся разделители
    - generic [ref=e33]:
      - textbox [active] [ref=e34]:
        - /placeholder: " "
        - text: ab c-- d.. g
      - generic:
        - generic: ab c-- d.. g
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
  940  |             await expect(input).toHaveValue('ab d');
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
  989  |     // ============================================================
  990  |     // 8. Поле «Дублирующиеся разделители» с data-mask="AA AA--AA..AA" и data-preset="text-separated"
  991  |     // ============================================================
  992  |     test.describe('Поле «Дублирующиеся разделители» (mask: AA AA--AA..AA, preset: text-separated)', () => {
  993  |         test('Цепочка 1: "ab  cde" -> "ab  c--de", ""', async ({ page }) => {
  994  |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  995  |             const container = input.locator('..').locator('..');
  996  |             const remaining = container.locator('.ghost-remaining');
  997  |             
  998  |             await input.click();
  999  |             await input.fill('ab  cde');
  1000 |             await expect(input).toHaveValue('ab  c--de');
  1001 |             await expect(remaining).toHaveText('..AA');
  1002 |         });
  1003 | 
  1004 |         test('Цепочка 2: "ab  c d g " -> "ab  c-- d.. g", ""', async ({ page }) => {
  1005 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1006 |             const container = input.locator('..').locator('..');
  1007 |             const remaining = container.locator('.ghost-remaining');
  1008 |             
  1009 |             await input.click();
  1010 |             await input.fill('ab  c d g ');
> 1011 |             await expect(input).toHaveValue('ab  c-- d..g ');
       |                                 ^ Error: expect(locator).toHaveValue(expected) failed
  1012 |             await expect(remaining).toHaveText('');
  1013 |         });
  1014 | 
  1015 |         test('Цепочка 3: "ab cdefgh" -> "ab cd--ef..gh", ""', async ({ page }) => {
  1016 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1017 |             const container = input.locator('..').locator('..');
  1018 |             const remaining = container.locator('.ghost-remaining');
  1019 |             
  1020 |             await input.click();
  1021 |             await input.fill('ab cdefgh');
  1022 |             await expect(input).toHaveValue('ab cd--ef..gh');
  1023 |             await expect(remaining).toHaveText('');
  1024 |         });
  1025 | 
  1026 |         test('Цепочка 4: "         " -> "     --  ..  ", ""', async ({ page }) => {
  1027 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1028 |             const container = input.locator('..').locator('..');
  1029 |             const remaining = container.locator('.ghost-remaining');
  1030 |             
  1031 |             await input.click();
  1032 |             await input.fill('         ');
  1033 |             await expect(input).toHaveValue('     --  ..  ');
  1034 |             await expect(remaining).toHaveText('');
  1035 |         });
  1036 | 
  1037 |         test('Цепочка 5: "a.b  .c,d " -> "ab  c--d ", "..AA"', async ({ page }) => {
  1038 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1039 |             const container = input.locator('..').locator('..');
  1040 |             const remaining = container.locator('.ghost-remaining');
  1041 |             
  1042 |             await input.click();
  1043 |             await input.fill('a.b  .c,d ');
  1044 |             await expect(input).toHaveValue('ab  c--d ');
  1045 |             await expect(remaining).toHaveText('..AA');
  1046 |         });
  1047 | 
  1048 |         test('Цепочка 6: "abcdefghi" -> "ab cd--ef..gh", ""', async ({ page }) => {
  1049 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1050 |             const container = input.locator('..').locator('..');
  1051 |             const remaining = container.locator('.ghost-remaining');
  1052 |             
  1053 |             await input.click();
  1054 |             await input.fill('abcdefghi');
  1055 |             await expect(input).toHaveValue('ab cd--ef..gh');
  1056 |             await expect(remaining).toHaveText('');
  1057 |         });
  1058 | 
  1059 |         test('Цепочка 7: "ab" -> "ab", " AA--AA..AA"', async ({ page }) => {
  1060 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1061 |             const container = input.locator('..').locator('..');
  1062 |             const remaining = container.locator('.ghost-remaining');
  1063 |             
  1064 |             await input.click();
  1065 |             await input.fill('ab');
  1066 |             await expect(input).toHaveValue('ab');
  1067 |             await expect(remaining).toHaveText(' AA--AA..AA');
  1068 |         });
  1069 | 
  1070 |         test('Цепочка 8: "abc" -> "ab c", "A--AA..AA"', async ({ page }) => {
  1071 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1072 |             const container = input.locator('..').locator('..');
  1073 |             const remaining = container.locator('.ghost-remaining');
  1074 |             
  1075 |             await input.click();
  1076 |             await input.fill('abc');
  1077 |             await expect(input).toHaveValue('ab c');
  1078 |             await expect(remaining).toHaveText('A--AA..AA');
  1079 |         });
  1080 | 
  1081 |         test('Цепочка 9: "abcd" -> "ab cd", "--AA..AA"', async ({ page }) => {
  1082 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1083 |             const container = input.locator('..').locator('..');
  1084 |             const remaining = container.locator('.ghost-remaining');
  1085 |             
  1086 |             await input.click();
  1087 |             await input.fill('abcd');
  1088 |             await expect(input).toHaveValue('ab cd');
  1089 |             await expect(remaining).toHaveText('--AA..AA');
  1090 |         });
  1091 | 
  1092 |         test('Цепочка 10: "abcde" -> "ab cd--e", "A..AA"', async ({ page }) => {
  1093 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1094 |             const container = input.locator('..').locator('..');
  1095 |             const remaining = container.locator('.ghost-remaining');
  1096 |             
  1097 |             await input.click();
  1098 |             await input.fill('abcde');
  1099 |             await expect(input).toHaveValue('ab cd--e');
  1100 |             await expect(remaining).toHaveText('A..AA');
  1101 |         });
  1102 | 
  1103 |         test('Цепочка 11: "Г1бdef" -> "Г1 бd--ef", "..AA"', async ({ page }) => {
  1104 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1105 |             const container = input.locator('..').locator('..');
  1106 |             const remaining = container.locator('.ghost-remaining');
  1107 |             
  1108 |             await input.click();
  1109 |             await input.fill('Г1бdef');
  1110 |             await expect(input).toHaveValue('Г1 бd--ef');
  1111 |             await expect(remaining).toHaveText('..AA');
```