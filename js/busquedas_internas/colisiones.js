
// Funciones de resolución de colisiones
export function pruebaLineal(hash, estructura, rangoHash) {
  let posicion = hash;
  while (estructura[posicion] !== "") {
    posicion = (posicion + 1) % rangoHash; // Avanza linealmente hasta encontrar un espacio vacío
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
  }
  
  return posicion;
}


export function arregloAnidado(hash, estructura, rangoHash, clave) {
  if (!estructura[hash]) {
    estructura[hash] = []; // Inicializa la lista en la posición hash si está vacía
  }

  estructura[hash].push(clave); // Agrega la clave a la lista en la posición hash

  return { posicion: hash, clave };
}
