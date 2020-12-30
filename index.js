require('dotenv').config();


const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./command');
const ytdl = require('ytdl-core');
const { lectura, escritura } = require('./RepoData');




client.once('ready', () => {
    console.log('Bot UP');

    command(client, 'ping', message => {
        message.channel.send('Pong');
    });

    command(client, 'status', message => {
        const content = message.content.replace('!status', '');
        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    });

    command(client, 'xiangling', message => {
        message.channel.send('Xiangling <:xiangling:793198503605960775>').then((msn) => {
            msn.react('<:xiangling:793198503605960775>');
        });
    });


    command(client, ['sound', 's'], (message) => {
        const sonido = message.content.split(" ")[1];
        var data = lectura();
        if (sonido === undefined) {
            var lista = ['Sonidos Disponibles'];
            data.forEach(soundtrack => { lista.push(soundtrack.data); })
            message.channel.send(lista);
            return
        }

        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.reply("Entre a un canal de voz primero amigo");
        data.forEach(soundtrack => {
            if (soundtrack.data === sonido) {
                voiceChannel.join().then(connection => {
                    const stream = ytdl(soundtrack.url, { filter: 'audioonly' });
                    const dispatcher = connection.play(stream);
                    dispatcher.on("end", end => {
                        console.log("left channel");
                        voiceChannel.leave();
                    });
                }).catch(err => console.log(err));
            }
        });
    });

    command(client, ['crear', 'c'], message => {
        const soundtrackUrl = message.content.split(" ")[2];
        const soundtrackName = message.content.split(" ")[1];
        console.log(soundtrackUrl, soundtrackName);
        var sonidos = lectura();
        sonidos.push({
            data: soundtrackName,
            url: soundtrackUrl
        });
        console.log(sonidos);
        escritura(sonidos);
    });



    command(client, 'help', (message) => {
        const attachment = new Discord
            .MessageAttachment('./assets/xiangling.png', 'xiangling.png');

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .attachFiles(attachment)
            .setTitle('Mafia Bot Help')
            .setDescription('lista de comandos básicos')
            .addFields(
                { name: 'Crear nuevo sonido', value: '!crear <nombre> <url>' },
                { name: 'Reproducir sonido', value: '!sound <nombre>' },
                { name: 'Lista de sonidos', value: '!sound' },
                { name: 'Setear estado del bot', value: '!status <estado>' },
                { name: 'xiangling', value: '!xiangling' }
            )
            .setImage('attachment://xiangling.png')
            .setTimestamp()
        message.channel.send(exampleEmbed);
    })
})


client.login(process.env.TOKEN);