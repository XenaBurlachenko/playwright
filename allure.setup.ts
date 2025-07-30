// allure.setup.ts
import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';

export const test = base.extend({
    page: async ({ page }, use) => {
        await use(page);
    }
});