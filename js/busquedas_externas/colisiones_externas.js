export function areaIndependienteSolucionColision(clave, estructura) {
    // Implementa la lógica para manejar colisiones utilizando área independiente
    const tamañoEstructura = estructura.length;
    const áreaColisiones = new Array(tamañoEstructura).fill(null);

    // Encuentra una posición vacía en el área de colisiones
    const posiciónVacia = áreaColisiones.findIndex((element) => element === null);

    if (posiciónVacia !== -1) {
        áreaColisiones[posiciónVacia] = clave;
    } else {
        // Área de colisiones llena, no se puede manejar la colisión
        alert("Error: Área de colisiones llena, no se puede manejar la colisión.");
    }
}

export function areaColisionesSolucionColision(clave, estructura) {
    // Implementa la lógica para manejar colisiones utilizando un área de colisiones entre los bloques de almacenamiento primario
    const tamañoEstructura = estructura.length;
    const blockSize = Math.ceil(Math.sqrt(tamañoEstructura));

    // Calcula el bloque donde se produjo la colisión
    const bloqueColision = Math.floor(estructura.indexOf(clave) / blockSize);

    // Encuentra una posición vacía en el bloque de colisiones
    const inicioBloqueColision = bloqueColision * blockSize;
    const finBloqueColision = (bloqueColision + 1) * blockSize;

    for (let i = inicioBloqueColision; i < finBloqueColision; i++) {
        if (estructura[i] === "") {
            estructura[i] = clave;
            return;
        }
    }

    // Bloque de colisiones lleno, no se puede manejar la colisión
    alert("Error: Bloque de colisiones lleno, no se puede manejar la colisión.");
}
