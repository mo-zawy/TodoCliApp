const fs = require('fs');

const readFile = () => {
    //console.log('read file');
    const dataString = fs.readFileSync('./notes.json','utf-8')
    if(!dataString) {
        return [];
    }else
    {
        return JSON.parse(dataString);
    }
    
}

const writeFile = (data) => {
    fs.writeFileSync('./notes.json', JSON.stringify(data,null,2),'utf-8');

}

module.exports = {  readFile , writeFile };