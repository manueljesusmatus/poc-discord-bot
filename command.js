require('dotenv').config();

module.exports = (client, aliases, callback) => {
    if(typeof aliases === 'string' ){
        aliases = [aliases]
    }

    client.on('message', message =>{
        const {content} = message;
        aliases.forEach(alias => {
            const command = `${process.env.CMD_PREFIX}${alias}`

            if(content.startsWith(`${command} `) || content === command){
                console.log(`Ejecutando el comando ${command}`);
                callback(message);
            }
        });
    })
}

//process.env.CMD_PREFIX