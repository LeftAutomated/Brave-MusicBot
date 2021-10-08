module.exports = {
    name: 'queue',
    description: 'Displays all songs in queue',
    async execute(interaction, player){
        if(!interaction.member.voice.channelId)
            return await interaction.reply({
                content: "Why you not in VC -_-",
                ephemeral: true,
            });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
            return await interaction.reply({ 
                content: "Why you not in the same VC -_-", 
                ephemeral: true, 
            });
        
        const queue = player.getQueue(interaction.guildId);

        if(typeof(queue) != 'undefined'){
            trimString = (str, max) => {
                return ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)
            };
            return await interaction.reply({
                embeds: [
                    {
                        title: 'Queued Songs',
                        description: trimString(`**Current Song:** \n **${queue.current.title}** \n\n ${queue}`, 4095),
                        color: 0x36393F,
                    }
                ]
            });
        }
        else{
            return await interaction.reply({
                content: 'There is no songs in queue noob'
            });
        }
    }
}