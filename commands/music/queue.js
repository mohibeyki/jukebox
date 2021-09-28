const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilization: '{prefix}queue',
    voiceChannel: true,
    description: 'shows playing queue',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        if (!queue.tracks[0]) return await interaction.editReply(`No music in the queue after the current one ${interaction.user}... try again ? ❌`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('RED');
        embed.setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Server queue - ${interaction.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('JukeBox', interaction.user.avatarURL({ dynamic: true }));

        interaction.channel.send({ embeds: [embed] });
    },
};