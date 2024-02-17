const { DiscordUtils } = require('./dist/main.js');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.DirectMessages,
  ]
});

const DUtils = new DiscordUtils({
  clientId: '',
  clientDjs: client,
  token: '',
  slashFolder: `./examples/`,
});

(async () => {  await DUtils.slashCreate() 
  await DUtils.login() })();