module.exports = {
    name: "pause",
    description: "Pause song",
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
        
        await interaction.deferReply();

        const queue = player.getQueue(interaction.guildId);

        if(!queue || !queue.playing)
            return await interaction.followUp({ 
                content: "No song is playing noob", 
            });
        
        const currentTrack = queue.current;
        const isPaused = queue.setPaused(true);
        return await interaction.followUp({
            content: isPaused ? `Track **${currentTrack}** is paused` : "Stupid pause not working",
        });
    },
}