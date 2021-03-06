const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')

module.exports = {
    config: {
        name: `setup`,
        aliases: []
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`**401 - Unauthorised:** You do not have permission to use this command.`)
        let embed = new MessageEmbed()
            .setColor(config.embed_colour)
            .setAuthor(`Tickets`, message.guild.iconURL())
            .setDescription('Your text here, put anything you want describing what this is for.')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(`Categorys`, 'šø *- Billing/Payments* \nš² *- Minecraft Related* \nš» *- Server Related*')
        let ticketCreation = await message.channel.send(embed);
        await ticketCreation.react('šø')
        await ticketCreation.react('š²')
        await ticketCreation.react('š»')
    }
}