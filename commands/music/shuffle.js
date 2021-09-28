module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilization: '{prefix}shuffle',
    voiceChannel: true,
    description: 'shuffles the queue',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        if (!queue.tracks[0]) return await interaction.editReply(`No music in the queue after the current one ${interaction.user}... try again ? ❌`);

        await queue.shuffle();
        return await interaction.editReply(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`);
    },
};