module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    utilization: '{prefix}progress',
    voiceChannel: true,
    description: 'shows progress on the currently playing track',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return await interaction.editReply(`Playing a live, no data to display 🎧`);

        await interaction.editReply(`${progress} (**${timestamp.progress}**%)`);
    },
};