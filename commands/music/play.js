const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilization: '{prefix}play [song name/URL]',
    voiceChannel: true,
    description: 'plays a track using [song name/URL]',
    options: [{
        name: 'input',
        type: 'STRING',
        description: 'name of the song or URL',
        required: true,
    }],

    async execute(client, interaction, input) {
        if (!input) return await interaction.editReply(`Please enter a valid search ${interaction.user}... try again ? ❌`);

        const res = await player.search(input.value, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return await interaction.editReply(`No results found ${interaction.user}... try again ? ❌`);

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            await player.deleteQueue(interaction.guild.id);
            return await interaction.editReply(`I can't join the voice channel ${interaction.user}... try again ? ❌`);
        }

        await interaction.editReply(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};