const { QueueRepeatMode } = require("discord-player");

module.exports = {
    name: 'loop',
    description: 'Loops song',
    options: [
        {
            name: 'mode',
            type: 'INTEGER',
            description: 'Loop',
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: 'Queue',
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: 'Song',
                    value: QueueRepeatMode.TRACK,
                },
            ],
        }, 
    ],
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
                content: "No song to loop noob", 
            });
        
        const mode = interaction.options.get('mode').value;
        const isMode = queue.setRepeatMode(mode);

        var str = "";
        if(mode === QueueRepeatMode.OFF)
            str = "Looping stopped";
        else if(mode === QueueRepeatMode.QUEUE)
            str = "Queue is looped";
        else if(mode === QueueRepeatMode.TRACK)
            str = "Song is looped";

        return await interaction.followUp({
            content: isMode ? `${str}` : "Stupid loop not working",
        });
    }
}