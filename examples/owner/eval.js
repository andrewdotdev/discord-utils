const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('nobodypro')
    .setDescription('Replies with Pong!'),
};
