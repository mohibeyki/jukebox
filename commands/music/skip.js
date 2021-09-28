module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilization: '{prefix}skip',
    voiceChannel: true,
    description: 'skips next track',
    options: [],

    execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        const success = queue.skip();

        return interaction.editReply(success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${interaction.user}... try again ? ❌`);
    },
};