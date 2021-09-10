import discordJS, { Intents } from 'discord.js'
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
})

client.on('messageCreate',(message) => {
    if(message.content === 'sing') {
        message.reply ({
            content: 'song!'
        })
    }

})

client.login(process.env.TOKEN)