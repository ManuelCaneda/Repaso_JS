/***************************************************************************************************************
 *
 *   Objetivo: Aprender a plantearse diferentes formas de resolver un problema
 *             Practicar la programación iterativa y recursiva
 *             Valorar diferentes métodos de resolución de problemas, sus ventajas e inconvenientes
 * 
 *   Tarea: Comprobar si la cadena introducida por el usuario es un palíndromo (se lee igual al revés).
 *          P.ej: Dabale arroz a la zorra el abad
 *
 *   Entrada : Cadena de texto
 *
 *   Salida  : La cadena .... (es|no es) un palíndromo
 *
 ***************************************************************************************************************/
let frase = "Dabale arroz a la zorra el abad"

let s_n = ""

frase = frase.replaceAll(" ","").toLowerCase()
let fraseReversa = frase.split("").reverse().join("")

if(frase!=fraseReversa){
    s_n=" no"
}

console.log(`La cadena${s_n} es un palíndromo`);