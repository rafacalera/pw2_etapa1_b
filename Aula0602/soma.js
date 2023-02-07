module.exports = {

    calculadora (a, b, op){
        if (op === "+"){
            console.log(`${a} ${op} ${b} = ${(a+b)}`)
        }
        else if (op === "-"){
            console.log(`${a} ${op} ${b} = ${(a-b)}`)
        }
        else if (op === "/"){
            console.log(`${a} ${op} ${b} = ${(a / b)}`)
        }
        else if (op === "x" || op === "*"){
            console.log(`${a} ${op} ${b} = ${(a*b)}`)
        }
        else{
            console.log(`\nOperador "${op}" não encontrado.\n`)
        }


        
    }
}