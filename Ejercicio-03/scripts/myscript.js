/***************************************************************************************************************
 *
 *   Objetivo: Reforzar aprendizaje sobre petición de datos 
 *             Reforzar aprendizaje sobre mostrar salida de datos (un mensaje de alerta).
 *             Aprender a concatenar cadenas
 *             Aprender a emplear template strings (adicional)
 *             Aprender a solicitar datos de un tipo determinado de datos (adicional)
 *             Aprender a definir y usar funciones (adicional)
 *             Mejorar lógica de programación y programación genérica (adicional)
 *
 *   Tarea: Crea un script Javascript que solicite el nombre a un usuario y su edad al abrir la página.
 *
 *   Entrada : cadena de texto (String): nombre
 *             numero entero (Number): edad     
 * 
 *   Salida  : Una vez solicitados los datos, se debe mostrar la información solicitada a través de la 
 *             consola de depuración y en una ventana de alerta
 *
 *             Tu nombre es .... y tienes .... años
 *
 ***************************************************************************************************************/
let nombre = prompt("Di tu nombre")
let edad = prompt("Di tu edad")

let mensaje = `Tu nombre es ${nombre} y tienes ${edad} años`

alert(mensaje)
console.log(mensaje);