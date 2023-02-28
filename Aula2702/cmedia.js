const chalk = require ('chalk')
module.exports = {
    clog(media){

        if (media >= 6){
            return console.log(chalk.bgGreen.black.bold`Aprovado`)
        }
        else if (media<= 5){
            return console.log(chalk.bgRed.black.bold`Reprovado`)
        }
        else{
    
            return console.log(chalk.bgYellow.black.bold`Recuperação`)
        }
    }
}