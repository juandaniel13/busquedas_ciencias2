export function moduloHash(clave, rangoHash) {
  return clave % rangoHash;
}

export function cuadradoHash(clave, rangoHash) {
  return (clave * clave) % rangoHash;
}

export function plegamientoHash(clave, rangoHash) {
  const claveStr = clave.toString();
  let hash = 0;

  for (let i = 0; i < claveStr.length; i++) {
    hash += parseInt(claveStr[i]);
  }

  return hash % rangoHash;
}

export function truncamientoHash(clave, rangoHash) {
  // Convierte la clave a una cadena para obtener una representación de cadena
  const claveStr = clave.toString();

  // Define la longitud deseada para el valor de hash truncado
  const longitudHash = 4; // Cambia esto según tus necesidades

  // Toma una parte de la clave como valor de hash (los primeros 'longitudHash' caracteres)
  const hashStr = claveStr.slice(0, longitudHash);

  // Convierte el valor de hash truncado de cadena a número
  const hash = parseInt(hashStr);

  return hash % rangoHash;
}
