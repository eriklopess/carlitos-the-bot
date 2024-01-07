import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("lança o famoso")
    .addUserOption((option) => option.setName("user").setDescription("Usuário a ser banido").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("Motivo do banimento").setRequired(true));



export async function execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user");
    const rawReason = interaction.options.get("reason");
    const member = interaction.guild?.members.cache.get(user?.id as string);
    const reason = rawReason?.value as string | undefined;

    const rawAuthor = interaction.user;
    const author = interaction.guild?.members.cache.get(rawAuthor.id);

    if (!author?.permissions.has("BanMembers")) {
        await interaction.reply({
            content: "Você não tem permissão para banir usuários",
            ephemeral: true
        });
        return;
    }

    if (!member) {
        await interaction.reply({
            content: "Usuário não encontrado",
            ephemeral: true
        });
        return;
    }
    
    const embed = new EmbedBuilder()
        .setTitle("Tomou o famoso")
        .setDescription("Banimento")
        .addFields(
            [
                { name: "Motivo", value: reason ?? "Sem motivo", inline: true },
                { name: "Usuário", value: user?.username ?? "Sem usuário", inline: true },
                { name: "Autor", value: interaction.user.username ?? "Sem autor" }
            ]
        )
        .setThumbnail("https://media1.tenor.com/m/aGSAXma4EaAAAAAd/ednaldo-pereira-banido.gif")
        .setTimestamp()
        .setFooter({ text: "Patrocinado por Carlitos" });
    member.bannable ? await member.ban({ reason: reason ?? "Sem motivo" }) : await interaction.reply("Usuário não pode ser banido");
    await interaction.reply({ embeds: [embed] });

}