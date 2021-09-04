const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [''],  
    description: 'showping',
    usage: '',
    run: async(client, interaction, args) => {
        interaction.editReply({content : `Ping : ${client.ws.ping}`})
    }
}