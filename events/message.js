const client = require('../index.js')
const config = require('../config.json')

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd);
  if (command) command.run(client, message, args);
});