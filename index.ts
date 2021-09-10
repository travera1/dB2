import discordJS, { Intents } from 'discord.js'
import { DefaultMessageNotificationLevels } from 'discord.js/typings/enums'
import dotenv from 'dotenv'
dotenv.config()

const client = new discordJS.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES   
    ]
})
client.on('ready', () => {
    console.log('the bot is ready now')

    const guildId = '885638454879326208'
    const guild = client.guilds.cache.get(guildId)
    let commands 

    if (guild) {
        commands = guild.commands 
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'sing',
        description: 'replies with song'
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'num1',
                description: 'the first number.',
                required: true,
                type: discordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'the second number.',
                required: true,
                type: discordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })
})

client.on('interationCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }

    const {commandName, options } = interaction

    if (commandName === 'sing') {
        interaction.reply({
            content: 'song',
            ephermeral: true,
        })
    } else if (commandName === 'add') {
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!

        interaction.reply({
            content: `The sum is ${num1 + num2}`, 
            ephermeral: true,
        })
    }
})

client.login(process.env.TOKEN)