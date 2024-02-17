const { DiscordUtils } = require('../dist/main.js');
const { GatewayIntentBits } = require('discord.js');

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
  slashFolder: `./commands/`,
});

(async () => {    await client.login("TOKEN")
await client.slashCreate() 
 })();