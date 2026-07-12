import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AgregarProductoPage } from '../pages/AgregarProductoPage';

test('Debe iniciar sesión y agregar un producto al carrito exitosamente', async ({ page }) => {
    // Instanciar los Page Objects (POO)
    const loginPage = new LoginPage(page);
    const agregarProductoPage = new AgregarProductoPage(page);

    // 1. Navegar e iniciar sesión consumiendo el objeto existente
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Ejecutar la acción de verificar el botón 'Add to cart' y hacer clic
    await agregarProductoPage.agregarPrimerProducto();

    // 3. Ir al carrito de compras aplicando las esperas de 2 segundos requeridas
    await agregarProductoPage.irAlCarrito();

    // 4. Esperar que se encuentre el elemento del producto en el carrito
    await agregarProductoPage.cartItemName.waitFor({ state: 'visible' });

    // 5. Verificar que sea visible mediante una aserción de Playwright
    await expect(agregarProductoPage.cartItemName).toBeVisible();

    // 6. Imprimir el mensaje de éxito solicitado en la consola
    console.log('Se agrego al carrito');
});