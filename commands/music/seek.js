const ms = require('ms');

module.exports = {
    name: 'seek',
    aliases: [],
    utilization: '{prefix}seek [time]',
    voiceChannel: true,
    description: 'seeks to the specified second on the track',
    options: [{
        name: 'input',
        type: 'INTEGER',
        description: 'time in the song to jump to',
        required: true,
    }],

    async execute(client, interaction, input) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        const timeToMS = input.value * 1000;
        if (timeToMS >= queue.current.durationMS) return await interaction.editReply(`The indicated time is higher than the total time of the current song ${interaction.user}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

        await queue.seek(timeToMS);
        return await interaction.editReply(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
    },
};