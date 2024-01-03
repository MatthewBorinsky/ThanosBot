const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()  // Command information
        .setName('snap')
        .setDescription('Ban half the server.'),
    async execute(interaction) {
        // If the user has permission to ban
        if (interaction.member.permissions.has(PermissionFlagsBits.BanMembers)){
            // Last second button to check
            const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Confirm Destruction')
                .setStyle(ButtonStyle.Danger);

            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Secondary);
            
            const row = new ActionRowBuilder()
                .addComponents(cancel, confirm);

            // Sends the buttons for confirmation
            const response = await interaction.reply({
                content: 'Are you sure?',
                components: [row],
            });

            // Gets the id of the specific user who called /snap
            const collectorFilter = i => i.user.id === interaction.user.id;

            // const async responseButton = function(){
            // }
            try {
                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
                // if (confirmation.user.id === interaction.user.id){
                //     if (confirmation.customId === 'confirm') {
                //         await confirmation.update({ content: 'Goodbye little one.', components: [] });  // 'Peace, at last.'
                //     } else if (confirmation.customId === 'cancel') {
                //         await confirmation.update({ content: 'You have all been spared.', components: [] });
                //     }
                // } else{
                //     if (confirmation.customId === 'confirm') {
                //         await confirmation.reply({content: 'Get help.', ephemeral: true });
                //     } else if (confirmation.customId === 'cancel') {
                //         await confirmation.reply({content: 'You are not powerful enough to stop this.', ephemeral: true });
                //     }
                // }
                if (confirmation.customId === 'confirm') {
                    await confirmation.update({ content: 'Goodbye little one.', components: [] });  // 'Peace, at last.'
                } else if (confirmation.customId === 'cancel') {
                    await confirmation.update({ content: 'You have all been spared.', components: [] });
                }
            } catch (e) {
                await interaction.editReply({ content: 'Putting the gauntlet down, confirmation not received within 1 minute.', components: [] });
            }

        } else{
            await interaction.reply('You do not have all the right stones.');
        }
    }
}