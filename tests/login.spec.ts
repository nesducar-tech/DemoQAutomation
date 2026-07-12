import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login en saucedemo y verificar texto Swag Labs', async ({ page }) => {
    // Instanciar la página de login (Object-Oriented Programming - POM)
    const loginPage = new LoginPage(page);

    // 1. Navegar a la página
    await loginPage.goto();

    // 2. Realizar el login (ejecutará los ingresos y las esperas de 2 segundos configuradas en el POO)
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Definir el localizador solicitado para el logo de la aplicación
    const appLogo = page.locator('//div[@class="app_logo"]');

    // 4. Esperar a que el elemento esté presente en el DOM y sea visible
    await appLogo.waitFor({ state: 'visible' });

    // 5. Verificar si contiene el texto 'Swag Labs'
    await expect(appLogo).toHaveText('Swag Labs');
});