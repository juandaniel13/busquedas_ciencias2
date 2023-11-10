import {
  buscarClaveSecuencialPorBloques,
  buscarClaveBinariaPorBloque,
} from "./busqueda_secuencia_binaria_externa.js";
import {
  moduloHash,
  cuadradoHash,
  plegamientoHash,
  truncamientoHash,
} from "./hash_externas.js";
import { areaColisionesSolucionColision,areaIndependienteSolucionColision } from "./colisiones_externas.js";
const d = document;
const w = window;

let rango = 0;
let estructura = [];

let rangoHash = 0;
let estructuraHash = [];

/* botones */
const $btnSecuencialBinaria = d.querySelector(
  ".btn-secuencial-binaria-externa"
);
const $btnHash = d.querySelector(".btn-hash-externa");

const $btnCrearEstructura = d.querySelector(".btn-crear-estructura-externa"); //listo
const $btnOrdenarEstructura = d.querySelector(
  ".btn-ordenar-estructura-externa"
);
const $btnEstructuraOriginal = d.querySelector(
  ".btn-estructura-original-external"
);
const $btnVisualizarEstructura = d.querySelector(
  ".btn-visualizar-estructura-externa"
);
const $btnInsertarClave = d.querySelector(".btn-insertar-clave-externa");
const $btnBuscarClave = d.querySelector(".btn-buscar-clave-externa");
//hash
const $btnCrearEstructuraHash = d.querySelector(
  ".btn-crear-estructura-externa-hash"
);
const $btnVisualizarEstructuraHash = d.querySelector(
  ".btn-visualizar-estructura-externa-hash"
);
const $btnInsertarClaveHash = d.querySelector(
  ".btn-insertar-clave-hash-externa"
);
const $btnBuscarClaveHash = d.querySelector(".btn-buscar-clave-hash-externa");

/* Paneles */
const $panelSecuencialBinaria = d.querySelector(
  ".panel-secuencial-binaria-externa"
);
const $panelHash = d.querySelector(".panel-hash");

const $estructura = d.querySelector(".estructura-externa");
const $panelResultadosBusqueda = d.querySelector(".panel-resultado-busqueda");
//hash
const $estructuraHash = d.querySelector(".estructura-externa-hash");
const $panelResultadosBusquedaHash = d.querySelector(
  ".panel-resultado-busqueda-hash"
);

/* inputs */
const $rango = d.querySelector(".input-rango-externa");
const $claveInsertar = d.querySelector(".input-insertar-clave");
const $tipoBusqueda = d.querySelector(".tipo-busqueda");
const $claveBuscar = d.querySelector(".clave-buscar-externa");
//hash
const $rangoHash = d.querySelector(".input-rango-externa-hash");
const $claveInsertarHash = d.querySelector(
  ".input-insertar-clave-hash-externa"
);
const $claveBuscarHash = d.querySelector(".clave-buscar-hash-externa");
const $tipoHash = d.querySelector(".tipo-hash-externa");
const $tipoSolColision = d.querySelector(".colision-hash-externa");

/* secuencial binaria */

function insertarClave(clave) {
  if (estructura.includes(clave)) {
    alert("La clave ya existe en la estructura.");
    return;
  }

  for (let i = 0; i < rango; i++) {
    if (estructura[i] === "") {
      estructura[i] = clave;

      // Limpia el campo de entrada
      $claveInsertar.value = ""; // Establece el valor del input en una cadena vacía

      return;
    }
  }

  // Si la estructura está llena, muestra un mensaje de error
  alert("Error, la estructura se encuentra llena.");
}


function visualizarEstructura(estructura) {
  let $tableFragment = d.createDocumentFragment();
  $estructura.innerHTML = `<thead>
      <tr>
        <th>Posición</th>
        <th>Clave</th>
      </tr>
    </thead>`;
  for (let i = 0; i < rango; i++) {
    let $registroClave = d.createElement("tr");
    $registroClave.innerHTML = `
      <td>${i + 1}</td>
      <td>${estructura[i] || ""}</td>
    `;
    // Alterna el color de fondo para diferenciar los bloques
    if (Math.floor(i / Math.sqrt(rango)) % 2 === 0) {
      $registroClave.classList.add("gris-claro");
    }
    $tableFragment.appendChild($registroClave);
  }
  $estructura.appendChild($tableFragment);
}

function buscarClave(tipoBusqueda, clave) {
  let resultado = -1; // Inicializamos resultado como -1 (no encontrado) por defecto

  if (tipoBusqueda == "secuencial") {
    resultado = buscarClaveSecuencialPorBloques(estructura, clave);
  } else if (tipoBusqueda == "binaria") {
    resultado = buscarClaveBinariaPorBloque(estructura, clave);
  }

  if (resultado[0] !== -1) {
    // Mostrar el resultado en el panel de resultados
    $panelResultadosBusqueda.textContent = `Clave ${clave} encontrada en el bloque ${resultado[0]} en la posición ${resultado[1]} `;
  } else {
    // Si no se encontró la clave
    $panelResultadosBusqueda.textContent = `Clave ${clave} no encontrada en ningún bloque`;
  }
}

//hashing
function insertarClaveHash(clave, tipoHash, tipoColision) {
  const tamañoEstructura = estructuraHash.length; // Tamaño de la estructura de almacenamiento

  // Calcular la dirección utilizando la función hash seleccionada
  let direccion = null;
  if (tipoHash == "mod") {
    direccion = moduloHash(clave, tamañoEstructura);
  } else if (tipoHash == "cuadrado") {
    direccion = cuadradoHash(clave, tamañoEstructura);
  } else if (tipoHash == "plegamiento") {
    direccion = plegamientoHash(clave, tamañoEstructura);
  } else if (tipoHash == "truncamiento") {
    direccion = truncamientoHash(clave, tamañoEstructura);
  }

  // Verificar si hay una colisión en la dirección calculada
  if (estructuraHash[direccion] != "") {
    // Se ha producido una colisión
    if (tipoColision === "areaColisionIndependiente") {
      areaIndependienteSolucionColision(clave, estructuraHash);
    } else if (tipoColision === "areaColisionEntreBloques") {
      areaColisionesSolucionColision(clave, estructuraHash);
    }
  } else {
    // No hay colisión, insertar la clave en la dirección calculada
    console.log(estructuraHash);
    estructuraHash[direccion] = clave;
  }
}

function buscarClaveHash(clave, tipoHash) {
  const tamañoEstructura = estructuraHash.length; // Tamaño de la estructura de almacenamiento

  // Calcular la dirección utilizando la función hash seleccionada
  let direccion = null;
  if (tipoHash === "mod") {
    direccion = moduloHash(clave, tamañoEstructura);
  } else if (tipoHash === "cuadrado") {
    direccion = cuadradoHash(clave, tamañoEstructura);
  } else if (tipoHash === "plegamiento") {
    direccion = plegamientoHash(clave, tamañoEstructura);
  } else if (tipoHash === "truncamiento") {
    direccion = truncamientoHash(clave, tamañoEstructura);
  }

  // Calcula el bloque al que pertenece la dirección
  const tamañoBloque = Math.sqrt(tamañoEstructura); // Tamaño de un bloque
  const bloque = Math.floor(direccion / tamañoBloque);

  // Verificar si la clave se encuentra en la dirección calculada
  if (estructuraHash[direccion] == clave) {
    // La clave se encontró en la posición calculada
    $panelResultadosBusquedaHash.textContent = `Clave ${clave} encontrada en el bloque ${bloque +1 }, dirección ${direccion+1}.`;
  } else {
    // La clave no se encuentra en la posición calculada
    $panelResultadosBusquedaHash.textContent = `Clave ${clave} no encontrada en el bloque ${bloque +1}, dirección ${direccion+1}.`;
  }
}


function visualizarEstructuraHash(estructuraHash, tipoSolColision) {
  let $tableFragment = d.createDocumentFragment();
  $estructuraHash.innerHTML = `<thead>
      <tr>
          <th>Posición</th>
          <th>Clave</th>
      </tr>
  </thead>`;
  for (let i = 0; i < rangoHash; i++) {
      let $registroClave = d.createElement("tr");
      $registroClave.innerHTML = `
          <td>${i + 1}</td>
          <td>${estructuraHash[i] || ""}</td>
      `;
      // Alterna el color de fondo para diferenciar los bloques
      if (Math.floor(i / Math.sqrt(rangoHash)) % 2 === 0) {
          $registroClave.classList.add("gris-claro");
      }
      $tableFragment.appendChild($registroClave);
  }

  if (tipoSolColision === 'areaIndependiente') {
      const tamañoEstructura = estructuraHash.length;
      let $tableColisiones = d.createElement("table");
      $tableColisiones.innerHTML = `<thead>
          <tr>
              <th>Colisiones (Área Independiente)</th>
          </tr>
      </thead>`;
      let $registroColisiones = d.createElement("tr");
      for (let i = 0; i < tamañoEstructura; i++) {
          $registroColisiones.innerHTML += `
              <td>${estructuraHash[i] || ""}</td>
          `;
      }
      $tableColisiones.appendChild($registroColisiones);
      $tableFragment.appendChild($tableColisiones);
  } else if (tipoSolColision === 'areaColisionEntreBloques') {
      // Implementa la lógica para visualizar el área de colisiones entre los bloques de almacenamiento primario
      // Puedes adaptar esta parte según cómo estés almacenando las colisiones entre bloques.
  }

  $estructuraHash.appendChild($tableFragment);
}


d.addEventListener("DOMContentLoaded", (e) => {
  /* secuencial binaria */
  d.addEventListener("click", (e) => {
    if (e.target == $btnSecuencialBinaria) {
      $panelSecuencialBinaria.classList.remove("invisible");
      $panelHash.classList.add("invisible");
    } else if (e.target == $btnHash) {
      
      $panelSecuencialBinaria.classList.add("invisible");
      $panelHash.classList.remove("invisible");
    }
    //Secuencial binaria
    
    if (e.target == $btnCrearEstructura) {
      e.preventDefault();
      const inputValue = parseInt($rango.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        rango = inputValue;
        estructura = new Array(rango).fill(""); // Crea un arreglo vacío con la longitud especificada.
      }
      visualizarEstructura(estructura);
    }
    if (e.target == $btnVisualizarEstructura) {
      e.preventDefault();
      visualizarEstructura(estructura);
    }

    if (e.target == $btnInsertarClave) {
      e.preventDefault();
      const inputValue = parseInt($claveInsertar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveInsertar = inputValue;
        insertarClave(claveInsertar);
      }
      visualizarEstructura(estructura);
    }

    if (e.target == $btnBuscarClave) {
      e.preventDefault();
      const inputValue = parseInt($claveBuscar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveBuscar = inputValue;
        buscarClave($tipoBusqueda.selectedOptions[0].value, claveBuscar); // Usar selectedOptions[0].value
      }
    }
    //hash
    if (e.target == $btnCrearEstructuraHash) {
      e.preventDefault();
      const inputValue = parseInt($rangoHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        rangoHash = inputValue;
        estructuraHash = new Array(rangoHash).fill(""); // Crea un arreglo vacío con la longitud especificada.
      }
      visualizarEstructuraHash(estructuraHash);
    }
    if (e.target == $btnVisualizarEstructuraHash) {
      e.preventDefault();
      visualizarEstructuraHash(estructuraHash);
    }

    if (e.target == $btnInsertarClaveHash) {
      e.preventDefault();
      const inputValue = parseInt($claveInsertarHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveInsertarHash = inputValue;
        // La clave se insertará únicamente si se ha seleccionado un tipo hash y un tipo Colision
        console.log($tipoHash.value);
        insertarClaveHash(
          claveInsertarHash,
          $tipoHash.value,
          $tipoSolColision.value
        ); // Usar selectedOptions[0].value
      }
      visualizarEstructuraHash(estructuraHash);
    }

    if (e.target == $btnBuscarClaveHash) {
      e.preventDefault();
      const inputValue = parseInt($claveBuscarHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveBuscarHash = inputValue;
        // La clave se buscará únicamente si se ha seleccionado un tipo hash
        buscarClaveHash(claveBuscarHash, $tipoHash.value); // Usar selectedOptions[0].value
      }
    }
  });
});
