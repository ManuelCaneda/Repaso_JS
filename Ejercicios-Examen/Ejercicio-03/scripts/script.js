// El array de monedas está expresado en céntimos
let monedas = [200,100,50,20,10,5,2,1]

// El dinero introducido está en euros
let dineroIntroducido=prompt("Introduce la cantidad que quieras meter")*100

let cantidades = Array.from({length:monedas})
let mensaje =""

for(let i=0;i<monedas.length;i++){
    let contador=0
    while(monedas[i]<=dineroIntroducido){
        contador++;
        dineroIntroducido-=monedas[i]
    }
    cantidades.push(contador)
}

for (let i = 0; i < monedas.length; i++) {
    if(cantidades[i]>0)
        mensaje+=`${cantidades[i]} monedas de ${(monedas[i]>=100)?(monedas[i]/=100)+"€":(monedas[i])+" céntimos"}, `
}

console.log(mensaje.slice(0,-2));