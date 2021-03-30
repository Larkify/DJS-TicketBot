const { Client, Collection, MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const serverData = require('./data.json');
const moment = require('moment');

let bot = new Client({ partials: ['REACTION', 'MESSAGE'] });

[`aliases`, `commands`].forEach(x => bot[x] = new Collection());
["command", "events"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    let messager = reaction.message;
    if (reaction.message.channel.id !== '825506160160800809') return
    if (!user.bot) reaction.users.remove(user.id);
    

    let category;
    let chanName;

    if (reaction.emoji.name === '💸') {
        category = 'Billing/Payments'
        chanName = 'billing'
    } else if (reaction.emoji.name === '🎲') {
        category = 'Minecraft Related'
        chanName = 'minecraft'
    } else if (reaction.emoji.name === '💻') {
        category = 'Server Related'
        chanName = 'server'
    } else {
        return
    }

    let contents = fs.readFileSync(path.join(__dirname, 'data.json'));
    let jsonContent = JSON.parse(contents);

    let memberWhoReacted = reaction.message.guild.members.cache.find(member => member.id === user.id);
    let timeStamp = Math.floor(Date.now());
    reaction.message.guild.channels
    .create(`ticket-${jsonContent.ticket_count}`, {
        type: 'text',
        parent: `${config.ticket_open_category}`,
        members: ''
    }).then(channel => {
        channel.createOverwrite(memberWhoReacted, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        })
        let TicketEmbed = new MessageEmbed()
        .setAuthor(`Support - #${jsonContent.ticket_count}`, reaction.message.guild.iconURL())
        .setDescription(`*Welcome to your private ticket, to get started, please state your issue and if It's server related, then include your Server-ID so that we can identify your server more easily.* \n\n**Name:** ${memberWhoReacted} \n**Category:** ${category} \n**Time:** ${moment(timeStamp).format('LL')} @ ${moment(timeStamp).format('LT')}`)
        .setColor(config.embed_colour)
        .setThumbnail(reaction.message.guild.iconURL({ dynamic: true }))
        .setFooter('Our team will be with you Promptly.')
        channel.send(`${memberWhoReacted} **- #${jsonContent.ticket_count}**`, TicketEmbed)

    // NEW TICKET NUMBER
    let newTicketNum = Number(jsonContent.ticket_count) + 1;
    fs.readFile(path.join(__dirname, 'data.json'), "utf8", (err, data) =>  {
        let person = JSON.parse(data)
        person.ticket_count = `${newTicketNum}`
        let updatedData = JSON.stringify(person)
        fs.writeFileSync(path.join(__dirname, 'data.json'), updatedData)
    })
})
});

bot.on('message', message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() == `<@!${bot.user.id}>` || message.content.toLowerCase() == `<@${bot.user.id}>`) {
    let embedHelp = new MessageEmbed()
    .setTitle('Help & Documentation')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setColor(config.embed_colour)
    .setDescription(`*This contains all the commands that can be used. If you like this bot, consider giving it a star on Github - https://github.com/larkify/DJS-TicketBot*`)
    .addField(`Tickets`, `\`close\` \`reopen\` \`delete\` \`add\` \`remove\``, false)
    .addField('Information', `\`help\` \`avatar\` \`userinfo\` \`serverinfo\``, false)
    .setFooter('Made with ❤ by larkx#0001')
    message.channel.send(embedHelp)
}})

bot.on('message', async message => {
    if (message.author.bot) return;
    if(message.channel.type !== 'dm') return;
    if (message.content.startsWith(config.prefix)) {
        let args = message.content.slice(config.prefix.length).split(' ');
        let command = args.shift().toLowerCase();

        switch (command) {

            case 'rate':
                 // MULTIPLE ARGS //
                const replyIDb4 = message.content.slice(config.prefix.length).trim().split(" ");
                const supportRating = message.content.slice(config.prefix.length).trim().split(" ").slice(2).join(' ').toLowerCase();
                const command = replyIDb4.shift().toLowerCase();
                let supportID = replyIDb4[0].replace(/['"]+/g, '')
                const userMSG = bot.users.cache.get(message.author.id)

                // MULTIPLE ARGS //
                if (!parseInt(supportID)) return userMSG.send('Please enter a valid ID.');
                if (!bot.channels.cache.find(channel => channel.name === `ticket-${supportID}` || channel.name === `closed-${supportID}`)) return userMSG.send(`Couldn't find a ticket with that ID.`)
                let ticketChannel = bot.channels.cache.find(channel => channel.name === `ticket-${supportID}` || channel.name === `closed-${supportID}`)
                if (ticketChannel.name == `ticket-${supportID}`) return userMSG.send(`You can only rate a ticket once it's closed!`)

                let ticketName = ticketChannel.name
                let filterBy = bot.user.id
                ticketChannel.messages.fetch().then(messages => {
                let openMessage = messages.find(m => m.content.includes(`#${ticketName.slice(7, 500)}`) && m.author.id === filterBy);
                let ticketUser = openMessage.mentions.users.first();

                if (ticketUser !== message.author) return userMSG.send(`You can only rate your own tickets!`)

                let rateEmbed = new MessageEmbed()
                .setTitle('Support Experience')
                .setColor(config.embed_colour)
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`*A new ticket rating was received.*`)
                .addField('Ticket ID:', '#' + supportID, true)
                .addField('Rating:', supportRating, true)

                bot.channels.cache.get('826100082164105247').send(rateEmbed);
                let thankYouEmbed = new MessageEmbed()
                .setColor(config.embed_colour)
                .setDescription('Your rating has been sent in! \n***- Thank you, from CryHosting***')
                userMSG.send(thankYouEmbed);


        }
    )}}
});

bot.login(config.token);

