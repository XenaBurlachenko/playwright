import { test, expect } from '@playwright/test';
//import * as allure from 'allure-playwright';
import * as allure from "allure-js-commons";
import { Status } from "allure-js-commons";
import { ContentType } from "allure-js-commons";
 

 test('get started link', async ({ page }) => {
            //Allure settings
            // Метаданные
            await allure.epic('start working');
            await allure.story('go to the page');
            await allure.label('owner', 'Me');

            //Description
            await allure.displayName('Has title');
            await allure.owner('Me');
            await allure.tag('Trying params');
            await allure.severity('critical');

            //Hierarchy
            await allure.parentSuite("Tests for web interface");
            await allure.suite("Tests for essential features");
            await allure.subSuite("Tests for main page");
            //end of Allure settings

            await page.goto('https://playwright.dev/');

            // Click the get started link.
            await page.getByRole('link', { name: 'Get started' }).click();

            //Expects page to have a heading with the name of Installation.
            await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
            //Screenshots
            // 1. Делаем скриншот (в памяти, без сохранения в файл)
            const screenshotBuffer = await page.screenshot();

            // 2. Прикрепляем к отчёту Allure
            await allure.attachment(
                'Screenshot',
                screenshotBuffer,
                ContentType.PNG
     );
        });



test('has title', async ({ page }) => {
    //Allure settings
    await allure.epic('start working');
    await allure.story('go to the page');
    await allure.label('owner', 'Me');
    await allure.displayName('Has title');
    await allure.owner('Me');
    await allure.tag('Trying params');
    await allure.severity('critical');
    await allure.parentSuite("Tests for web interface");
    await allure.suite("Tests for essential features");
    await allure.subSuite("Tests for main page");

    await allure.step("Step 1", async () => {
        await allure.step("Sub-step 1", async () => {
            await page.goto('https://playwright.dev/');
        });

        await allure.step("Step 2", async () => {
            await allure.step("Sub-step 1", async () => {
                await expect(page).toHaveTitle(/Playwright/);
            });
        });
    });
});


const credentials = [
    { login: "", password: "secret_sauce" },
    { login: "standard_user", password: "secret_sauce" },
    { login: "", password: "" },
    { login: "standard_user", password: "" },
    { login: "invalid_user", password: "invalid_password" },
    { login: "invalid_user", password: "secret_sauce" },
    { login: "invalid_user", password: "" },
    { login: "standard_user", password: "invalid_password" },
    { login: "locked_out_user", password: "" },
    { login: "locked_out_user", password: "secret_sauce" },
    { login: "locked_out_user", password: "invalid_password" },
    { login: "problem_user", password: "invalid_password" },
    { login: "problem_user", password: "secret_sauce" },
    { login: "problem_user", password: "" },
    { login: "performance_glitch_user", password: "invalid_password" },
    { login: "performance_glitch_user", password: "secret_sauce" },
    { login: "performance_glitch_user", password: "" },
    { login: "error_user", password: "invalid_password" },
    { login: "error_user", password: "secret_sauce" },
    { login: "error_user", password: "" },
    { login: "visual_user", password: "invalid_password" },
    { login: "visaul_user", password: "secret_sauce" },
    { login: "visual_user", password: "" },
];
test.describe("Authentication Tests", () => {
    for (const { login, password } of credentials) {
        test(`Shopping as ${login} and ${password}`, async ({ page }) => {
            //Allure settings
            await allure.epic('parametrizing');
            await allure.story('login');
            await allure.label('owner', 'Me');
            await allure.displayName(`shopping as ${login} and ${password}`);
            await allure.owner('Me');
            await allure.tag('parametrized');
            await allure.severity('critical');
            await allure.parentSuite("Tests for web forms");
            await allure.suite("Tests for authoriztion");
            await allure.subSuite("Tests for parameters");

            await allure.step("Going to the form", async () => {
                await page.goto('https://www.saucedemo.com/');
            });

            await allure.step("Insert login", async () => {
                await page.locator('[data-test="username"]').click();
                await page.locator('[data-test="username"]').fill(login);
            });

            await allure.step("Insert password", async () => {
                await page.locator('[data-test="password"]').click();
                await page.locator('[data-test="password"]').fill(password);
            });

            await allure.step("Submit", async () => {
                await page.locator('[data-test="login-button"]').click();
                if (login === "" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText("Username is required");
                }
                else if (login === "standard_user" && password === "") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText("Password is required");
                }
                else if (login === "standard_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="primary-header"]'))
                        .toContainText("Swag Labs");
                }
                else if (login === "standard_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText("Username and password do not match any user in this service");
                }
                else if (login === "" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText("Username is required");
                }
                else if (login === "locked_out_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: Sorry, this user has been locked out.');
                }
                else if (login === "locked_out_user" && password === "") {
                    await expect(page.locator('form')).toContainText('Epic sadface: Password is required');
                }
                else if (login === "locked_out_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: Username and password do not match any user in this service');
                }
                else if (login === "invalid_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: Username and password do not match any user in this service');
                }
                else if (login === "invalid_user" && password === "") {
                    await expect(page.locator('form')).toContainText('Epic sadface: Password is required');
                }
                else if (login === "invalid_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: Username and password do not match any user in this service');
                }
                else if (login === "problem_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="primary-header"]'))
                        .toContainText("Swag Labs");

                    // 1. Делаем скриншот (в памяти, без сохранения в файл)
                    const screenshotBuffer = await page.screenshot();

                    // 2. Прикрепляем к отчёту Allure
                    await allure.attachment(
                        'Screenshot',
                        screenshotBuffer,
                        ContentType.PNG)
                }
                else if (login === "problem_user" && password === "") {
                    await expect(page.locator('form')).toContainText('Epic sadface: Password is required');
                }
                else if (login === "problem_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: Username and password do not match any user in this service');
                }
                else if (login === "performance_glitch_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();;

                    // 1. Делаем скриншот (в памяти, без сохранения в файл)
                    const screenshotBuffer = await page.screenshot();

                    // 2. Прикрепляем к отчёту Allure
                    await allure.attachment(
                        'Screenshot',
                        screenshotBuffer,
                        ContentType.PNG)
                }
                else if (login === "performance_glitch_user" && password === "") {
                    await expect(page.locator('form')).toContainText('Epic sadface: Password is required');
                }
                else if (login === "performance_glitch_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: Username and password do not match any user in this service');
                }
                else if (login === "error_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="error"]'))
                        .toContainText('Epic sadface: unexpected error');
                }
                else if (login === "error_user" && password === "") {
                    await expect(page.locator('form')).toContainText('Epic sadface: Password is required');
                }
                else if (login === "error_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                           .toContainText('Epic sadface: Username and password do not match any user in this service');
                }
                else if (login === "visual_user" && password === "secret_sauce") {
                    await expect(page.locator('[data-test="primary-header"]'))
                           .toContainText("Swag Labs");
                }
                else if (login === "visual_user" && password === "") {
                    await expect(page.locator('form')).toContainText('Epic sadface: Password is required');
                }
                else if (login === "visual_user" && password === "invalid_password") {
                    await expect(page.locator('[data-test="error"]'))
                           .toContainText('Epic sadface: Username and password do not match any user in this service');
                        }
                        //await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
                    });
                });
            
        }
})

test('to be broken', async ({ page }) => {
    const brokenError = {
        name: 'BrokenTest',
        message: 'Сервис временно недоступен',
        stack: '...',  // можно оставить пустым
        __allure: {  // Специальные метаданные для Allure
            status: 'broken',
            labels: [{ name: 'tag', value: 'unstable' }]
        }
    };

    // 2. Устанавливаем метки
    await allure.label('status', 'broken');
    await allure.tag('unstable');

    // 3. Кидаем кастомную ошибку
    throw brokenError;

 });
    //test.skip();
        //await page.goto('https://demo.playwright.dev/todomvc');

