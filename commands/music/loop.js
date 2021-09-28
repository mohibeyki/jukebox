const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilization: '{prefix}loop <queue>',
    voiceChannel: true,
    description: 'enables looping on <queue>',
    options: [{
        name: 'input',
        type: 'STRING',
        description: 'loop "queue" or "song"',
        required: true,
    }],

    async execute(client, interaction, input) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);
        }

        if (input && input.value === 'queue') {
            if (queue.repeatMode === 1) {
                return await interaction.editReply(`You must first disable the current music in the loop mode (/loop) ${interaction.user}... try again ? ❌`);
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            return await interaction.editReply(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${interaction.user}... try again ? ❌`);
        } else {
            if (queue.repeatMode === 2) {
                return await interaction.editReply(`You must first disable the current queue in the loop mode (/loop queue) ${interaction.user}... try again ? ❌`);
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
            return await interaction.editReply(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂` : `Something went wrong ${interaction.user}... try again ? ❌`);
        };
    },
};