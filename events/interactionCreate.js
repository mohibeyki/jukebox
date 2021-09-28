module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const cmd = client.commands.get(interaction.commandName);

    if (cmd && cmd.voiceChannel) {
        if (!interaction.member.voice.channel) {
            return await interaction.reply(`You're not in a voice channel ${interaction.user}... try again ? ❌`);
        }

        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) {
            return await interaction.reply(`You are not in the same voice channel ${interaction.user}... try again ? ❌`);
        }
    }

    await interaction.deferReply();
    if (cmd) cmd.execute(client, interaction, interaction.options.get('input'));
};