const fs = require('fs');
const Discord = require('discord.js');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const client = new Discord.Client({
    partials: [],
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ],
    allowedMentions: {
        parse: [
            'users',
            'roles' // no 'everyone'
        ],
        repliedUser: false
    }
});

module.exports = client

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.cooldowns = new Discord.Collection(); 


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);	client.commands.set(command.name, command);
};

client.on("ready", async () => {
  const slashCommands = await globPromise(
    `${process.cwd()}/slashCommands/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;
      client.slashCommands.set(file.name, file);
      arrayOfSlashCommands.push(file);
  });
  
  client.guilds.cache.forEach(async (g) => {
    await client.guilds.cache.get(g.id).commands.set(arrayofSlashCommands);
  });
});

//events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  const eventNames = file.split(".")[0];
}
const config = require('./config.json')
token = process.env["token"];
client.prefix = config.prefix
client.owners = [];

process.on('unhandledRejection', err => console.error(err));
client.on('error', err => console.error(err));

client.login(token);
