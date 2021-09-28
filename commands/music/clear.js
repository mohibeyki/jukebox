module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilization: '{prefix}clear',
    voiceChannel: true,
    description: 'clears queue',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        if (!queue.tracks[0]) return await interaction.editReply(`No music in the queue after the current one ${interaction.user}... try again ? ❌`);

        await queue.clear();

        await interaction.editReply(`The queue has just been cleared 🗑️`);
    },
};