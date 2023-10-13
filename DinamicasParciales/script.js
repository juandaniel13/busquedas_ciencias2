let n = 2;
let densidad = 0.75;
let tamañoMatriz = n;
let aux = 0;
let contador = 0
let otrocontador = 0;
let residuo = 0;
let n1 = 2;

//eso son las variables que usé

let arreglo = [];//arreglo al que el usuario le inserta datos
let arreglo2 = ["35", "4", "5", "2", '12', '27'];//una matriz predefinida para hacer pruebas o para una demostracion si ahce falta

var matriz = new Array();   //me crea una matriz de tamaño variable
for (i = 0; i < n1; i++) {  //a cada espacio de la matriz segun n se le inserta un vector de 2 posiciones
    // resultando n amatriz de n*2
    matriz[i] = new Array(2);
}

function registroAutomatico() {//lo mimso que la otra pero con el arreglo predefinido
    for (const item of arreglo2) {
        if (arreglo.includes(item)) {
            console.log("no se puede")
        } else {
            arreglo.push(item);//inserta el contenido del placeholder en el arreglo vacio inicial
        }
        dinamicaParcial();
    }
}
console.log("n es: " + n)
console.log("n1 es: " + n1)
dinamicaParcial();

function registrarDatos() {//leen contenido del placeholder del html cuando se presiona el voton

    var dato = document.getElementById("Clave").value;

    if (arreglo.length == 0) {
        arreglo.push(dato);//inserta el contenido del placeholder en el arreglo vacio inicial
        console.log("se insertó el dato en la posicion 0")
    }

    if (arreglo.includes(dato)) {
        console.log("no se puede")
    } else {
        arreglo.push(dato);//inserta el contenido del placeholder en el arreglo vacio inicial
    }
    document.getElementById("Clave").value = "";

    dinamicaParcial();//ejecuta la funcion dinamica total, la logica
}


function limpiarmatriz() {
    for (var i = 0; i < n1; i++) {
        matriz[i] = new Array(2);
    }

    for (i = 0; i < n1; i++) {
        for (j = 0; j < 2; j++) {
            matriz[i][j] == null;
        }
    }
}

console.log("n es: " + n)
console.log("n1 es: " + n1)

function actualizarMatriz() {//reescribe la matriz definida arriba
 if (n%2 == 0) {
        n1 = n * 1.5;
        tamañoMatriz = n1 * 2;
    } else if (n1%2 == 1) {
        n *= 2;
        n1 = n;
        tamañoMatriz = n * 2;
    }


    console.log("el tamaño es ### " + tamañoMatriz)
    limpiarmatriz();
}



// creo que hay problemas con esto y por eso tal vez se duplican los datos
function dinamicaParcial() {
    contador = 0
    tamañoMatriz = n1 * 2;
    for (i = 0; i < n1; i++) {
        for (j = 0; j < 2; j++) {
            if (matriz[i][j] == null) {
                contador++//aumenta con cada espacio nulo de la matriz, deberia ser de n*2 al inicio siempre
                console.log("el contador es de#### " + contador)
              
                aux = (tamañoMatriz - contador);    //inicia en cero y va creciendo con cada dato que se ingresa
                console.log("el aux es de$$$ " + aux)
            }
        }
    }




    if (aux < (tamañoMatriz * densidad)) {//condicion de que la densidad ocupacional sea menor al limite establecido

        densidad_aceptada();
        
    }
    else if (aux >= (tamañoMatriz * densidad)) {//si la densidad ocupacional es mayor o igual al limite establecido
        densidad_rechazada();
    }

    console.log("el contador es de " + contador)
    console.log("el aux es de " + aux)

    console.log(matriz)
}


function densidad_aceptada() {
    limpiarmatriz()
    
    for (i = 0; i < arreglo.length; i++) {
        clave = arreglo[i];//lee el arreglo que ingresa el usuario 
        console.log("la clave es " + clave) // esto solo era para ver que clave es
        hash(clave)//funcion hash a la que se le pasa la posision i del arreglo

        if (matriz[residuo][0] == null) {
            matriz[residuo][0] = clave;//ingresa indice
            console.log("se colocó en " + residuo + ",0")
        } else if (matriz[residuo][1] == null) {
            matriz[residuo][1] = clave;//ingresa indice
            console.log("se colocó en " + residuo + ",1")
        } else if (matriz[residuo][0] !== null & matriz[residuo][1] !== null) {
            otrocontador++//"espacio de memoria reservado cuando no entra el indice"
            console.log("se colocó eel auxiliar")
            aux += otrocontador;
        }
    
    
    }
}

function densidad_rechazada() {

    actualizarMatriz();
    limpiarmatriz()
    //s actualiza el tamaño n de la matriz 
    for (i = 0; i < arreglo.length; i++) {
        clave = arreglo[i];//lee el arreglo que ingresa el usuario 
        console.log("la clave es " + clave) // esto solo era para ver que clave es
        hash(clave)//funcion hash a la que se le pasa la posision i del arreglo

        if (matriz[residuo][0] == null) {
            matriz[residuo][0] = clave;//ingresa indice
        } else if (matriz[residuo][1] == null) {
            matriz[residuo][1] = clave;//ingresa indice
        } else {
            otrocontador++//"espacio de memoria reservado cuando no entra el indice"
            aux += otrocontador;
        }
    }
}

function hash(valor) {  //la funcion modulo hash
    residuo = valor % n1;
    console.log("el residuo es de " + residuo + " y el n es de " + n1)
}

// console.log("arreglo 1 despues " + arreglo)
// console.log("arrelgo 2 " + arreglo2)