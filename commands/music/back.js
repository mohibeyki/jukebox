module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilization: '{prefix}back',
    voiceChannel: true,
    description: 'plays previous track',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        if (!queue.previousTracks[1]) return await interaction.editReply(`There was no music played before ${interaction.user}... try again ? ❌`);

        await queue.back();

        await interaction.editReply(`Playing the **previous** track ✅`);
    },
};