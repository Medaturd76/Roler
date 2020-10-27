const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js')
const prefix = '%'
const { remg, cnros, wdybdc, cnros2, wdybdc2 } = require('./Embeds.json')

client.on('ready', () => console.log("Ready to role away"))

client.on('message', async message => {
    const args = message.content.substring(prefix.length).split(" ")

    if (message.author.bot) return;
    if (!message.content.startsWith(`${prefix}`)) return;

    if (message.content.startsWith(`${prefix}getrole`)) {
            const msg = await message.author.send(remg)
            await msg.react('😀')
            await msg.react('🤑')
            await msg.react('😎')

            const filter = (reaction) => {
                return (reaction.emoji.name === '😀' || reaction.emoji.name === '🤑' || reaction.emoji.name === '😎')
            }

            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async reaction => {
                    if (reaction.first().emoji.name === '😀') {
                        const role = message.guild.roles.cache.find(role => role.name === 'New programer')
                        message.member.roles.add(role)
                    }
                    if (reaction.first().emoji.name === '🤑') {
                        const msg2 = await message.author.send(cnros)

                        const filter = (user) => {
                            return user.author.id === message.author.id
                        }

                        msg2.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                            .then(async collected => {
                                const link = collected.first().content

                                const msg3 = await message.channel.send(wdybdc)

                                const filter = (user) => {
                                    return user.author.id === message.author.id
                                }

                                msg3.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                    .then(async collected => {
                                        const description = collected.first().content
                                        const logc = message.guild.channels.cache.find(channel => channel.name === 'role-log')

                                        logc.send(new MessageEmbed()
                                            .setColor("ORANGE")
                                            .setTitle('**NOVICE PROGRAMMER APPLYED**')
                                            .setDescription(`${message.author.username} has applyed for the Novice programmer role. Bot link: ${link}. What the bot does: ${description}`)
                                            .setAuthor({ name: "Roler", iconURL: "", url: "" })
                                            .setFooter({ text: "Brought to you by Minecrafty999", iconURL: "https://cdn.discordapp.com/avatars/660862491102019604/5b28dadf6cf852c943e1df0a82dad850.webp" })
                                        )
                                    })
                            })
                    }
                    if (reaction.first().emoji.name === '😎') {
                        const msg2 = await message.author.send(cnros2)

                        const filter = (user) => {
                            return user.author.id === message.author.id
                        }

                        msg2.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                            .then(async collected => {
                                const links = collected.first().content

                                const msg3 = await message.channel.send(wdybdc2)

                                const filter = (user) => {
                                    return user.author.id === message.author.id 
                                }

                                msg3.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                    .then(async collected => {
                                        const descriptions = collected.first().content
                                        const logc = message.guild.channels.cache.find(channel => channel.name === 'role-log')

                                        logc.send(new MessageEmbed()
                                            .setColor("ORANGE")
                                            .setTitle('**NOVICE PROGRAMMER APPLYED**')
                                            .setDescription(`${message.author.username} has applyed for the Advanced programmer programmer role. Bot links: ${links}. What the bots do: ${descriptions}`)
                                            .setAuthor({ name: "Roler", iconURL: "", url: "" })
                                            .setFooter({ text: "Brought to you by Minecrafty999", iconURL: "https://cdn.discordapp.com/avatars/660862491102019604/5b28dadf6cf852c943e1df0a82dad850.webp" })
                                        )
                                    })
                            })
                    }
                })
        }
    const logc = message.guild.channels.cache.find(channel => channel.name === 'role-log')
    if (message.content.startsWith(`${prefix}accept`)) {
        if (message.member.roles.cache.find(role => role.name === 'Role picker') && message.channel.id === logc.id) {
            if (!args[1]) return message.channel.send();
            if (!args[2]) return message.channel.send();

            const botcreater = `<@${args[1]}>`
            const role = `<@${args[2]}>`

            const botcreater2 = message.guild.members.cache.find(member => member.user.username === botcreater)

            botcreater2.send(new MessageEmbed()
                .setColor("GREEN")
                .setTitle('**ACCEPTED**')
                .setDescription(`😱Your request to get the role ${args[2]} on the discord.js coding support server has been accepted`)
            )
            message.guild.members.cache.find(member => member.user.username === botcreater).roles.add(role)
        }
    }
})

client.login(process.env.token)