import { test, expect } from '@playwright/test'

test.describe('SilverSigma Homepage', () => {
  test('should display hero section and feature cards', async ({ page }) => {
    await page.goto('/')
    
    // Check hero section
    await expect(page.getByRole('heading', { name: 'Welcome to SilverSigma' })).toBeVisible()
    await expect(page.getByText('A simple, friendly app to chat with your AI companion')).toBeVisible()
    
    // Check feature cards
    await expect(page.getByTestId('feature-card-assistant')).toBeVisible()
    await expect(page.getByTestId('feature-card-hobbies')).toBeVisible()
    await expect(page.getByTestId('feature-card-seniorgram')).toBeVisible()
    
    // Check quick actions
    await expect(page.getByTestId('quick-action-assistant')).toBeVisible()
    await expect(page.getByTestId('quick-action-hobbies')).toBeVisible()
    await expect(page.getByTestId('quick-action-seniorgram')).toBeVisible()
  })

  test('should navigate to assistant page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByTestId('quick-action-assistant').click()
    await expect(page).toHaveURL('/assistant')
    await expect(page.getByRole('heading', { name: 'Your AI Companion' })).toBeVisible()
  })

  test('should navigate to hobbies page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByTestId('quick-action-hobbies').click()
    await expect(page).toHaveURL('/hobbies')
    await expect(page.getByRole('heading', { name: 'Explore Hobbies' })).toBeVisible()
  })

  test('should navigate to feed page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByTestId('quick-action-seniorgram').click()
    await expect(page).toHaveURL('/feed')
    await expect(page.getByRole('heading', { name: 'SeniorGram' })).toBeVisible()
  })

  test('should toggle text size', async ({ page }) => {
    await page.goto('/')
    
    const toggleButton = page.getByRole('button', { name: /Current text size/ })
    await expect(toggleButton).toBeVisible()
    
    // Click to toggle to xl
    await toggleButton.click()
    await expect(toggleButton).toContainText('AA')
    
    // Click to toggle back to normal
    await toggleButton.click()
    await expect(toggleButton).toContainText('A')
  })

  test('should show bottom navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check bottom navigation is visible on mobile
    await expect(page.getByTestId('nav-home')).toBeVisible()
    await expect(page.getByTestId('nav-assistant')).toBeVisible()
    await expect(page.getByTestId('nav-hobbies')).toBeVisible()
    await expect(page.getByTestId('nav-post')).toBeVisible()
    await expect(page.getByTestId('nav-profile')).toBeVisible()
  })

  test('should hide bottom navigation on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto('/')
    
    // Check bottom navigation is hidden on desktop
    await expect(page.getByTestId('nav-home')).not.toBeVisible()
  })
})
