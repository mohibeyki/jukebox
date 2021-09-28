module.exports = {
    name: 'pause',
    aliases: [],
    utilization: '{prefix}pause',
    voiceChannel: true,
    description: 'pauses the music player',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        const success = queue.setPaused(true);

        return await interaction.editReply(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${interaction.user}... try again ? ❌`);
    },
};