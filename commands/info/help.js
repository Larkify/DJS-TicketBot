const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    config: {
        name: `help`,
        aliases: []
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
        .setTitle('Help & Documentation')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor(config.embed_colour)
        .setDescription(`*This contains all the commands that can be used. If you like this bot, consider giving it a star on Github - https://github.com/larkify/DJS-TicketBot*`)
        .addField(`Tickets`, `\`close\` \`reopen\` \`delete\` \`add\` \`remove\``, false)
        .addField('Information', `\`help\` \`avatar\` \`userinfo\` \`serverinfo\``, false)
        .setFooter('Made with ❤ by larkx#0001')
        message.channel.send(embed);
    }
}