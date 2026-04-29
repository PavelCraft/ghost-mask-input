# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/mask-input.e2e.spec.js >> Ghost Mask Input E2E Tests >> Поле «Дублирующиеся разделители» (mask: AA AA--AA..AA, preset: text-separated) >> Цепочка 9: "abcd" -> "ab cd", "--AA..AA"
- Location: e2e/mask-input.e2e.spec.js:1081:9

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first()
Expected: "ab cd"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first()
    2 × locator resolved to <input type="text" placeholder=" " class="ghost-mask-input" data-mask="AA AA--AA..AA" data-preset="text-separated"/>
      - unexpected value "abcd"
    7 × locator resolved to <input type="text" placeholder=" " class="ghost-mask-input" data-mask="AA AA--AA..AA" data-preset="text-separated"/>
      - unexpected value ""

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
  1011 |             await expect(input).toHaveValue('ab  c-- d.. g');
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
> 1088 |             await expect(input).toHaveValue('ab cd');
       |                                 ^ Error: expect(locator).toHaveValue(expected) failed
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
  1112 |         });
  1113 | 
  1114 |         test('Цепочка 12: "abcdefg" -> "ab cd--ef..g", "A"', async ({ page }) => {
  1115 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1116 |             const container = input.locator('..').locator('..');
  1117 |             const remaining = container.locator('.ghost-remaining');
  1118 |             
  1119 |             await input.click();
  1120 |             await input.fill('abcdefg');
  1121 |             await expect(input).toHaveValue('ab cd--ef..g');
  1122 |             await expect(remaining).toHaveText('A');
  1123 |         });
  1124 | 
  1125 |         test('Цепочка 13: "abcdefgh" -> "ab cd--ef..gh", ""', async ({ page }) => {
  1126 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1127 |             const container = input.locator('..').locator('..');
  1128 |             const remaining = container.locator('.ghost-remaining');
  1129 |             
  1130 |             await input.click();
  1131 |             await input.fill('abcdefgh');
  1132 |             await expect(input).toHaveValue('ab cd--ef..gh');
  1133 |             await expect(remaining).toHaveText('');
  1134 |         });
  1135 | 
  1136 |         test('Цепочка 14: "ab c", курсор после пробела, "d" -> "ab dc", "--AA..AA"', async ({ page }) => {
  1137 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1138 |             const container = input.locator('..').locator('..');
  1139 |             const remaining = container.locator('.ghost-remaining');
  1140 |             
  1141 |             await input.click();
  1142 |             await input.fill('ab c');
  1143 |             // Курсор после пробела
  1144 |             await input.press('ArrowLeft');
  1145 |             await input.type('d');
  1146 |             await expect(input).toHaveValue('ab dc');
  1147 |             await expect(remaining).toHaveText('--AA..AA');
  1148 |         });
  1149 | 
  1150 |         test('Цепочка 15: "ab cd", курсор после c, backspace (1) -> "ab d", "A--AA..AA"', async ({ page }) => {
  1151 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1152 |             const container = input.locator('..').locator('..');
  1153 |             const remaining = container.locator('.ghost-remaining');
  1154 |             
  1155 |             await input.click();
  1156 |             await input.fill('ab cd');
  1157 |             // Курсор после c
  1158 |             await input.press('ArrowLeft');
  1159 |             await input.press('Backspace');
  1160 |             await expect(input).toHaveValue('ab d');
  1161 |             await expect(remaining).toHaveText('A--AA..AA');
  1162 |         });
  1163 | 
  1164 |         test('Цепочка 16: "ab cd", курсор после пробела, backspace (1) -> "ac d", "A--AA..AA"', async ({ page }) => {
  1165 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1166 |             const container = input.locator('..').locator('..');
  1167 |             const remaining = container.locator('.ghost-remaining');
  1168 |             
  1169 |             await input.click();
  1170 |             await input.fill('ab cd');
  1171 |             // Курсор после пробела
  1172 |             await input.press('ArrowLeft');
  1173 |             await input.press('ArrowLeft');
  1174 |             await input.press('Backspace');
  1175 |             await expect(input).toHaveValue('ac d');
  1176 |             await expect(remaining).toHaveText('A--AA..AA');
  1177 |         });
  1178 | 
  1179 |         test('Цепочка 17: "ab cd--ef", курсор после первого дефиса, delete (1) -> "ab cd--f", "A..AA"', async ({ page }) => {
  1180 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1181 |             const container = input.locator('..').locator('..');
  1182 |             const remaining = container.locator('.ghost-remaining');
  1183 |             
  1184 |             await input.click();
  1185 |             await input.fill('ab cd--ef');
  1186 |             // Курсор после первого дефиса (position 7)
  1187 |             await input.press('Home');
  1188 |             for (let i = 0; i < 6; i++) {
```