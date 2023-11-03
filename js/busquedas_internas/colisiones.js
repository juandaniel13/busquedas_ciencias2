
// Funciones de resolución de colisiones
export function pruebaLineal(hash, estructura, rangoHash) {
  let posicion = hash;
  while (estructura[posicion] !== "") {
    posicion = (posicion + 1) % rangoHash; // Avanza linealmente hasta encontrar un espacio vacío
    if(posicion > rangoHash){
      posicion = 0;
    }
  }
  return posicion;
}

export function pruebaCuadratica(hash, estructura, rangoHash) {
  let posicion = hash;
  let intentos = 1;
  
  while (estructura[posicion] !== "") {
    posicion = (hash + intentos * intentos) % rangoHash;
    intentos++;
  }
  
  return posicion;
}

export function dobleFuncionHash(hash, estructura, rangoHash) {
  let segundoHash = 1; // Valor inicial de la segunda función hash
  let posicion = hash;
  
  while (estructura[posicion] !== "") {
    posicion = (hash + segundoHash) % rangoHash;
    segundoHash++; // Incrementa el valor de la segunda función hash
    if(posicion > rangoHash){
      posicion = 0;
    }
  }
  
  return posicion;
}


export function arregloAnidado(hash, estructura, rangoHash, clave) {
  let i = hash;
  let j=1;
  while (estructura[i][j] !== "") {
    j = (j + 1) ; // Avanza linealmente hasta encontrar un espacio vacío
   /*  if(i > rangoHash){
      i = 0;
    } */
  }
  return {i, j, clave};
}

