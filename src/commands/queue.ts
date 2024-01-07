import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { client } from "..";

export const data = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Mostra a fila de músicas")

export async function execute(interaction: CommandInteraction) {
    const queue = client.distube.getQueue(interaction.guildId as string);

    if (!queue) {
        await interaction.reply("Não há músicas na fila");
        return;
    }

    const songs = queue.songs.map((song, index) => `${index + 1}. ${song.name}`);

    await interaction.reply(songs.join("\n"));
    return
}