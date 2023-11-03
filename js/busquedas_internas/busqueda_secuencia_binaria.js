export function buscarSecuencial(clave,estructura,rango) {
    for (let i = 0; i < rango; i++) {
      if (estructura[i].clave === clave) {
        return i; // Devuelve la posición de la clave encontrada.
      }
    }
    return -1; // Si no se encuentra la clave, devuelve -1.
  }
  
  export function buscarBinaria(clave, estructura,rango) {
    // Asumiendo que el arreglo está ordenado
    let izquierda = 0;
    let derecha = rango - 1;
  
    while (izquierda <= derecha) {
      let medio = Math.floor((izquierda + derecha) / 2);
      if (estructura[medio].clave === clave) {
        return medio; // Devuelve la posición de la clave encontrada.
      } else if (estructura[medio].clave < clave) {
        izquierda = medio + 1;
      } else {
        derecha = medio - 1;
      }
    }
    return -1; // Si no se encuentra la clave, devuelve -1.
  }


  export function animacionBinaria(){

  }