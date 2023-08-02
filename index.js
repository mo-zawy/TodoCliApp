const {program} = require('commander');
const {readFile , writeFile} = require('./helper');



program
  .name('string-util')
  .description('CLI program to manipulate todo list')
  .version('1.0.0');


// add to file
program.command('add')
.description('add item to list')
.argument('<title>', 'title of todo' )
.argument('<desc>', 'description of todo' )
.action((title, desc) => {
    if(!title || !desc) {
        console.log('please enter title and desc');
        return;
    }else{
        const data = readFile();
        const isExist = data.find((item) => item.title === title);
        if(isExist) {
            console.log('title is exist');
            console.log('please enter another title');
            return;
        }
    }
    writeFile(data.push({title , desc , date:new Date()}));
    console.log('add todo success', readFile());
});


// list file
program.command('list')
.description('list item to list')
.action(() => {
    console.log('list all todos');
    const data = readFile();
    if(data.length === 0) {
        console.log('no data');
    }else {
        data.forEach((item) => {
            console.log("title is : "+ item.title + "  desc is : " + item.desc + "  date is : " + item.date);
        });
    }
});

// remove from file with title
program.command('remove')
.description('remove item from list')
.argument('<title>', 'title of todo' )
.action((title) => {
    console.log('remove item to list');
    console.log(title);
    const data = readFile();
    const isExist = data.find((item) => item.title === title);
    if(!isExist) {
        console.log('title is not exist');
        console.log('please enter another title');
        return;
    }
    const newData = data.filter((item) => item.title !== title);
    writeFile(newData);
    console.log('remove todo success' , readFile());
});

// edit desc from file with title
program.command('edit')
.description('edit item to list')
.argument('<title>', 'title of todo' )
.argument('<desc>', 'description of todo' )
.action((title, desc) => {
    console.log('edit item to list');
    const data = readFile();
    const isExist = data.find((item) => item.title === title);
    if(!isExist) {
        console.log('title is not exist');
        console.log('please enter another title');
        return;
    }
    const newData = data.filter((item) => item.title !== title);
    newData.push({title , desc , date:new Date()});
    writeFile(newData);
    console.log('edit todo success', readFile() );
});





program.parse(process.argv);
