const { Message, Client, MessageAttachment, MessageEmbed} = require('discord.js')
const fs = require('fs')
const config = require('../../config.js')

module.exports = {
    config: {
        name: `reopen`,
        aliases: []
    },
    run: async (bot, message, args) => {
        if(!message.member.roles.cache.find(r => r.id === config.support_role_id)) return message.channel.send(`**401 - Unauthorised:** You do not have permission to use this command.`)
        const transcriptChannel = message.channel
        let embed = new MessageEmbed()
           .setDescription(`Ticket Reopened by ${message.author}`)
           .setColor(config.embed_colour)

        let ticketName = message.channel.name
        let filterBy = bot.user.id
        transcriptChannel.messages.fetch().then(messages => {
        let openMessage = messages.find(m => m.content.includes(`#${ticketName.slice(7, 500)}`) && m.author.id === filterBy);
        let openMessageContent = openMessage.content
        let ticketUser = openMessage.mentions.users.first();
        
        transcriptChannel.createOverwrite(ticketUser, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        })
        })
        await transcriptChannel.setName(`ticket-${transcriptChannel.name.slice(7, 300)}`)
        await transcriptChannel.setParent(config.ticket_open_category)
        message.channel.send(embed)
    }
}