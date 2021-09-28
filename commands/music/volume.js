const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilization: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,
    description: 'sets volume from [1-100]',
    options: [{
        name: 'input',
        type: 'INTEGER',
        description: 'name of the song or URL',
        required: true,
    }],

    async execute(client, interaction, input) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        const vol = parseInt(input.value);

        if (!vol) return await interaction.editReply(`The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`);

        if (queue.volume === vol) return await interaction.editReply(`The volume you want to change is already the current one ${interaction.user}... try again ? ❌`);

        if (vol < 0 || vol > maxVol) return await interaction.editReply(`The specified number is not valid. Enter a number between **1** and **${maxVol}** ${interaction.user}... try again ? ❌`);

        const success = queue.setVolume(vol);

        return await interaction.editReply(success ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${interaction.user}... try again ? ❌`);
    },
};