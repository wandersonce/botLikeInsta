const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/'

const instagram = {
    browser: null,
    page: null,

    //* Initializing  the browser and going to instagram home page
    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        });

        instagram.page = await instagram.browser.newPage();

    },

    //* Login to user account
    login: async (username, password) => {
        await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

        await instagram.page.waitFor(1000);

        /* Writing the username and password */
        await instagram.page.type('input[name="username"]', username, { delay: 50 });
        await instagram.page.type('input[name="password"]', password, { delay: 50 });

        /* Click on the login url button */
        let loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');
        await loginButton[0].click();

        debugger;
    }
}

module.exports = instagram;