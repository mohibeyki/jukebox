module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilization: '{prefix}resume',
    voiceChannel: true,
    description: 'resumes playing',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        const success = queue.setPaused(false);

        return await interaction.editReply(success ? `Current music ${queue.current.title} resumed ✅` : `Something went wrong ${interaction.user}... try again ? ❌`);
    },
};