const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'List all commands',
    execute(interaction){
        const embed = new MessageEmbed();
        embed.setTitle("Command List");
        embed.setTitle("prefix -> /");

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        commandFiles.sort();

        for(const file of commandFiles){
            const command = require(`./${file}`);
            embed.addFields(
                { name: `/ ${command.name}`, value: `desc: ${command.description}`}
            );
        }

        embed.setColor('36393F');

        return void interaction.reply({
            embeds: [embed]
        });
    }
}