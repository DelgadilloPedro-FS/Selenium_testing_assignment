const { describe, it, expect } = require('@jest/globals');
const { Builder, By, until } = require('selenium-webdriver');

describe('Frontend App Tests', () => {
    let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should open homepage and check the title is "Home"', async () => {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    expect(title).toBe('Home');
  });

  it('should open contact page and check the title is "Contact Us"', async () => {
    await driver.get('http://localhost:3000/contact');
    const title = await driver.getTitle();
    expect(title).toBe('Contact Us');
  });

  it('should sign up for more info via name and check the message', async () => {

    await driver.get('http://localhost:3000/');
    const contactButton = await driver.findElement(By.id('contactLink'));
    await contactButton.click();

    const nameInput = await driver.findElement(By.id('formInput'));
    const emailAddress = 'Pedro';
    await nameInput.sendKeys(emailAddress);
    const formSubmitButton = await driver.findElement(By.id('formSubmit'));
    await formSubmitButton.click();

    await driver.wait(until.elementLocated(By.id('formMessage')), 5000);
    const messageElement = await driver.findElement(By.id('formMessage'));
    const messageText = await messageElement.getText();
    expect(messageText).toContain(emailAddress);
  });
});