/***************************************************************************************************************
 *
 *   Objetivo:
 *
 *   Tarea: Sumar los elementos de las dos diagonales de una matriz bidimensional.
 *          Se genera una matriz de las dimensiones indicadas con números aleatorios
 *          entre -100 y 100 (ambos incluídos)
 *
 *   Entrada : La dimension de la matriz (número de filas y columnas)
 *
 *   Salida  : La matriz generadas y la suma de las dos diagonales de la misma
 *
 ***************************************************************************************************************/
let n = 3;

function generarMatrizBidimensional(dimension){
    return Array.from({length:dimension}, ()=>
        Array.from({length:dimension},()=>(Math.round(Math.random()*201)-100))
    )
}

function sumaDiagonales(matriz){
    let izq=0,der=0
//  Diagonal izquierda
    for(let i=0;i<matriz.length;i++){
        izq+=matriz[i][i];
    }
    console.log(`IZQUIERDA: ${izq}`);

    //  Diagonal derecha
    for(let i=matriz.length-1,j=0;i>=0;i--,j++){
        der+=matriz[j][i];
    }

    console.log(`DERECHA: ${der}`);

    return (izq+der)
}

let matriz = generarMatrizBidimensional(n)

console.log(matriz);
console.log(`SUMA: ${sumaDiagonales(matriz)}`);
