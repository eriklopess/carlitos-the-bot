import { CommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { client } from "..";

export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Reproduz um áudio")
    .addStringOption((option) =>
        option
            .setName("song")
            .setDescription("Nome da música")
            .setRequired(true)
    );

export async function execute(interaction: CommandInteraction) {
    try {
        const guild = await interaction.client.guilds.fetch(interaction.guildId as string);
        const voiceChannel = (await guild.members.fetch(interaction.user.id)).voice.channel;
        const music = interaction.options.get("song")?.value as string;
    
        await interaction.reply({
            content: "Procurando música...",
            ephemeral: true,
        });
    
        if (!music) {
            await interaction.editReply("Você precisa informar o nome da música");
            return;
        }
    
        if (!voiceChannel) {
            await interaction.editReply("Você precisa estar em um canal de voz");
            return;
        }
    
        await client.distube.play(voiceChannel, music, {
            member: interaction.member as GuildMember,
            textChannel: interaction.channel as any,
        });
    
        await interaction.editReply(
            "Música adicionada à fila"
        );
    } catch (error) {
        await interaction.editReply(`
        Ocorreu um erro ao reproduzir a música
        ${error}
        `);
    }
}