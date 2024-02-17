const { DiscordUtils } = require('../dist/main.js');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new DiscordUtils({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.DirectMessages,
  ],
  slashFolder: `./examples/`,
});

(async () => {    await client.login("TOKEN")
await client.slashCreate() 
 })();