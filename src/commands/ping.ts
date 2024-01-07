import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
  const message = await interaction.reply({
    content: "Calculando latência...",
    fetchReply: true,
  });
  const latency = message.createdTimestamp - interaction.createdTimestamp;
  await message.edit(`Latência do bot: ${latency}ms`);
}