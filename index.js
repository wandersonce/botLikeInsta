const ig = require('./instagram');


(async () => {
    await ig.initialize();

    await ig.login('bamgamesofc', 'f1a6r2a7bam');

    debugger;

})();