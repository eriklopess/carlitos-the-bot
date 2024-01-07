import { Client, EmbedBuilder } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import { config } from "./config";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { VoiceConnection, VoiceConnectionStatus, entersState } from "@discordjs/voice";

export const client = new Client({
	intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildVoiceStates"],
}) as Client<boolean> & { distube: DisTube };

client.distube = new DisTube(client, {
	leaveOnStop: true,
	emitNewSongOnly: true,
	emitAddListWhenCreatingQueue: true,
	emitAddSongWhenCreatingQueue: true,
	plugins: [new SpotifyPlugin()]
});


client.once("ready", () => {
	console.log("Discord bot is ready! 🤖");
});

(async () => {
	await deployCommands({ guildId: config.DISCORD_GUILD_ID });
})();



client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) {
		return;
	}
	const { commandName } = interaction;
	if (commands[commandName as keyof typeof commands]) {
		commands[commandName as keyof typeof commands].execute(interaction);
	}



	client.distube.once("playSong", async (queue, song) => {
		await interaction.channel?.send(`Tocando ${song.name} - \`${song.formattedDuration}\``);
	});

	client.distube.on("disconnect", async (queue) => {
		await interaction.channel?.send("VAI TOMAR NO CU CARALHO, NÃO VOU MAIS TOCAR MÚSICA NENHUMA SEU FILHO DA PUTA 😡🤬");
	});

	client.distube.once("addSong", async (queue, song) => {
		const embed = new EmbedBuilder()
			.setTitle("Musica adicionada a fila")
			.setAuthor({ name: "Adicionado por " + interaction.user.displayName, iconURL: interaction.user.avatarURL() ?? "" })
			.setTimestamp()
			.setFooter({ text: "Patrocinado por Carlitos" })
			.addFields([
				{
					name: "Música",
					value: song.name as string,
					inline: true
				},
				{
					name: "Tempo",
					value: song.formattedDuration as string,
					inline: true
				},
				{
					name: "Posição na fila",
					value: queue.songs.length.toString(),
					inline: true
				},
				{
					name: "Tamanho da lista",
					value: queue.songs.length.toString(),
				},
				{
					name: "Tempo total",
					value: queue.formattedDuration,
				}
			])

		await interaction.channel?.send({ embeds: [embed] });
	});

	client.distube.once("addList", async (queue, playlist) => {
		const embed = new EmbedBuilder()
			.setTitle("Playlist adicionada a fila")
			.setAuthor({ name: "Adicionado por " + interaction.user.displayName, iconURL: interaction.user.avatarURL() ?? "" })
			.setTimestamp()
			.setFooter({ text: "Patrocinado por Carlitos" })
			.addFields([
				{
					name: "Playlist",
					value: playlist.name as string,
					inline: true
				},
				{
					name: "Tempo",
					value: playlist.formattedDuration as string,
					inline: true
				},
				{
					name: "Posição na fila",
					value: queue.songs.length.toString(),
					inline: true
				},
				{
					name: "Quantidade de músicas",
					value: playlist.songs.length.toString(),
				},
				{
					name: "Criador",
					value: playlist.user?.username as string,
				},
				{
					name: "Link",
					value: playlist.url as string,
				}
			])

		await interaction.channel?.send({ embeds: [embed] });
	}
	);
});


client.login(config.DISCORD_TOKEN);
