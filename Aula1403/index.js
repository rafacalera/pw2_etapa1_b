//#region Módulos Externos
    const chalk = require('chalk')
    const inquirer = require('inquirer')
//#endregion

//#region Módulos Internos
    const fs = require('fs')
const { type } = require('os')
//#endregion

operation()

//#region Ações iniciais
function operation()
{
    inquirer.prompt
    ([
        {
        type: 'list',
        name: 'action',
        message: 'O que deseja fazer?',
        choices:
            [
            'Criar conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
            ]
        }
    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar conta' ){
            console.log('Criando a Conta...')
            createAccount()
        }
        else if (action === 'Consultar Saldo'){
            console.log('Consultando seu saldo...')
        }
        else if (action === 'Depositar'){
            console.log('Depositando em sua conta...')
        }
        else if (action === 'Sacar'){
            console.log('Sacando de sua conta')
        }
        else if (action === 'Sair'){
            console.log(chalk.bgBlue.yellow.bold('SAINDO DA APLICAÇÃO CONTAS ETEC'))
            setTimeout(()=>{
                process.exit()
            }, 1500);
        }
    })
}
//#endregion

//#region Criar conta

    function createAccount(){
        console.log(chalk.bgGreen.black('Bem Vindos ao Contas ETEC Bank!'))
        console.log(chalk.green('Siga as orientações a seguir:'))

        buildAccount()

    }
    function buildAccount(){
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Entre com o nome da conta'

            }      
        ]).then((answer) => {
            const accountName = answer['accountName']

            if(!fs.existsSync('accounts'))
            {
                fs.mkdirSync('accounts')
            }
            if(fs.existsSync(`accounts/${accountName}.json`))
            {
                console.log(chalk.bgRed.black('Esta conta ja existe'))
                buildAccount(accountName)
                return
            }

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance": 0}',
                function(err){
                    console.error(err)
                }
            )
            console.info(chalk.green('Parabéns! Sua conta no ETEC Bank foi criada.'))
            operation()
        })
    }
//#endregion

//#region Depositar na Conta
function deposit() {
    inquirer.prompt([
    {
            name: 'accountName',
            message: 'Para qual conta irá o depósito?'
    }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ]).then((answer) => {
            const amount = answer['amount']
            addAmount(accountName, amount)
            console.log(chalk.bgYellow.green('Sucesso! Seu montante foi depositado!'))
            setTimeout(() => {
                operation()
            }, 1000);
            
        })
    })
}
function checkAccount(accountName){
    if(!fs.existsSync(`account/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe!'))
        return false
    } 
    return true
}
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding:'utf8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}
function addAmount(accountName, amount){

}
//#endregion
