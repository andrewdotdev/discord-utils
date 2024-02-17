const { DiscordUtils } = require('./dist/main.js');


const DUtils = new DiscordUtils({
  clientId: 'CLIENT-ID',
  token: 'TOKEN-BOT',
  slashFolder: `./examples/`,
});

(async () => {  await DUtils.slashCreate() })();