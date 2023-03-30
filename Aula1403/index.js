//#region Módulos Externos
    const chalk = require('chalk')
    const inquirer = require('inquirer')
//#endregion

//#region Módulos Internos
    const fs = require('fs')
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
            accountBalance()
        }
        else if (action === 'Depositar'){
            console.log('Depositando em sua conta...')
            deposit()
        }
        else if (action === 'Sacar'){
            console.log('Sacando de sua conta')
            withDraw()
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
                '{"balance": 0, "limite":1000}',
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
    if(!fs.existsSync(`accounts/${accountName}.json`)){
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
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black("O montante não é válido."))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err){
        console.log(err)
    })

    console.log(chalk.green(`Depositamos: R$ ${amount} na conta ${accountName}`))
}
//#endregion

//#region Consultar Saldo
function accountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta deseja o saldo'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)){
            return accountBalance()
        }

        const accountData = getAccount(accountName)

        if (accountData.balance > 0){
        console.log(chalk.green(`Saldo: ${accountData.balance}`))
        }
        else{
            console.log(chalk.red(`Saldo: ${accountData.balance}`))
        }
        setTimeout(() =>{
            operation()
        }, 10000);
    })
}
//#endregion

//#region Sacar Saldo
function withDraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'De qual conta deseja sacar?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withDraw()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja sacar?'
            }
        ]).then((answer) => {
            const amount = answer['amount']
            
            if(removeAmount(accountName, amount)){
                // console.log(chalk.bgRed.black(`Foi sacado: ${amount} da conta: ${accountName}`))
                setTimeout(() => {
                    operation()
                }, 3000);
            }                       
        })
    })
}
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Não há valor á sacar!'))
        return withDraw()
    }
    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Você irá entrar no cheque especial!'))
    }
    if((accountData.balance + accountData.limite) < amount){
        console.log(chalk.bgRed.black(`Você não tem limite para fazer essa operação`))
        return
    }
    else{
        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )
    console.log(chalk.blue(`Você sacou: ${amount} da conta ${accountName}.`))
    console.log(chalk.bgWhite.blue(`Seu saldo ficou: ${accountData.balance}`))
    }
    
    
}        
//#endregion