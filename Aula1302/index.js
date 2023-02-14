const chalk = require("chalk")
const calculadora = require("./calculadora")
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

var nota = calculadora.media(1, 5, 5 , 6)

if(nota >= 6){
    console.log(chalk.green("Você está aprovado: ") + chalk.black.bgGreen(nota))
}
else if (nota >= 5){
    console.log(chalk.yellow("Você está de recuperação: ") + chalk.black.bgYellow(nota))
}
else{
    console.log(chalk.red("Você está reprovado: ") + chalk.black.bgRed(nota))
}
