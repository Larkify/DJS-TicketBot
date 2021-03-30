const { Discord, MessageEmbed, Client } = require('discord.js');
const config = require('../../config.js');

module.exports = async (bot) => {
    console.log('')
    console.log(`${bot.user.tag} is Alive.`)
    bot.user.setStatus('online');
    let fullMemberCount = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    bot.user.setActivity(`cryhosting.net | v0.3`, { type: `WATCHING` });
}