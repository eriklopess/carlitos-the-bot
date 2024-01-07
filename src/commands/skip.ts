import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { client } from "..";

export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pula a musica")

export async function execute(interaction: CommandInteraction) {
    try {
        const queue = client.distube.getQueue(interaction.guildId as string);
        if (!queue) {
            await interaction.reply("Não há músicas na fila");
            return;
        }
        
        if (queue.songs.length === 1) {
            await interaction.reply("Não há mais músicas na fila para pular");
            return;
        }
    
        await client.distube.skip(interaction.guildId as string);
    
        await interaction.reply(`
        Música pulada por ${interaction.user.globalName}
        `);
    } catch (error) {
        await interaction.reply(`
        Ocorreu um erro ao pular a música
        ${error}
        `);
    }
}