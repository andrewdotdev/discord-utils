const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('nomames')
    .setDescription('Replies with Pong!'),
};
