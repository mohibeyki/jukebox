const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'jbhelp',
    aliases: ['h'],
    showHelp: false,
    utilization: '{prefix}help',
    description: 'shows all commands',
    options: [],

    async execute(client, interaction, _) {
        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('This code comes from a GitHub project [mohibeyki/jukebox](https://github.com/mohibeyki/jukebox).');
        embed.addField(`Enabled - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter('JukeBox, Based on Music-bot by Zerio', interaction.user.avatarURL({ dynamic: true }));

        interaction.channel.send({ embeds: [embed] });
    },
};