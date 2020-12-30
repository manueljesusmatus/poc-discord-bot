const fs = require('fs')

function lectura(){
    try {
        const jsonString = fs.readFileSync('./data/data.json');
        const data = JSON.parse(jsonString);
        return data;
    } catch (err) {
        console.log(err);
        return;
    }
}

function escritura(registro){
    const jsonString = JSON.stringify(registro)
    fs.writeFile('./data/data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}


module.exports = {
    lectura: lectura,
    escritura: escritura
};