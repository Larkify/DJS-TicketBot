const { Message, Client, MessageAttachment, MessageEmbed} = require('discord.js')
const fs = require('fs')
const config = require('../../config.js')

module.exports = {
    config: {
        name: `close`,
        aliases: []
    },
    run: async (bot, message, args) => {
        const transcriptChannel = message.channel
        let embed = new MessageEmbed()
           .setDescription(`Ticket Closed by ${message.author}`)
           .setColor(config.embed_colour)
        let embed1 = new MessageEmbed()
           .setDescription(`\`\`\`?reopen     |   Reopen the ticket\n?transript  |   Save the ticket transcript\n?delete     |   Delete the ticket\`\`\``)
           .setColor(config.embed_colour)
           await message.channel.send(embed)

        let ticketName = message.channel.name
        let filterBy = bot.user.id
        transcriptChannel.messages.fetch().then(messages => {
        let openMessage = messages.find(m => m.content.includes(`#${ticketName.slice(7, 500)}`) && m.author.id === filterBy);
        let ticketUser = openMessage.mentions.users.first();

        let ratingEmbed = new MessageEmbed()
        .setDescription(`**Would you like to help us out?** \n\nYou can leave a rating on your experience by using... \`\`\`?rate "${transcriptChannel.name.slice(7, 300)}" <1/5> or <text>\`\`\``)
        .setColor(config.embed_colour)
        bot.users.cache.get(ticketUser.id).send(ratingEmbed);
        
        transcriptChannel.createOverwrite(ticketUser, {
            SEND_MESSAGES: null,
            VIEW_CHANNEL: null
        })
        })
        await transcriptChannel.setParent(config.ticket_closed_catergory)
        await transcriptChannel.setName(`closed-${transcriptChannel.name.slice(7, 300)}`)
        message.channel.send(embed1)
    }
}