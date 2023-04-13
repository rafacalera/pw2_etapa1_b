const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')

module.exports = {

    operation() {
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

                if (action === 'Criar conta') {
                    console.log('Criando a Conta...')
                    this.createAccount()
                }
                else if (action === 'Consultar Saldo') {
                    console.log('Consultando seu saldo...')
                    this.accountBalance()
                }
                else if (action === 'Depositar') {
                    console.log('Depositando em sua conta...')
                    this.deposit()
                }
                else if (action === 'Sacar') {
                    console.log('Sacando de sua conta')
                    this.withDraw()
                }
                else if (action === 'Sair') {
                    console.log(chalk.bgBlue.yellow.bold('SAINDO DA APLICAÇÃO CONTAS ETEC'))
                    setTimeout(() => {
                        process.exit()
                    }, 1500);
                }
            })
    },
    createAccount(){
        console.log(chalk.bgGreen.black('Bem Vindos ao Contas ETEC Bank!'))
        console.log(chalk.green('Siga as orientações a seguir:'))

        this.buildAccount()

    },
    buildAccount(){
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
                this.buildAccount(accountName)
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
            this.operation()
        })
    },
    deposit() {
        inquirer.prompt([
        {
                name: 'accountName',
                message: 'Para qual conta irá o depósito?'
        }
        ]).then((answer) => {
            const accountName = answer['accountName']
            if(!this.checkAccount(accountName)){
                return this.deposit()
            }
    
            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto você deseja depositar?'
                }
            ]).then((answer) => {
                const amount = answer['amount']
                this.addAmount(accountName, amount)
                console.log(chalk.bgYellow.green('Sucesso! Seu montante foi depositado!'))
                setTimeout(() => {
                    this.operation()
                }, 1000);
                
            })
        })
    },
    checkAccount(accountName){
        if(!fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta não existe!'))
            return false
        } 
        return true
    },
    getAccount(accountName){
        const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
            encoding:'utf8',
            flag: 'r'
        })
        return JSON.parse(accountJSON)
    },
    addAmount(accountName, amount){
        const accountData = this.getAccount(accountName)
    
        if(!amount){
            console.log(chalk.bgRed.black("O montante não é válido."))
            return this.deposit()
        }
    
        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    
        fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        })
    
        console.log(chalk.green(`Depositamos: R$ ${amount} na conta ${accountName}`))
    },
    accountBalance(){
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual conta deseja o saldo'
            }
        ]).then((answer) => {
            const accountName = answer['accountName']
    
            if (!this.checkAccount(accountName)){
                return this.accountBalance()
            }
    
            const accountData = this.getAccount(accountName)
    
            if (accountData.balance > 0){
            console.log(chalk.green(`Saldo: ${accountData.balance}`))
            }
            else{
                console.log(chalk.red(`Saldo: ${accountData.balance}`))
            }
            setTimeout(() =>{
                this.operation()
            }, 5000);
        })
    },
    withDraw(){
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'De qual conta deseja sacar?'
            }
        ]).then((answer) => {
            const accountName = answer['accountName']
    
            if(!this.checkAccount(accountName)){
                return this.withDraw()
            }
            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto deseja sacar?'
                }
            ]).then((answer) => {
                const amount = answer['amount']
                
                if(this.removeAmount(accountName, amount)){
                    // console.log(chalk.bgRed.black(`Foi sacado: ${amount} da conta: ${accountName}`))
                    setTimeout(() => {
                        this.operation()
                    }, 3000);
                }                       
            })
        })
    },
    removeAmount(accountName, amount){
        const accountData = this.getAccount(accountName)
    
        if(!amount){
            console.log(chalk.bgRed.black('Não há valor á sacar!'))
            return this.withDraw()
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
}