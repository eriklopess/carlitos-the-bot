"use strict";var U=Object.create;var u=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var r=(e,a)=>{for(var o in a)u(e,o,{get:a[o],enumerable:!0})},b=(e,a,o,t)=>{if(a&&typeof a=="object"||typeof a=="function")for(let n of P(a))!_.call(e,n)&&n!==o&&u(e,n,{get:()=>a[n],enumerable:!(t=L(a,n))||t.enumerable});return e};var B=(e,a,o)=>(o=e!=null?U(E(e)):{},b(a||!e||!e.__esModule?u(o,"default",{value:e,enumerable:!0}):o,e)),G=e=>b(u({},"__esModule",{value:!0}),e);var J={};r(J,{client:()=>s});module.exports=G(J);var d=require("discord.js");var c=require("discord.js");var h=B(require("dotenv"),1);h.default.config();var{DISCORD_TOKEN:w,DISCORD_CLIENT_ID:D,DISCORD_GUILD_ID:S}=process.env;if(!w||!D||!S)throw new Error("Missing environment variables");var i={DISCORD_TOKEN:w,DISCORD_CLIENT_ID:D,DISCORD_GUILD_ID:S};var p={};r(p,{data:()=>V,execute:()=>$});var I=require("discord.js"),V=new I.SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");async function $(e){let a=await e.reply({content:"Calculando lat\xEAncia...",fetchReply:!0}),o=a.createdTimestamp-e.createdTimestamp;await a.edit(`Lat\xEAncia do bot: ${o}ms`)}var g={};r(g,{data:()=>k,execute:()=>q});var l=require("discord.js"),k=new l.SlashCommandBuilder().setName("ban").setDescription("lan\xE7a o famoso").addUserOption(e=>e.setName("user").setDescription("Usu\xE1rio a ser banido").setRequired(!0)).addStringOption(e=>e.setName("reason").setDescription("Motivo do banimento").setRequired(!0));async function q(e){let a=e.options.getUser("user"),o=e.options.get("reason"),t=e.guild?.members.cache.get(a?.id),n=o?.value,A=e.user;if(!e.guild?.members.cache.get(A.id)?.permissions.has("BanMembers")){await e.reply({content:"Voc\xEA n\xE3o tem permiss\xE3o para banir usu\xE1rios",ephemeral:!0});return}if(!t){await e.reply({content:"Usu\xE1rio n\xE3o encontrado",ephemeral:!0});return}let M=new l.EmbedBuilder().setTitle("Tomou o famoso").setDescription("Banimento").addFields([{name:"Motivo",value:n??"Sem motivo",inline:!0},{name:"Usu\xE1rio",value:a?.username??"Sem usu\xE1rio",inline:!0},{name:"Autor",value:e.user.username??"Sem autor"}]).setThumbnail("https://media1.tenor.com/m/aGSAXma4EaAAAAAd/ednaldo-pereira-banido.gif").setTimestamp().setFooter({text:"Patrocinado por Carlitos"});t.bannable?await t.ban({reason:n??"Sem motivo"}):await e.reply("Usu\xE1rio n\xE3o pode ser banido"),await e.reply({embeds:[M]})}var f={};r(f,{data:()=>F,execute:()=>Q});var v=require("discord.js");var F=new v.SlashCommandBuilder().setName("play").setDescription("Reproduz um \xE1udio").addStringOption(e=>e.setName("song").setDescription("Nome da m\xFAsica").setRequired(!0));async function Q(e){try{let o=(await(await e.client.guilds.fetch(e.guildId)).members.fetch(e.user.id)).voice.channel,t=e.options.get("song")?.value;if(await e.reply({content:"Procurando m\xFAsica...",ephemeral:!0}),!t){await e.editReply("Voc\xEA precisa informar o nome da m\xFAsica");return}if(!o){await e.editReply("Voc\xEA precisa estar em um canal de voz");return}await s.distube.play(o,t,{member:e.member,textChannel:e.channel}),await e.editReply("M\xFAsica adicionada \xE0 fila")}catch(a){await e.editReply(`
        Ocorreu um erro ao reproduzir a m\xFAsica
        ${a}
        `)}}var y={};r(y,{data:()=>z,execute:()=>H});var R=require("discord.js");var z=new R.SlashCommandBuilder().setName("queue").setDescription("Mostra a fila de m\xFAsicas");async function H(e){let a=s.distube.getQueue(e.guildId);if(!a){await e.reply("N\xE3o h\xE1 m\xFAsicas na fila");return}let o=a.songs.map((t,n)=>`${n+1}. ${t.name}`);await e.reply(o.join(`
`))}var C={};r(C,{data:()=>K,execute:()=>j});var T=require("discord.js");var K=new T.SlashCommandBuilder().setName("skip").setDescription("Pula a musica");async function j(e){try{let a=s.distube.getQueue(e.guildId);if(!a){await e.reply("N\xE3o h\xE1 m\xFAsicas na fila");return}if(a.songs.length===1){await e.reply("N\xE3o h\xE1 mais m\xFAsicas na fila para pular");return}await s.distube.skip(e.guildId),await e.reply(`
        M\xFAsica pulada por ${e.user.globalName}
        `)}catch(a){await e.reply(`
        Ocorreu um erro ao pular a m\xFAsica
        ${a}
        `)}}var m={ping:p,ban:g,play:f,queue:y,skip:C};var W=Object.values(m).map(e=>e.data),X=new c.REST({version:"10"}).setToken(i.DISCORD_TOKEN);async function N({guildId:e}){try{console.log("Started refreshing application (/) commands."),await X.put(c.Routes.applicationGuildCommands(i.DISCORD_CLIENT_ID,e),{body:W}),console.log("Successfully reloaded application (/) commands.")}catch(a){console.error(a)}}var O=require("distube"),x=require("@distube/spotify"),s=new d.Client({intents:["Guilds","GuildMessages","DirectMessages","GuildVoiceStates"]});s.distube=new O.DisTube(s,{leaveOnStop:!0,emitNewSongOnly:!0,emitAddListWhenCreatingQueue:!0,emitAddSongWhenCreatingQueue:!0,plugins:[new x.SpotifyPlugin]});s.once("ready",()=>{console.log("Discord bot is ready! \u{1F916}")});(async()=>await N({guildId:i.DISCORD_GUILD_ID}))();s.on("interactionCreate",async e=>{if(!e.isCommand())return;let{commandName:a}=e;m[a]&&m[a].execute(e),s.distube.once("playSong",async(o,t)=>{await e.channel?.send(`Tocando ${t.name} - \`${t.formattedDuration}\``)}),s.distube.on("disconnect",async o=>{await e.channel?.send("VAI TOMAR NO CU CARALHO, N\xC3O VOU MAIS TOCAR M\xDASICA NENHUMA SEU FILHO DA PUTA \u{1F621}\u{1F92C}")}),s.distube.once("addSong",async(o,t)=>{let n=new d.EmbedBuilder().setTitle("Musica adicionada a fila").setAuthor({name:"Adicionado por "+e.user.displayName,iconURL:e.user.avatarURL()??""}).setTimestamp().setFooter({text:"Patrocinado por Carlitos"}).addFields([{name:"M\xFAsica",value:t.name,inline:!0},{name:"Tempo",value:t.formattedDuration,inline:!0},{name:"Posi\xE7\xE3o na fila",value:o.songs.length.toString(),inline:!0},{name:"Tamanho da lista",value:o.songs.length.toString()},{name:"Tempo total",value:o.formattedDuration}]);await e.channel?.send({embeds:[n]})}),s.distube.once("addList",async(o,t)=>{let n=new d.EmbedBuilder().setTitle("Playlist adicionada a fila").setAuthor({name:"Adicionado por "+e.user.displayName,iconURL:e.user.avatarURL()??""}).setTimestamp().setFooter({text:"Patrocinado por Carlitos"}).addFields([{name:"Playlist",value:t.name,inline:!0},{name:"Tempo",value:t.formattedDuration,inline:!0},{name:"Posi\xE7\xE3o na fila",value:o.songs.length.toString(),inline:!0},{name:"Quantidade de m\xFAsicas",value:t.songs.length.toString()},{name:"Criador",value:t.user?.username},{name:"Link",value:t.url}]);await e.channel?.send({embeds:[n]})})});s.login(i.DISCORD_TOKEN);0&&(module.exports={client});
