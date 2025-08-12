const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Zero Bugs',
                username: 'zerobugs',
                password: 'password'
            }
        })
        await page.goto('http://localhost:5173')
    })

    describe('front log in page', () => {

        test('login form is shown', async ({ page }) => {
            const locator = await page.getByText('log in to application')
            await expect(locator).toBeVisible()
        })

        describe('login', () => {
            test('succeed with correct credentials', async ({ page }) => {
                await page.getByTestId('username').fill('zerobugs')
                await page.getByTestId('password').fill('password')
                await page.getByRole('button', { name: 'login' }).click()

                await expect(page.getByText('Zero Bugs logged in')).toBeVisible()
            })

            test('fails with wrong credentials', async ({ page }) => {
                await page.getByTestId('username').fill('zerobugs')
                await page.getByTestId('password').fill('wrongpassword')
                await page.getByRole('button', { name: 'login' }).click()

                await expect(page.getByText('wrong username or password')).toBeVisible()
            })
        })

    })
})