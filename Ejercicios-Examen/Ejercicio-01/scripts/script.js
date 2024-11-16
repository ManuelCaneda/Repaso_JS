let cadena = "AAATTCCCCGGAGAG"
let letra = ""
let longitud = 1
let longitudMasLarga = 0
let posicionCadena = 0

function crearCadena(longitudMasLarga,letra){
    return Array.from({length:longitudMasLarga}, el=>el=letra).join("")
}

for(let i = 0;i<cadena.length;i++){
    if(cadena[i]==cadena[i+1]){
        longitud++
    } else {
        if(longitud>=longitudMasLarga){
            longitudMasLarga=longitud
            letra=cadena[i]
            posicionCadena=i-longitudMasLarga+1
        }
        longitud=1
    }
}

console.log(`Longitud más larga: ${longitudMasLarga}`);
console.log(`Letra con la cadena más larga: ${letra}`);
console.log(`Posición donde comienza la cadena más larga: ${posicionCadena+1}`)
console.log(`Cadena más larga: ${crearCadena(longitudMasLarga,letra)}`)
console.log(`Cadena completa sin la cadena más larga: ${cadena.slice(0,posicionCadena)+cadena.slice(posicionCadena+longitudMasLarga)}`)

// cadena.substring(0,posicionCadena)+cadena.substring(posicionCadena+longitudMasLarga,cadena.length)