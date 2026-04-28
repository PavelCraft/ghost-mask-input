# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/mask-input.e2e.spec.js >> Ghost Mask Input E2E Tests >> Поле «ФИО» (mask: AA AA, preset: text-separated) >> Цепочка 1: "a   b" -> "a   b", ""
- Location: e2e/mask-input.e2e.spec.js:805:9

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-mask="AA AA"][data-preset="text-separated"]').first()
Expected: "a   b"
Received: "a   "
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-mask="AA AA"][data-preset="text-separated"]').first()
    9 × locator resolved to <input type="text" placeholder=" " data-mask="AA AA" class="ghost-mask-input" data-preset="text-separated"/>
      - unexpected value "a   "

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
        - text: a
      - generic:
        - generic: a
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
  712 |     //         await expect(input).toHaveValue('abc');
  713 |     //         await expect(remaining).toHaveText('AAAAA');
  714 |     //     });
  715 | 
  716 |     //     test('Цепочка 2: "ABCDE" -> "abcde", "AAA"', async ({ page }) => {
  717 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  718 |     //         const container = input.locator('..').locator('..');
  719 |     //         const remaining = container.locator('.ghost-remaining');
  720 |             
  721 |     //         await input.click();
  722 |     //         await input.fill('ABCDE');
  723 |     //         await expect(input).toHaveValue('abcde');
  724 |     //         await expect(remaining).toHaveText('AAA');
  725 |     //     });
  726 | 
  727 |     //     test('Цепочка 3: "AbCdEfGh" -> "abcdefgh", ""', async ({ page }) => {
  728 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  729 |     //         const container = input.locator('..').locator('..');
  730 |     //         const remaining = container.locator('.ghost-remaining');
  731 |             
  732 |     //         await input.click();
  733 |     //         await input.fill('AbCdEfGh');
  734 |     //         await expect(input).toHaveValue('abcdefgh');
  735 |     //         await expect(remaining).toHaveText('');
  736 |     //     });
  737 | 
  738 |     //     test('Цепочка 4: "ABCDEFGHI" -> "abcdefgh", ""', async ({ page }) => {
  739 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  740 |     //         const container = input.locator('..').locator('..');
  741 |     //         const remaining = container.locator('.ghost-remaining');
  742 |             
  743 |     //         await input.click();
  744 |     //         await input.fill('ABCDEFGHI');
  745 |     //         await expect(input).toHaveValue('abcdefgh');
  746 |     //         await expect(remaining).toHaveText('');
  747 |     //     });
  748 | 
  749 |     //     test('Цепочка 5: "ABC", курсор после B, backspace (1) -> "ac", "AAAAAA"', async ({ page }) => {
  750 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  751 |     //         const container = input.locator('..').locator('..');
  752 |     //         const remaining = container.locator('.ghost-remaining');
  753 |             
  754 |     //         await input.click();
  755 |     //         await input.fill('ABC');
  756 |     //         // Курсор после B
  757 |     //         await input.press('ArrowLeft');
  758 |     //         await input.press('Backspace');
  759 |     //         await expect(input).toHaveValue('ac');
  760 |     //         await expect(remaining).toHaveText('AAAAAA');
  761 |     //     });
  762 | 
  763 |     //     test('Цепочка 6: "ABC", курсор после A, delete (1) -> "ac", "AAAAAA"', async ({ page }) => {
  764 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  765 |     //         const container = input.locator('..').locator('..');
  766 |     //         const remaining = container.locator('.ghost-remaining');
  767 |             
  768 |     //         await input.click();
  769 |     //         await input.fill('ABC');
  770 |     //         // Курсор после A
  771 |     //         await input.press('ArrowLeft');
  772 |     //         await input.press('ArrowLeft');
  773 |     //         await input.press('Delete');
  774 |     //         await expect(input).toHaveValue('ac');
  775 |     //         await expect(remaining).toHaveText('AAAAAA');
  776 |     //     });
  777 | 
  778 |     //     test('Цепочка 7: "123" -> "123", "AAAAA"', async ({ page }) => {
  779 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  780 |     //         const container = input.locator('..').locator('..');
  781 |     //         const remaining = container.locator('.ghost-remaining');
  782 |             
  783 |     //         await input.click();
  784 |     //         await input.fill('123');
  785 |     //         await expect(input).toHaveValue('123');
  786 |     //         await expect(remaining).toHaveText('AAAAA');
  787 |     //     });
  788 | 
  789 |     //     test('Цепочка 8: "ТЫ ДАЛА?" -> "ты дала?", ""', async ({ page }) => {
  790 |     //         const input = page.locator('[data-mask="AAAAAAAA"][data-preset="lower-text"]').first();
  791 |     //         const container = input.locator('..').locator('..');
  792 |     //         const remaining = container.locator('.ghost-remaining');
  793 |             
  794 |     //         await input.click();
  795 |     //         await input.fill('ТЫ ДАЛА?');
  796 |     //         await expect(input).toHaveValue('ты дала?');
  797 |     //         await expect(remaining).toHaveText('');
  798 |     //     });
  799 |     // });
  800 | 
  801 |     // ============================================================
  802 |     // 7. Поле «ФИО» с data-mask="AA AA" и data-preset="text-separated"
  803 |     // ============================================================
  804 |     test.describe('Поле «ФИО» (mask: AA AA, preset: text-separated)', () => {
  805 |         test('Цепочка 1: "a   b" -> "a   b", ""', async ({ page }) => {
  806 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  807 |             const container = input.locator('..').locator('..');
  808 |             const remaining = container.locator('.ghost-remaining');
  809 |             
  810 |             await input.click();
  811 |             await input.fill('a   b');
> 812 |             await expect(input).toHaveValue('a   b');
      |                                 ^ Error: expect(locator).toHaveValue(expected) failed
  813 |             await expect(remaining).toHaveText('');
  814 |         });
  815 | 
  816 |         test('Цепочка 2: "ab  c" -> "ab  c", ""', async ({ page }) => {
  817 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  818 |             const container = input.locator('..').locator('..');
  819 |             const remaining = container.locator('.ghost-remaining');
  820 |             
  821 |             await input.click();
  822 |             await input.fill('ab  c');
  823 |             await expect(input).toHaveValue('ab  c');
  824 |             await expect(remaining).toHaveText('');
  825 |         });
  826 | 
  827 |         test('Цепочка 3: "ab cd" -> "ab cd", ""', async ({ page }) => {
  828 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  829 |             const container = input.locator('..').locator('..');
  830 |             const remaining = container.locator('.ghost-remaining');
  831 |             
  832 |             await input.click();
  833 |             await input.fill('ab cd');
  834 |             await expect(input).toHaveValue('ab cd');
  835 |             await expect(remaining).toHaveText('');
  836 |         });
  837 | 
  838 |         test('Цепочка 4: "abcd" -> "ab cd", ""', async ({ page }) => {
  839 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  840 |             const container = input.locator('..').locator('..');
  841 |             const remaining = container.locator('.ghost-remaining');
  842 |             
  843 |             await input.click();
  844 |             await input.fill('abcd');
  845 |             await expect(input).toHaveValue('ab cd');
  846 |             await expect(remaining).toHaveText('');
  847 |         });
  848 | 
  849 |         test('Цепочка 5: "a  cd" -> "a  cd", ""', async ({ page }) => {
  850 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  851 |             const container = input.locator('..').locator('..');
  852 |             const remaining = container.locator('.ghost-remaining');
  853 |             
  854 |             await input.click();
  855 |             await input.fill('a  cd');
  856 |             await expect(input).toHaveValue('a  cd');
  857 |             await expect(remaining).toHaveText('');
  858 |         });
  859 | 
  860 |         test('Цепочка 6: "ab" -> "ab", " AA"', async ({ page }) => {
  861 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  862 |             const container = input.locator('..').locator('..');
  863 |             const remaining = container.locator('.ghost-remaining');
  864 |             
  865 |             await input.click();
  866 |             await input.fill('ab');
  867 |             await expect(input).toHaveValue('ab');
  868 |             await expect(remaining).toHaveText(' AA');
  869 |         });
  870 | 
  871 |         test('Цепочка 7: "abc" -> "ab c", "A"', async ({ page }) => {
  872 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  873 |             const container = input.locator('..').locator('..');
  874 |             const remaining = container.locator('.ghost-remaining');
  875 |             
  876 |             await input.click();
  877 |             await input.fill('abc');
  878 |             await expect(input).toHaveValue('ab c');
  879 |             await expect(remaining).toHaveText('A');
  880 |         });
  881 | 
  882 |         test('Цепочка 8: цепочка "ab" -> "ab", " AA", "c" -> "ab c", "A", "d" -> "ab cd", ""', async ({ page }) => {
  883 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  884 |             const container = input.locator('..').locator('..');
  885 |             const remaining = container.locator('.ghost-remaining');
  886 |             
  887 |             await input.click();
  888 |             await input.fill('ab');
  889 |             await expect(input).toHaveValue('ab');
  890 |             await expect(remaining).toHaveText(' AA');
  891 |             
  892 |             await input.type('c');
  893 |             await expect(input).toHaveValue('ab c');
  894 |             await expect(remaining).toHaveText('A');
  895 |             
  896 |             await input.type('d');
  897 |             await expect(input).toHaveValue('ab cd');
  898 |             await expect(remaining).toHaveText('');
  899 |         });
  900 | 
  901 |         test('Цепочка 9: "ab", backspace (1) -> "a", " AA"', async ({ page }) => {
  902 |             const input = page.locator('[data-mask="AA AA"][data-preset="text-separated"]').first();
  903 |             const container = input.locator('..').locator('..');
  904 |             const remaining = container.locator('.ghost-remaining');
  905 |             
  906 |             await input.click();
  907 |             await input.fill('ab');
  908 |             await input.press('Backspace');
  909 |             await expect(input).toHaveValue('a');
  910 |             await expect(remaining).toHaveText('A AA');
  911 |         });
  912 | 
```