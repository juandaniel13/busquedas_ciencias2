export function moduloHash(clave, rangoHash) {
  return clave % rangoHash;
}


export function cuadradoHash(clave, rangoHash) {
  return (clave * clave) % rangoHash;
}


export function plegamientoHash(clave, rangoHash) {
  const claveStr = clave.toString();
  const longitud = claveStr.length;
  const numParticiones = 4; // Puedes ajustar este valor según tus necesidades

  let hash = 0;
  for (let i = 0; i < longitud; i += numParticiones) {
    const particion = claveStr.substr(i, numParticiones);
    hash += parseInt(particion);
  }

  return hash % rangoHash;
}


export function truncamientoHash(clave, rangoHash) {
  const claveStr = clave.toString();
  const longitud = claveStr.length;
  const numDigitos = 4; // Puedes ajustar este valor según tus necesidades

  let hash = 0;
  for (let i = 0; i < numDigitos; i++) {
    const d = parseInt(claveStr.charAt(i));
    hash = (hash * 10) + d;
  }

  return hash % rangoHash;
}
