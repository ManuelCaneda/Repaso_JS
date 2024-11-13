/***************************************************************************************************************
 *
 *   Objetivo: Reforzar en el uso de estructuras de programación repetitivas
 *             
 *   Tarea: Se solicita un número entero n entre 1 y 20 al usuario. 
 *          Se mostrará una pirámide de la siguiente forma:
 *
 *               1
 *               2 2
 *               3 3 3
 *               4 4 4 4
 *                 ...
 *               n n n n n n n (n veces)
 *
 *          Realizar en ejercicio con for, while, do while
 * 
 *   Entrada : numero entero: n
 *
 *   Salida  : La pirámide mostrada en la tarea del ejercicio
 *
 ***************************************************************************************************************/
let n = prompt("Di un número entre el 1 y 20")

let mensaje=""
let arrayNums=[]

for(let i=1;i<=n;i++){
    let contador=1
    while(contador<=1){
        arrayNums.push(i)
        contador++
    }
    
    mensaje+=`${arrayNums.join(" ")} \n`
    arrayNums=[]
}

console.log(mensaje);