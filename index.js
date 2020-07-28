const ig = require('./instagram');


(async () => {
    await ig.initialize();

    await ig.login('YourUsername', 'YourPassword');

    await ig.likeTagsProcess(['warzone', 'callofduty']);

    debugger;

})();