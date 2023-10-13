export function buscarClaveSecuencialPorBloques(estructura, clave) {
    const tamañoEstructura = estructura.length;
    const blockSize = Math.ceil(Math.sqrt(tamañoEstructura));

    for (let i = 0; i < tamañoEstructura; i += blockSize) {
        const bloque = estructura.slice(i, i + blockSize);

        if (bloque[blockSize - 1] >= clave) {
            for (let j = 0; j < bloque.length; j++) {
                if (bloque[j] === clave) {
                    return [i == 0 ? i +1: (i/blockSize)+1, j+1]; // Devuelve el índice en el arreglo original
                }
            }
        }
    }

    return [-1,-1]; // Retorna -1 si la clave no se encuentra en la estructura
}

// Ejemplo de búsqueda binaria en un bloque ordenado
export function buscarClaveBinariaPorBloque(estructura, clave) {
    const tamañoEstructura = estructura.length;
    const blockSize = Math.ceil(Math.sqrt(tamañoEstructura));

    for (let i = 0; i < tamañoEstructura; i += blockSize) {
        const bloque = estructura.slice(i, i + blockSize);

        if (bloque[0] <= clave && bloque[blockSize - 1] >= clave) {
            // Realizar búsqueda binaria en el bloque actual
            let left = 0;
            let right = blockSize - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);

                if (bloque[mid] === clave) {
                    return [Math.floor(i / blockSize) + 1,  i + mid ];
                } else if (bloque[mid] < clave) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
    }

    return [-1,  -1 ]; // Retorna -1 si la clave no se encuentra en la estructura
}
