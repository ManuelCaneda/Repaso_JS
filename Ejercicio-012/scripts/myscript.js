/***************************************************************************************************************
 *
 *   Objetivo: Reforzar en el uso de estructuras de control repetitivas.
 *             Reforzar en el uso de funciones definidas por el usuario.
 *             Aprender diferentes formas de crear arrays (adicional)
 *             Entender las funciones anónimas y funciones flecha o arrow functions (adicional)
 *             Aprender a emplear métodos del objeto Array para programación funcional (adicional)
 *
 *   Tarea: Solicitamos un número entero n al usuario 
 *          Mostramos en la consola los numeros pares desde 2 hasta ese numero
 * 
 *          Realizar 4 versiones: con for, while, do..while, con arrays y el método join
 *
 *   Entrada : numero entero n, n>=2
 *
 *   Salida  : 2, 4, 6, ..., n  (incluidas las coma y el espacio detras de cada número excepto el último)
 *
 ***************************************************************************************************************/
let n = prompt("Introduce un número")

let numeros = []

for(let i=2;i<=n;i+=2){
    numeros.push(i)
}

let mensaje=numeros.join(", ")

console.log(mensaje);