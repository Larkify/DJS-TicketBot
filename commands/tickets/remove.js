const { Message, Client, MessageAttachment, MessageEmbed} = require('discord.js')
const fs = require('fs')
const config = require('../../config.js')

module.exports = {
    config: {
        name: `add`,
        aliases: []
    },
    run: async (bot, message, args) => {
        if(!message.member.roles.cache.find(r => r.id === config.support_role_id)) return message.channel.send(`**401 - Unauthorised:** You do not have permission to use this command.`)
        let user = message.mentions.users.first();
        let user2 = args[0];
        const transcriptChannel = message.channel
        
        let userMention;
        if (user2.includes('<')) {
            transcriptChannel.createOverwrite(user, {
                SEND_MESSAGES: null,
                VIEW_CHANNEL: null
            })
            userMention = `${user}`
        }
        else {
            let setUser = await message.guild.members.fetch(user2)
            transcriptChannel.createOverwrite(setUser, {
                SEND_MESSAGES: null,
                VIEW_CHANNEL: null
            })
            userMention = `<@${user2}>`
        }

        let embed = new MessageEmbed()
        .setDescription(`Removed ${userMention} from **#${transcriptChannel.name.slice(7, 300)}**`)
        .setColor(config.embed_colour)
        message.channel.send(embed)
    }
}