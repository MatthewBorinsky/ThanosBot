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
                    // await confirmation.deferReply();
                    await confirmation.update({ content: 'Goodbye little one.', components: [] });
                    const guild = interaction.guild;
                    console.log('done1');
                    const members = await guild.members.fetch();
                    console.log('done2');
                    const total = guild.memberCount;
                    console.log('done3');
                    if (total > 2){
                        const randMembers = members.random(Math.floor(total / 2));
                        randMembers.forEach(randMember => {
                            guildId.ban(randMember);
                        })
                        console.log('done4');
                        await confirmation.followUp({content: 'Peace, at last.'});
                    } else{
                        await confirmation.followUp({content: 'There are not enough people here.'});
                    }
                    
                } else if (confirmation.customId === 'cancel') {
                    await confirmation.update({ content: 'You have all been spared.', components: [] });
                }
            } catch (e) {
                console.log(e);
                await interaction.editReply({ content: 'Putting the gauntlet down, confirmation not received within 1 minute.', components: [] });
            }

        } else{
            await interaction.reply('You do not have all the right stones.');
        }
    }
}