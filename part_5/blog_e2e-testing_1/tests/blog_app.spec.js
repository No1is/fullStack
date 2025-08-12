const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    describe('front log in page', () => {

        test('login form is shown', async ({ page }) => {
            const locator = await page.getByText('log in to application')
            await expect(locator).toBeVisible()
        })
    })
})