const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment');
const config = require('../../config.js')

module.exports = {
    config: {
        name: `member`,
        aliases: ['user', 'userinfo']
    },
    run: async (bot, message, args) => {

        let mentionedMember = message.mentions.users.first();
        let mentionedMember1 = message.mentions.members.first();

        if (!mentionedMember) {
            // ELSE STATEMENT = IF NO ONE WAS MENTIONED
            let obj = message.author
            let tag = message.author.tag
            let nick = message.member.nickname
            let id = message.author.id
            let pfp = message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })
            let acreate = message.author.createdTimestamp
            let ajoined = message.member.joinedTimestamp
            let roles = message.member.roles.cache.array()
            let colour = message.member.displayHexColor

             if(!nick) nick = `None`;

            let embed = new MessageEmbed()
                .setColor(`${colour}`)
                .setDescription(`**Username:** \`${tag}\` \n**Nickname:** \`${nick}\` \n**User ID:** \`${id}\``)
                .setThumbnail(`${pfp}`)
                .addField(`Created Account`, `${moment(acreate).format('LL')} @ ${moment(acreate).format('LT')}`, true)
                .addField(`Joined Server`, `${moment(ajoined).format('LL')} @ ${moment(ajoined).format('LT')}`, true)
            message.channel.send(`🔁 User information for ${obj}`, embed)
            // ELSE STATEMENT = IF USER WAS MENTIONED
          } else {
            let tag1 = mentionedMember.tag
            let nick1 = mentionedMember1.nickname
            let id1 = mentionedMember.id
            let pfp1 = mentionedMember.avatarURL({ dynamic: true, format: 'png', size: 1024 })
            let acreate1 = mentionedMember.createdTimestamp
            let ajoined1 = mentionedMember1.joinedTimestamp
            let roles1 = mentionedMember1.roles.cache.array()
            let colour1 = mentionedMember1.displayHexColor

             if(!nick1) nick1 = `None`;

            let embed = new MessageEmbed()
                .setColor(`${colour1}`)
                .setDescription(`**Username:** \`${tag1}\` \n**Nickname:** \`${nick1}\` \n**User ID:** \`${id1}\``)
                .setThumbnail(`${pfp1}`)
                .addField(`Created Account`, `${moment(acreate1).format('LL')} @ ${moment(acreate1).format('LT')}`, true)
                .addField(`Joined Server`, `${moment(ajoined1).format('LL')} @ ${moment(ajoined1).format('LT')}`, true)
            message.channel.send(`🔁 User information for ${mentionedMember}`, embed);
          }
    }
}