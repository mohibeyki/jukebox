const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: [],
    utilization: '{prefix}ping',
    description: 'pongs your ping',
    options: [],

    async execute(client, interaction) {
        return await interaction.editReply(`Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`);
    },
};