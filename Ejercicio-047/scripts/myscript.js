/***************************************************************************************************************
* 
*   Objetivo: Aprender a trabajar con diferentes estructuras de datos
*             Reforzar el aprendizaje en el uso de métodos de array
*
*   Tarea: Crear una lista de la compra con un array de objetos con la forma indicada
*
*                    {
*                       producto: cadena,
*                       precio: numero_entero,
                        cantidad: numero_entero
*                    }
*
*           Calcular la suma del importe de la lista de productos
*
*   Entrada : --
*
*
*   Salida  : La suma del importe de la lista de la compra
*
*
***************************************************************************************************************/
const productos = [
    {
        producto:"patata",
        precio:0.99,
        cantidad:5
    },
    {
        producto:"leche",
        precio:1.5,
        cantidad:6
    },
    {
        producto:"botella de agua",
        precio:0.25,
        cantidad:2
    }
]

let suma=0

productos.forEach(el => {
    suma+=(el.precio*el.cantidad)
});

console.log(`La suma del importe de la lista de la compra es: ${suma}`);