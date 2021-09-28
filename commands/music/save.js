module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilization: '{prefix}save',
    voiceChannel: true,
    description: 'sends information of currently playing song to the user',
    options: [],

    async execute(client, interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return await interaction.editReply(`No music currently playing ${interaction.user}... try again ? ❌`);

        interaction.user.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${interaction.guild.name} ✅`).then(() => {
            interaction.channel.send(`I have sent you the title of the music by private messages ✅`);
        }).catch(error => {
            interaction.channel.send(`Unable to send you a private message ${interaction.user}... try again ? ❌`);
        });
    },
};