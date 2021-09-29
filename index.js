//Imports
const { Client, Collection, Intents, Interaction } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require('discord-player');
const date = require('date-and-time');
const fs = require('fs');

//Defining Client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

//Make collection of commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Defining Player
const player = new Player(client);

//Player Event Handling
player.on("trackStart", (queue, track) => {
    queue.metadata.channel.send(`I am playing **${track.title}** for you noobs.`);
});

//Client Event Handling
client.on('ready', () => {
    console.log('Brave-MusicBot is online.');
    const now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');
    client.channels.cache.get("889981160246099968").send(`Brave-MusicBot is online at ${now}`);
    client.user.setActivity("with people's ears", {type: "PLAYING"});
});

//Client Message Handling 
client.on('messageCreate', async message =>{
    if(message.author.bot)
        return;
    if(!client.application?.owner)
        await client.application?.fetch();
    
    //Installing commands
    if(message.content == "!install"){
        await message.guild.commands
            .set(client.commands)
            .then(() => {
                message.reply('Virus Installed');
            })
            .catch(error => {
                console.error(error);
                message.reply('You not the wizard');
            });
    }
});

//Client Interaction Handling
client.on("interactionCreate", async (interaction) =>{
    if(!interaction.isCommand()) 
        return;

    const command = client.commands.get(interaction.commandName.toLowerCase());

    try{
        command.execute(interaction, player);
    }
    catch(error){
        console.error(error);
        interaction.followUp({
            content: 'Stupid Error',
        });
    }

});

//Authorizing
client.login(token);
