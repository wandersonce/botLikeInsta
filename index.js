const ig = require('./instagram');

(async () => {
  await ig.initialize();

  await ig.login('yourlogin', 'youpassword!');

  await ig.likeTagsProcess(['gamer', 'tech', 'setup']);

  debugger;
})();
