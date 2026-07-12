import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Localizadores para los campos de usuario y contraseña
        this.usernameInput = page.locator('#user-name'); 
        this.passwordInput = page.locator('#password');  
        this.loginButton = page.locator("//input[@id='login-button']");
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        // 1. Ingresar usuario y esperar 2 segundos
        await this.usernameInput.fill(username);
        await this.page.waitForTimeout(2000);

        // 2. Ingresar contraseña y esperar 2 segundos
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(2000);

        // 3. Hacer clic en el botón de login y esperar 2 segundos
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);
    }
}