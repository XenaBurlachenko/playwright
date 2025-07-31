import { test, expect } from '@playwright/test';
//import * as allure from 'allure-playwright';
import * as allure from "allure-js-commons";
import { Status } from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { url } from 'inspector/promises';


const credentials = [
    { func: 'summ', a: '100', b: '88888888888888888888', fraction: '', button: 'save' },
    { func: 'summ', a: '0', b: '0', fraction: '0', button: 'clear' },
    { func: 'summ', a: '1', b: '1.0', fraction: '1', button: 'surprise' },
    { func: 'summ', a: '', b: '', fraction: '10', button: 'save' },
    { func: 'summ', a: '-12', b: '-14.000000000000001', fraction: '14', button: 'clear' },
    { func: 'summ', a: '0.1', b: '2/1', fraction: '13', button: 'surprise' },
    { func: 'summ', a: '8.111111111111111111111111111111', b: 'a', fraction: '', button: 'save'}, //'a' - latin
    { func: 'summ', a: '-12', b: '2/1', fraction: '1', button: 'clear' },
    { func: 'summ', a: '0.1', b: 'a', fraction: '10', button: 'surprise' },
    { func: 'summ', a: '8.111111111111111111111111111111', b: '88888888888888888888', fraction: '14', button: 'save' },
    { func: 'summ', a: '100', b: '0', fraction: '13', button: 'clear' },
    { func: 'summ', a: '0', b: '1.0', fraction: '', button: 'surprise' },
    { func: 'summ', a: '1', b: '', fraction: '', button: 'save' },
    { func: 'summ', a: '', b: '-14.000000000000001', fraction: '0', button: 'save' },

    { func: 'sub', a: '0', b: '', fraction: '14', button: 'surprise' },
    { func: 'sub', a: '1', b: '-14.000000000000001', fraction: '13', button: 'save' },
    { func: 'sub', a: '', b: '2/1', fraction: '', button: 'clear' },
    { func: 'sub', a: '-12', b: 'a', fraction: '', button: 'surprise' },
    { func: 'sub', a: '1.0', b: '88888888888888888888', fraction: '0', button: 'save' },
    { func: 'sub', a: '100', b: '1.0', fraction: '10', button: 'clear' },
    { func: 'sub', a: '8.11111111111111', b: '0', fraction: '1', button: 'save' },
    { func: 'sub', a: '0.1', b: '0', fraction: '', button: 'save' },
    { func: 'sub', a: '100', b: '', fraction: '0', button: 'surprise' },
    { func: 'sub', a: '0', b: '-14.000000000000001', fraction: '1', button: 'save' },
    { func: 'sub', a: '1', b: '2/1', fraction: '10', button: 'save' },
    { func: 'sub', a: '', b: 'a', fraction: '14', button: 'clear' },
    { func: 'sub', a: '-12', b: '88888888888888888888', fraction: '13', button: 'surprise' },

    { func: 'mul', a: '1', b: 'a', fraction: '0', button: 'clear' },
    { func: 'mul', a: '', b: '88888888888888888888', fraction: '1', button: 'surprise' },
    { func: 'mul', a: '-12', b: '0', fraction: '14', button: 'save' },
    { func: 'mul', a: '8.111111111111111111111111111111', b: '', fraction: '13', button: 'clear' },
    { func: 'mul', a: '100', b: '-14.000000000000001', fraction: '', button: 'surprise' },
    { func: 'mul', a: '0', b: '2/1', fraction: '', button: 'save' },
    { func: 'mul', a: '0.1', b: '1.0', fraction: '14', button: 'save' },
    { func: 'mul', a: '8.111111111111111111111111111111', b: '-14.000000000000001', fraction: '10', button: 'surprise' },
    { func: 'mul', a: '100', b: '2/1', fraction: '14', button: 'save' },
    { func: 'mul', a: '0', b: 'a', fraction: '13', button: 'save' },
    { func: 'mul', a: '1', b: '88888888888888888888', fraction: '', button: 'clear' },
    { func: 'mul', a: '', b: '0', fraction: '', button: 'surprise' },
    { func: 'mul', a: '-12', b: '1.0', fraction: '0', button: 'save' },
    { func: 'mul', a: '0.1', b: '', fraction: '1', button: 'clear' },

    { func: 'div', a: '8.111111111111111111111111111111', b: '1.0', fraction: '13', button: 'save' },
    { func: 'div', a: '-12', b: '', fraction: '', button: 'save' },
    { func: 'div', a: '0.1', b: '-14.000000000000001', fraction: '', button: 'clear' },
    { func: 'div', a: '8.111111111111111111111111111111', b: '2/1', fraction: '0', button: 'surprise' },
    { func: 'div', a: '100', b: 'a', fraction: '1', button: 'save' },
    { func: 'div', a: '0', b: '88888888888888888888', fraction: '10', button: 'clear' },
    { func: 'div', a: '1', b: '0', fraction: '14', button: 'surprise' },
];
test.describe("Calculation", () => {
        for (const { func, a, b, fraction, button } of credentials) {
        test(`${func} ${a} and ${b} fracting by ${fraction} and clicking ${button}`, async ({ page }) => {
            //Allure settings
            await allure.epic('Calculation');
            await allure.story(`${func}`);
            await allure.label('owner', 'Me');
            await allure.displayName(`${a} and ${b} ${button}`);
            await allure.severity('critical');
            await allure.suite(`${button}`);

            //ввод данных
            await page.goto('https://svyatoslav.biz/testlab/calc/');
            await page.locator('input[name="a"]').click();
            await page.locator('input[name="a"]').fill(a);
            await page.locator('input[name="b"]').click();
            await page.locator('input[name="b"]').fill(b);

            if (func === 'summ') {
                await page.getByRole('radio').first().check();
            }
            else if (func === 'sub') {
                await page.getByRole('radio').nth(1).check();;
            }
            else if (func === 'mul') {
                await page.getByRole('radio').nth(2).check();;
            }
            else if (func === 'div') {
                await page.getByRole('radio').nth(3).check();;
            }

            await page.locator('input[name="f"]').click();         
            await page.locator('input[name="f"]').fill(fraction);
            await page.getByRole('combobox').selectOption(button);
            await page.getByRole('button', { name: 'GO!' }).click();

            

            function roundNumber(num, decimalPlaces) {
                const factor = Math.pow(10, decimalPlaces);
                return Math.round(num * factor) / factor;
            }

            if (func === 'summ') {
                if (b === 'a') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} + ${b} = ${a} (with ${fraction} fraction digits)`);
                }
                else if (b === '2/1') {
                    const summ = Number(a) + 2 / 1;
                    const roundedSumm = roundNumber(summ, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} + ${b} =  ${roundedSumm} (with ${fraction} fraction digits)`);
                }
                else if (a.trim() === '' && b.trim() === '') {
                    await expect(page.locator('b')).toContainText(`Result:   +   = 0 (with ${fraction} fraction digits)`);
                }
                else if (b === '') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} + ${b} =  (with ${fraction} fraction digits)`);
                }
                else if (a === '') {
                    const summ = Number(a) + Number(b);
                    const roundedSumm = roundNumber(summ, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} + ${b} = ${roundedSumm} (with ${fraction} fraction digits)`);
                }
                    else {
                    const summ = Number(a) + Number(b);
                    const roundedSumm = roundNumber(summ, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} + ${b} =  ${roundedSumm} (with ${fraction} fraction digits)`);
                }
            }

            else if (func === 'sub') {
                if (b === 'a') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} - ${b} = ${a} (with ${fraction} fraction digits)`);
                }
                else if (a === '') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} - ${b} = ${a} (with ${fraction} fraction digits)`);
                }
                else if (b === '2/1') {
                    const sub = Number(a) - 2 / 1;
                    const roundedSub = roundNumber(sub, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} - ${b} =  ${roundedSub} (with ${fraction} fraction digits)`);
                }
                else if (a.trim() === '' && b.trim() === '') {
                    await expect(page.locator('b')).toContainText(`Result:   -   = 0 (with ${fraction} fraction digits)`);
                }
                else if (b === '') {
                    const sub = Number(a) - 0;
                    const roundedSub = roundNumber(sub, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} - ${b} = ${roundedSub} (with ${fraction} fraction digits)`);
                }
                else {
                    const sub = Number(a) - Number(b);
                    const roundedSub = roundNumber(sub, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} - ${b} =  ${roundedSub} (with ${fraction} fraction digits)`);
                }
            }

            else if (func === 'mul') {
                const specialCases = {
                    'mul': {
                        'a:empty': {
                            'b:0': '=  (with',
                            'b:88888888888888888888': '= 0 (with',
                            'default': '=  (with'
                        }
                    }
                };
                if (b === 'a') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} * ${b} = 0 (with ${fraction} fraction digits)`);
                }
                else if (a === '') {
                    const expected = specialCases.mul['a:empty'][`b:${b}`] || specialCases.mul['a:empty'].default;
                    await expect(page.locator('b')).toContainText(`Result: ${a} * ${b} ${expected} ${fraction} fraction digits)`)
                }
                else if (b === '2/1') {
                    const mul = Number(a) * (2 / 1);
                    const roundedMul = roundNumber(mul, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} * ${b} =  ${roundedMul} (with ${fraction} fraction digits)`);
                }
                else if (a.trim() === '' && b.trim() === '') {
                    await expect(page.locator('b')).toContainText(`Result:   *   = 0 (with ${fraction} fraction digits)`);
                }
                else if (b === '') {
                    const mul = Number(a) * 0;
                    const roundedMul = roundNumber(mul, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} * ${b} = ${roundedMul} (with ${fraction} fraction digits)`);
                }
                else {
                    const mul = Number(a) * Number(b);
                    const roundedMul = roundNumber(mul, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} * ${b} =  ${roundedMul} (with ${fraction} fraction digits)`);
                }
            }
            if (func === 'div') {
                if (b === 'a') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} / ${b} = INF (with ${fraction} fraction digits)`);
                }
                else if (b === '2/1') {
                    const summ = Number(a) / (2 / 1);
                    const roundedSumm = roundNumber(summ, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} / ${b} =  ${roundedSumm} (with ${fraction} fraction digits)`);
                }
                else if (a.trim() === '' && b.trim() === '') {
                    await expect(page.locator('b')).toContainText(`Result:   /   = 0 (with ${fraction} fraction digits)`);
                }
                else if (b === '') {
                    await expect(page.locator('b')).toContainText(`Result: ${a} / ${b} =  (with ${fraction} fraction digits)`);
                }
                else if (a === '') {
                    const summ = Number(a) / Number(b);
                    const roundedSumm = roundNumber(summ, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} / ${b} = ${roundedSumm} (with ${fraction} fraction digits)`);
                }
                else if (b === '0') {
                    await expect(page.locator('b')).toContainText(`Division by Zero.`);
                }
                else {
                    const summ = Number(a) / Number(b);
                    const roundedSumm = roundNumber(summ, Number(fraction) || 0);
                    await expect(page.locator('b')).toContainText(`Result: ${a} / ${b} = ${roundedSumm} (with ${fraction} fraction digits)`);
                }
            }

            if (button === 'clear') {
                await expect(page.locator('input[name="a"]')).toBeEmpty();
                await expect(page.locator('input[name="b"]')).toBeEmpty();
                await expect(page.locator('input[name="f"]')).toBeEmpty();
                await expect(page.getByRole('radio').first()).not.toBeChecked();
                await expect(page.getByRole('radio').nth(1)).not.toBeChecked();
                await expect(page.getByRole('radio').nth(2)).not.toBeChecked();
                await expect(page.getByRole('radio').nth(3)).not.toBeChecked();
            }

            if (button === 'surprise') {
                await expect(page.locator('input[name="a"]')).not.toHaveValue(a);
                await expect(page.locator('input[name="b"]')).not.toHaveValue(b);
               // await expect(page.locator('input[name="f"]')).toHaveValue(
                //     expect.not.stringContaining(fraction).or(expect.toBe('0')));
                const fValue = await page.locator('input[name="f"]').inputValue();

                // Проверка что значение не содержит fraction ИЛИ равно '0'
                if (fValue === '0') {
                    // Если 0 - автоматически валидно
                } else {
                    // Если не 0 - проверяем что не равно fraction
                    expect(fValue).not.toBe(fraction);
                }
                //if (fValue !== '0') {
                    //expect(fValue).not.toContain(fraction);
                //}
            }

            if (button === 'save') {
                await expect(page.locator('input[name="a"]')).toHaveValue(a);
                await expect(page.locator('input[name="b"]')).toHaveValue(b);
                await expect(page.locator('input[name="f"]')).toHaveValue(fraction);
            }
        });
    }
})