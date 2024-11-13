/***************************************************************************************************************
 *
 *   Objetivo: Reformar en lógica de programación
 *             Aprender nuevos métodos de String/Array
 *             Aprender a programar pensando en datos de entrada
 *             Reforzar en la programación funcional
 *             Reforzar en el uso de métodos de array
 *
 *   Tarea: Solicita un texto y una palabra.
 *
 *   Entrada : cadena de texto: texto
 *             cadena de texto: palabra
 *
 *   Salida  : Indica todas las posiciones en las que se encuentra la palabra dentro de texto
 *
 ***************************************************************************************************************/
let texto = "Lorem ipsum dolor sit amet"
let palabra = "Lorem"

texto = texto.split(" ")
palabra = palabra.toLowerCase()
let posiciones=[]

for(let i = 0;i<texto.length;i++){
    texto[i] = texto[i].toLowerCase()
    if(palabra==texto[i]){
        posiciones.push(i+1)
    }
}

console.log(posiciones.join(", "))