export function moduloHash(clave, tamañoEstructura) {
    return clave % tamañoEstructura;
}

export function cuadradoHash(clave, tamañoEstructura) {
    return (clave * clave) % tamañoEstructura;
}

export function plegamientoHash(clave, tamañoEstructura) {
    // Convierte la clave a una cadena de texto
    const claveStr = clave.toString();

    // Divide la cadena de la clave en fragmentos de un cierto tamaño
    const fragmentSize = claveStr.length / 2; // Puedes ajustar este valor según tus necesidades

    // Inicializa la suma
    let suma = 0;

    for (let i = 0; i < claveStr.length; i += fragmentSize) {
        const fragmento = claveStr.slice(i, i + fragmentSize);
        suma += parseInt(fragmento);
    }

    // Toma el módulo del resultado con el tamaño de la estructura
    return suma % tamañoEstructura;
}


export function truncamientoHash(clave, tamañoEstructura) {
    // Convierte la clave a una cadena de texto
    const claveStr = clave.toString();

    // Toma una cantidad fija de dígitos desde el principio de la clave
    const longitudDeseada = 4; // Puedes ajustar este valor según tus necesidades
    const fragmento = claveStr.substring(0, longitudDeseada);

    // Convierte el fragmento en un número y toma el módulo del resultado con el tamaño de la estructura
    const resultado = parseInt(fragmento) % tamañoEstructura;

    return resultado;
}
