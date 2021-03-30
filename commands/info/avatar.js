const { MessageEmbed, Message } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    config: {
        name: `avatar`,
        aliases: ['av', 'pfp']
    },
    run: async (bot, message, args) => {

        let mentionedMember = message.mentions.users.first();

        if (!mentionedMember) {
            let embed = new MessageEmbed()
            .setTitle('Profile Avatar')
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL({ dynamic: true, size: 1024 })}`)
            .setImage(`${message.author.avatarURL({ dynamic: true, size: 1024 })}`)
            .setColor(config.embed_colour)
            message.channel.send(embed)
        } else {
            let embed = new MessageEmbed()
            .setTitle('Profile Avatar')
            .setAuthor(`${mentionedMember.tag}`, `${mentionedMember.avatarURL({ dynamic: true, size: 1024 })}`)
            .setImage(`${mentionedMember.avatarURL({ dynamic: true, size: 1024 })}`)
            .setColor(config.embed_colour)
            message.channel.send(embed)
        }
    }}
