
const readline = require('node:readline');
const fs = require('node:fs');

const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
let data = require('./data/file.json');
// function check(prompt) {
//     return new Promise((callbackFn, errorFn) => {
//         rl.question(prompt, (uinput) => {
//             callbackFn(uinput);
//         }, () => {
//             errorFn();
//         });
//     });
// }
let annonces = []
const add = () => {
    const obj = {}
    rl.question('Titre: ', (answer) => {
        obj.Titre = answer
        rl.question('Description: ', (answer) => {
            obj.Description = answer
            rl.question('Prix: ', (answer) => {
                obj.Prix = answer
                annonces.push(obj)
                if (fs.existsSync("data/file.json")){
                    console.log('ici')
                    return
                    fs.appendFile('data/file.json', Object.assign({}, annonces), function (err) {
                        if (err) throw err;
                        console.log('Annonce ajouté')
                    })
                }else{
                    try {
                        fs.writeFileSync('data/file.json', JSON.stringify(Object.assign({}, annonces)));
                        console.log('Annonce ajouté')
                    } catch (err) {
                        console.error(err);
                    }
                }
                test()
            })
        })
    })
}


function list (data) {
    for (let x of data){
        console.log('Titre: ' + x.Titre)
        console.log('Description: ' + x.Description)
        console.log('Prix: ' + x.Prix)
        console.log('----------------------------')
    }
    test()
}

function test (){
    rl.question(' add - Ajouter une annonce \n list - Lister les annonces \n', (answer) => {
        if(answer == 'add'){
            add()
        }else if (answer == 'list'){
            list(data)
        }
    })
}

function help(){
    rl.question('', (answer) => {
        if(answer == 'help'){
            test()
        }
    })
}

help()
