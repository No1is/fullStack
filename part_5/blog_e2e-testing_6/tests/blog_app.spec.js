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

        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Other Bugs',
                username: 'otherbugs',
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

        describe('when logged in', () => {
            beforeEach(async ({ page }) => {
                await page.getByTestId('username').fill('zerobugs')
                await page.getByTestId('password').fill('password')
                await page.getByRole('button', { name: 'login' }).click()

                await page.getByRole('button', { name: 'new blog' }).click()
                await page.getByTestId('title').fill('1st blog by pw')
                await page.getByTestId('author').fill('Zero Bugs')
                await page.getByTestId('url').fill('playwright url')
                await page.getByRole('button', { name: 'create' }).click()

                await expect(page.locator('.blog-container', { hasText: '1st blog by pw'})).toBeVisible()

                await page.getByRole('button', { name: 'new blog' }).click()
                await page.getByTestId('title').fill('2nd blog by pw')
                await page.getByTestId('author').fill('Zero Bugs')
                await page.getByTestId('url').fill('playwright url')
                await page.getByRole('button', { name: 'create' }).click()

                await expect(page.locator('.blog-container', { hasText: '2nd blog by pw'})).toBeVisible()
            })
            
            test('a new blog can be created', async ({ page }) => {
                await page.getByRole('button', { name: 'new blog' }).click()
                await page.getByTestId('title').fill('3ed blog by pw')
                await page.getByTestId('author').fill('Zero Bugs')
                await page.getByTestId('url').fill('playwright url')
                await page.getByRole('button', { name: 'create' }).click()

                await expect(page.locator('.blog-container').getByText('3ed blog by pw')).toBeVisible()
            })

            test('a blog can be liked', async ({ page }) => {
                const firstBlog = await page.locator('.blog-container', { hasText: '1st blog by pw' })
                await firstBlog.getByRole('button', { name: 'view' }).click()
                await firstBlog.getByRole('button', { name: 'like' }).click()

                await expect(firstBlog.getByText('likes 1')).toBeVisible()
            })

            test('a blog can be deleted', async ({ page }) => {
                page.on('dialog', async dialog => {
                    expect(dialog.type()).toBe('confirm')
                    await dialog.accept()
                })

                const firstBlog = await page.locator('.blog-container', { hasText: '1st blog by pw' })
                await firstBlog.getByRole('button', { name: 'view' }).click()
                await firstBlog.getByRole('button', { name: 'remove' }).click()

                await expect(page.locator('.blog-container', { hasText: '1st blog by pw' })).toHaveCount(0)
            })

            test('other user cannot remove others blog', async ({ page }) => {
                await page.getByRole('button', { name: 'logout' }).click()
                await page.getByTestId('username').fill('otherbugs')
                await page.getByTestId('password').fill('password')
                await page.getByRole('button', { name: 'login' }).click()

                const firstBlog = await page.locator('.blog-container', { hasText: '1st blog by pw' })
                await firstBlog.getByRole('button', { name: 'view' }).click()
                await expect(firstBlog.getByRole('button', { name: 'remove' })).toHaveCount(0)
            })
        })

    })
})