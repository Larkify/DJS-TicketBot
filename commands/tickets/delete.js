const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    config: {
        name: `delete`,
        aliases: []
    },
    run: async (bot, message, args) => {
        if(!message.member.roles.cache.find(r => r.id === config.support_role_id)) return message.channel.send(`**401 - Unauthorised:** You do not have permission to use this command.`)
        let embed = new MessageEmbed()
            .setColor(config.embed_colour)
            .setDescription('Ticket Deleting in **5 Seconds**')
        message.channel.send(embed);
        let channel = message.channel
        setTimeout(() => {
            channel.delete()
        }, 5000)
    }
}