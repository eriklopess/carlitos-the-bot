"use strict";var A=Object.create;var u=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var r=(e,a)=>{for(var o in a)u(e,o,{get:a[o],enumerable:!0})},D=(e,a,o,t)=>{if(a&&typeof a=="object"||typeof a=="function")for(let n of M(a))!_.call(e,n)&&n!==o&&u(e,n,{get:()=>a[n],enumerable:!(t=L(a,n))||t.enumerable});return e};var E=(e,a,o)=>(o=e!=null?A(P(e)):{},D(a||!e||!e.__esModule?u(o,"default",{value:e,enumerable:!0}):o,e)),U=e=>D(u({},"__esModule",{value:!0}),e);var X={};r(X,{client:()=>s});module.exports=U(X);var d=require("discord.js");var c=require("discord.js");var w=E(require("dotenv"),1);w.default.config();var{DISCORD_TOKEN:b,DISCORD_CLIENT_ID:h,DISCORD_GUILD_ID:v}=process.env;if(!b||!h||!v)throw new Error("Missing environment variables");var i={DISCORD_TOKEN:b,DISCORD_CLIENT_ID:h,DISCORD_GUILD_ID:v};var p={};r(p,{data:()=>G,execute:()=>B});var I=require("discord.js"),G=new I.SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");async function B(e){let a=await e.reply("Calculando..."),o=a.createdTimestamp-new Date().getTime();await a.edit(`Lat\xEAncia do bot: ${o}ms`)}var g={};r(g,{data:()=>$,execute:()=>k});var l=require("discord.js"),$=new l.SlashCommandBuilder().setName("ban").setDescription("lan\xE7a o famoso").addUserOption(e=>e.setName("user").setDescription("Usu\xE1rio a ser banido").setRequired(!0)).addStringOption(e=>e.setName("reason").setDescription("Motivo do banimento").setRequired(!0));async function k(e){let a=e.options.getUser("user"),o=e.options.get("reason"),t=e.guild?.members.cache.get(a?.id),n=o?.value;if(!t){let O=new l.EmbedBuilder().setTitle("Tomou o famoso").setDescription("Banimento").addFields([{name:"Motivo",value:n??"Sem motivo",inline:!0},{name:"Usu\xE1rio",value:a?.username??"Sem usu\xE1rio",inline:!0},{name:"Autor",value:e.user.username??"Sem autor"}]).setThumbnail("https://media1.tenor.com/m/aGSAXma4EaAAAAAd/ednaldo-pereira-banido.gif").setTimestamp().setFooter({text:"Patrocinado por Carlitos"});await e.reply({embeds:[O]})}}var f={};r(f,{data:()=>q,execute:()=>F});var S=require("discord.js");var q=new S.SlashCommandBuilder().setName("play").setDescription("Reproduz um \xE1udio").addStringOption(e=>e.setName("song").setDescription("Nome da m\xFAsica").setRequired(!0));async function F(e){try{let o=(await(await e.client.guilds.fetch(e.guildId)).members.fetch(e.user.id)).voice.channel,t=e.options.get("song")?.value;if(await e.reply({content:"Procurando m\xFAsica...",ephemeral:!0}),!t){await e.reply("Voc\xEA precisa informar o nome da m\xFAsica");return}if(!o){await e.reply("Voc\xEA precisa estar em um canal de voz");return}await s.distube.play(o,t,{member:e.member,textChannel:e.channel}),await e.editReply("M\xFAsica adicionada \xE0 fila")}catch(a){await e.reply(`
        Ocorreu um erro ao reproduzir a m\xFAsica
        ${a}
        `)}}var y={};r(y,{data:()=>Q,execute:()=>z});var x=require("discord.js");var Q=new x.SlashCommandBuilder().setName("queue").setDescription("Mostra a fila de m\xFAsicas");async function z(e){let a=s.distube.getQueue(e.guildId);if(!a){await e.reply("N\xE3o h\xE1 m\xFAsicas na fila");return}let o=a.songs.map((t,n)=>`${n+1}. ${t.name}`);await e.reply(o.join(`
`))}var C={};r(C,{data:()=>K,execute:()=>V});var T=require("discord.js");var K=new T.SlashCommandBuilder().setName("skip").setDescription("Pula a musica");async function V(e){try{let a=s.distube.getQueue(e.guildId);if(!a){await e.reply("N\xE3o h\xE1 m\xFAsicas na fila");return}if(a.songs.length===1){await e.reply("N\xE3o h\xE1 mais m\xFAsicas na fila para pular");return}await s.distube.skip(e.guildId),await e.reply(`
        M\xFAsica pulada por ${e.user.globalName}
        `)}catch(a){await e.reply(`
        Ocorreu um erro ao pular a m\xFAsica
        ${a}
        `)}}var m={ping:p,ban:g,play:f,queue:y,skip:C};var j=Object.values(m).map(e=>e.data),W=new c.REST({version:"10"}).setToken(i.DISCORD_TOKEN);async function N({guildId:e}){try{console.log("Started refreshing application (/) commands."),await W.put(c.Routes.applicationGuildCommands(i.DISCORD_CLIENT_ID,e),{body:j}),console.log("Successfully reloaded application (/) commands.")}catch(a){console.error(a)}}var R=require("distube"),s=new d.Client({intents:["Guilds","GuildMessages","DirectMessages","GuildVoiceStates"]});s.distube=new R.DisTube(s,{leaveOnStop:!0,emitNewSongOnly:!0,emitAddListWhenCreatingQueue:!0,emitAddSongWhenCreatingQueue:!0});s.once("ready",()=>{console.log("Discord bot is ready! \u{1F916}")});(async()=>await N({guildId:i.DISCORD_GUILD_ID}))();s.on("interactionCreate",async e=>{if(!e.isCommand())return;let{commandName:a}=e;m[a]&&m[a].execute(e),s.distube.once("playSong",async(o,t)=>{await e.channel?.send(`Tocando ${t.name} - \`${t.formattedDuration}\``)}),s.distube.once("addSong",async(o,t)=>{let n=new d.EmbedBuilder().setTitle("Musica adicionada a fila").setAuthor({name:"Adicionado por "+e.user.displayName,iconURL:e.user.avatarURL()??""}).setTimestamp().setFooter({text:"Patrocinado por Carlitos"}).addFields([{name:"M\xFAsica",value:t.name,inline:!0},{name:"Tempo",value:t.formattedDuration,inline:!0},{name:"Posi\xE7\xE3o na fila",value:o.songs.length.toString(),inline:!0},{name:"Tamanho da lista",value:o.songs.length.toString()},{name:"Tempo total",value:o.formattedDuration}]);await e.channel?.send({embeds:[n]})}),s.distube.once("addList",async(o,t)=>{let n=new d.EmbedBuilder().setTitle("Playlist adicionada a fila").setAuthor({name:"Adicionado por "+e.user.displayName,iconURL:e.user.avatarURL()??""}).setTimestamp().setFooter({text:"Patrocinado por Carlitos"}).addFields([{name:"Playlist",value:t.name,inline:!0},{name:"Tempo",value:t.formattedDuration,inline:!0},{name:"Posi\xE7\xE3o na fila",value:o.songs.length.toString(),inline:!0},{name:"Quantidade de m\xFAsicas",value:t.songs.length.toString()},{name:"Criador",value:t.user?.username},{name:"Link",value:t.url}]);await e.channel?.send({embeds:[n]})})});s.login(i.DISCORD_TOKEN);0&&(module.exports={client});
