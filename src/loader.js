const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

client.commands = new Collection();
const updated = false;

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Loading events...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`Loading commands...`);

const registerSlashCommand = async (commands) => {
    try {
        console.log('-> Started refreshing application (/) commands.');
        // await client.guilds.cache.get(guildId)?.commands.set([]);
        await client.application?.commands.set(commands);
        console.log('-> Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

readdirSync('./commands/').forEach(dirs => {
    const commandFiles = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    let commands = []
    for (const file of commandFiles) {
        const command = require(`../commands/${dirs}/${file}`);
        console.log(`-> Loaded command ${command.name.toLowerCase()}`);
        commands.push({ name: command.name.toLowerCase(), description: command.description, options: command.options });
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    };

    // Todo: use a better method to update slash commands
    if (updated) {
        client.on("ready", () => {
            registerSlashCommand(commands);
        });
    }
});
