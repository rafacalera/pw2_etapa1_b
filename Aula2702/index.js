const chalk = require('chalk')
const inquirer = require('inquirer')
const calculadora = require('./calculadora')
const cmedia = require ('./cmedia')
inquirer.prompt([
    {
        name: 'nAluno',
        message: 'Qual é o nome do aluno?'
    },
    {
        name: 't1',
        message: 'Qual a nota do primeiro trabalho: '
    },
    {
        name: 't2',
        message: 'Qual a nota do segundo trabalho: '
    },
    {
        name: 'p3',
        message: 'Qual é a nota da terceira prova: '
    },
    {
        name: 'p4',
        message: 'Qual é a nota da quarta prova: '
    }
]).then((answers) =>{
    console.log(`Sua média é: ${calculadora.media(answers.t1, answers.t2, answers.p3, answers.p4)}`)
   cmedia.clog(calculadora.media(answers.t1, answers.t2, answers.p3, answers.p4))
}  
)
.catch((error) => {console.log(error.isTtyError)})

