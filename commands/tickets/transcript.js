const { Message, Client, MessageAttachment} = require('discord.js')
const fs = require('fs')
const config = require('../../config.js')

module.exports = {
    config: {
        name: `transcript`,
        aliases: []
    },
    run: async (bot, message, args) => {
        if(!message.member.roles.cache.find(r => r.id === config.support_role_id)) return message.channel.send(`**401 - Unauthorised:** You do not have permission to use this command.`)
        const transcriptChannel = message.guild.channels.cache.get('825078144138346507')
        message.channel.send('Under Construction')
            //fs.writeFileSync(`../transcript.txt`, data.Content.join("\n\n"))
            //transcriptChannel.send(`ticket have been closed.`)
            //await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../transcript.txt`)));
    }
}
            