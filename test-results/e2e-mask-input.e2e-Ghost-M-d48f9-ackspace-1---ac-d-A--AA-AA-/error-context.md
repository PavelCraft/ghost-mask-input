# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/mask-input.e2e.spec.js >> Ghost Mask Input E2E Tests >> Поле «Дублирующиеся разделители» (mask: AA AA--AA..AA, preset: text-separated) >> Цепочка 16: "ab cd", курсор после пробела, backspace (1) -> "ac d", "A--AA..AA"
- Location: e2e/mask-input.e2e.spec.js:1164:9

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first()
Expected: "ac d"
Received: "ab cd"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first()
    9 × locator resolved to <input type="text" placeholder=" " class="ghost-mask-input" data-mask="AA AA--AA..AA" data-preset="text-separated"/>
      - unexpected value "ab cd"

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
        - text: ab cd
      - generic:
        - generic: ab cd
        - generic: "--AA..AA"
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
> 1175 |             await expect(input).toHaveValue('ac d');
       |                                 ^ Error: expect(locator).toHaveValue(expected) failed
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
  1189 |                 await input.press('ArrowRight');
  1190 |             }
  1191 |             await input.press('Delete');
  1192 |             await expect(input).toHaveValue('ab cd--f');
  1193 |             await expect(remaining).toHaveText('A..AA');
  1194 |         });
  1195 | 
  1196 |         test('Цепочка 18: "ab cd--ef", курсор после первого дефиса, backspace (1) -> "ab ce--f", "A..AA"', async ({ page }) => {
  1197 |             const input = page.locator('[data-mask="AA AA--AA..AA"][data-preset="text-separated"]').first();
  1198 |             const container = input.locator('..').locator('..');
  1199 |             const remaining = container.locator('.ghost-remaining');
  1200 |             
  1201 |             await input.click();
  1202 |             await input.fill('ab cd--ef');
  1203 |             // Курсор после первого дефиса (position 7)
  1204 |             await input.press('Home');
  1205 |             for (let i = 0; i < 6; i++) {
  1206 |                 await input.press('ArrowRight');
  1207 |             }
  1208 |             await input.press('Backspace');
  1209 |             await expect(input).toHaveValue('ab ce--f');
  1210 |             await expect(remaining).toHaveText('A..AA');
  1211 |         });
  1212 |     });
  1213 | });
```