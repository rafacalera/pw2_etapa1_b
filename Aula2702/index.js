const chalk = require('chalk')
const inquirer = require('inquirer')
const calculadora = require('calculadora')

inquirer.prompt([
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
]).then()
.catch()