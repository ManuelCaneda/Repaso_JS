/***************************************************************************************************************
 *
 *   Objetivo: Reflexionar sobre el tipo de estructura de programación a emplear que permita resolver la tarea
 *             de la forma más eficiente
 * 
 *   Tarea: Solicitar al usuario el porcentaje de acierto en un examen tipo test 
 *          Mostrar la cualificación según la nota según la siguiente tabla
 *
 *                Cualificación    Porcentaje
 *                     A             90-100
 *                     B             80-90
 *                     C             70-79
 *                     D             60-69
 *                     F             0-59
 *
 *   Entrada : número entero entre 0 y 100 (ambos incluidos): nota
 *
 *   Salida  : El examen se cualifica con un XXX
 *
 ***************************************************************************************************************/
let n = prompt("Di el porcentaje de acierto entre 0 y 100")
while (n<0 || n>100){
    n = prompt("Di el porcentaje de acierto entre 0 y 100")
} 

let mensaje = "El examen se cualifica con un"
let nota = ""

switch (true){
    case n>=0 && n<60:
        nota="F"
    break;
    case n>=60 && n<70:
        nota="F"
    break;
    case n>=70 && n<80:
        nota="F"
    break;
    case n>=80 && n<90:
        nota="F"
    break;
    case n>=90 && n<=100:
        nota="F"
    break;
}

console.log(`${mensaje} ${nota}`)