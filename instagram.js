const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
  browser: null,
  page: null,

  //* Initializing  the browser and going to instagram home page
  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false,
    });

    instagram.page = await instagram.browser.newPage();
  },

  //* Login to user account
  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    await instagram.page.waitFor(1000);

    /* Writing the username and password */
    await instagram.page.type('input[name="username"]', username, {
      delay: 50,
    });
    await instagram.page.type('input[name="password"]', password, {
      delay: 50,
    });

    /* Click on the login url button */
    let loginButton = await instagram.page.$x(
      '//div[contains(text(), "Log In")]'
    );
    await loginButton[0].click();

    await instagram.page.waitFor(10000);
    await instagram.page.waitFor('div > span > img[data-testid="user-avatar"]');
  },

  /* Like posts based on tag choosed */
  likeTagsProcess: async (tags = []) => {
    for (let tag of tags) {
      /* Go to the tag page */
      await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
      await instagram.page.waitFor(3000);

      let posts = await instagram.page.$$('article ._ac7v a');

      for (let i = 0; i < 10; i++) {
        let post = posts[i];

        /* Click on the post */
        await post.click();

        /* Wait for the modal to appear */
        await instagram.page.waitFor('div.hwddc3l5');
        await instagram.page.waitFor(2000);

        let isLikeable = await instagram.page.$('._aamw svg[color="#262626"]');

        if (isLikeable) {
          await instagram.page.waitFor(5000);
          await instagram.page.click('._aamw svg[color="#262626"]');
        }

        await instagram.page.waitFor(3000);

        /* Close the modal */
        await instagram.page.click('.futnfnd5 svg');

        await instagram.page.waitFor(4000);
      }

      await instagram.page.waitFor(15000);
    }
  },
};

module.exports = instagram;
