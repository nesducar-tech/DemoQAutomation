import { Page, Locator } from '@playwright/test';

export class AgregarProductoPage {
    readonly page: Page;
    readonly addCartButton: Locator;
    readonly cartLink: Locator;
    readonly cartItemName: Locator;

    constructor(page: Page) {
        this.page = page;
        // Localizadores utilizando los selectores exactos solicitados
        this.addCartButton = page.locator('(//button[@class="btn btn_primary btn_small btn_inventory "])[1]');
        this.cartLink = page.locator('//a[@class="shopping_cart_link"]');
        this.cartItemName = page.locator('//div[@class="inventory_item_name"]');
    }

    /**
     * Espera el botón, valida si tiene el texto 'Add to cart' y hace clic
     */
    async agregarPrimerProducto(): Promise<void> {
        // Esperar a que el botón esté presente y visible
        await this.addCartButton.waitFor({ state: 'visible' });

        // Obtener el texto del botón para aplicar la condición
        const textoBoton = await this.addCartButton.textContent();

        if (textoBoton?.trim() === 'Add to cart') {
            await this.addCartButton.click();
        }
    }

    /**
     * Navega al carrito de compras con sus respectivas esperas
     */
    async irAlCarrito(): Promise<void> {
        // Esperar 2 segundos después de hacer clic en agregar
        await this.page.waitForTimeout(2000);
        
        await this.cartLink.waitFor({ state: 'visible' });
        await this.cartLink.click();
        
        // Esperar 2 segundos después de ingresar al carrito
        await this.page.waitForTimeout(2000);
    }
}