const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snap')
        .setDescription('Ban half the server.'),
    async execute(interaction) {
        await interaction.reply('Peace, at last.')
    }
}