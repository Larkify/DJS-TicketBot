const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment');
const config = require('../../config.js')

module.exports = {
    config: {
        name: `discord`,
        aliases: ['serverinfo', 'server']
    },
    run: async (bot, message, args) => {
		const members = message.guild.memberCount;
        message.guild.botCount

        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Very High'
        };

        let ownerr = message.guild.ownerID
		const embed = new MessageEmbed()
			.setColor(config.embed_colour)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024}))
            .setImage(message.guild.bannerURL({ dynamic: true }))
			.addField('Server Name', `${message.guild.name}`, true)
            .addField('Server ID', `${message.guild.id}`, true)
            .addField('Member Count', `${message.guild.memberCount}`, true)
            .addField('Verification', `${verificationLevels[message.guild.verificationLevel]}`, true)
            .addField('Owner', `<@${ownerr}>`, true)
            .addField('Region', `${regions[message.guild.region]}`, true)
            .addField('Created', ` ${moment(message.guild.createdTimestamp).format('LL')} @ ${moment(message.guild.createdTimestamp).format('LT')}`)
			.setFooter(`Requested by ${message.author.tag} | CryBot`);
		message.channel.send(`🔄 **Server Info:** ${message.guild.name}`, embed);
	}

};
// 