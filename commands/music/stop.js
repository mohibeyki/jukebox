module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilization: '{prefix}stop',
    voiceChannel: true,
    description: 'clears the queue stops playing',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        queue.destroy();

        return await interaction.editReply(`Music stopped into this server, see you next time ✅`);
    },
};