import {
  buscarSecuencial,
  buscarBinaria,
} from "./busqueda_secuencia_binaria.js";
import {
  moduloHash,
  cuadradoHash,
  plegamientoHash,
  truncamientoHash,
} from "./hash.js";
import {
  pruebaLineal,
  pruebaCuadratica,
  dobleFuncionHash,
  arregloAnidado,
} from "./colisiones.js";

const d = document;
const w = window;

let estructura = [];
let estructuraHash = [];
let rangoHash = 0;
let rango = 0;

/* botones */
const $btnSecuencialBinaria = d.querySelector(".btn-secuencial-binaria");
const $btnHash = d.querySelector(".btn-hash");

const $btnCrearEstructura = d.querySelector(".btn-crear-estructura"); //listo
const $btnOrdenarEstructura = d.querySelector(".btn-ordenar-estructura"); //listo
const $btnEstructuraOriginal = d.querySelector(".btn-estructura-original"); //listo
const $btnVisualizarEstructura = d.querySelector(".btn-visualizar-estructura"); //listo
const $btnInsertarClave = d.querySelector(".btn-insertar-clave"); //listo
const $btnBuscarClave = d.querySelector(".btn-buscar-clave"); //listo
//hash
const $btnCrearEstructuraHash = d.querySelector(".btn-crear-estructura-hash");
const $btnVisualizarEstructuraHash = d.querySelector(
  ".btn-visualizar-estructura-hash"
);
const $btnInsertarClaveHash = d.querySelector(".btn-insertar-clave-hash");
const $btnBuscarClaveHash = d.querySelector(".btn-buscar-clave-hash");

/* Paneles */
const $panelSecuencialBinaria = d.querySelector(".panel-secuencial-binaria");
const $panelHash = d.querySelector(".panel-hash");

const $estructura = d.querySelector(".estructura-interna");
const $panelResultadosBusqueda = d.querySelector(".panel-resultado-busqueda");
//hash
const $estructuraHash = d.querySelector(".estructura-interna-hash");
const $panelResultadosBusquedaHash = d.querySelector(
  ".panel-resultado-busqueda-hash"
);

/* inputs */
const $rango = d.querySelector(".input-rango-hash");
const $claveInsertar = d.querySelector(".input-insertar-clave");
const $tipoBusqueda = d.querySelector(".tipo-busqueda");
const $claveBuscar = d.querySelector(".clave-buscar");
//hash
const $rangoHash = d.querySelector(".input-rango-hash");
const $claveInsertarHash = d.querySelector(".input-insertar-clave-hash");
const $claveBuscarHash = d.querySelector(".clave-buscar-hash");
const $tipoHash = d.querySelector(".tipo-hash");
const $tipoSolColision = d.querySelector(".colision-hash");

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
    $tableFragment.appendChild($registroClave);
  }
  //$estructura.appendChild($tableFragment);
  $estructura.appendChild($tableFragment);
}

function mostrarResultadoBusqueda(posicion) {
  if (posicion !== -1) {
    $panelResultadosBusqueda.textContent = `Clave encontrada en la posición ${posicion}.`;
  } else {
    $panelResultadosBusqueda.textContent = "Clave no encontrada.";
  }
}

function buscarClave(metodo, clave) {
  let resultado = -1;

  if (metodo === "secuencial") {
    resultado = buscarSecuencial(clave, estructura, rango);
  } else if (metodo === "binaria") {
    resultado = buscarBinaria(clave, estructura, rango);
  }

  mostrarResultadoBusqueda(resultado);

  // Limpia el campo de búsqueda
  $claveBuscar.value = ""; // Establece el valor del input en una cadena vacía
}

//hashing
function mostrarResultadoHash(colision, solucion) {
  if (colision !== "") {
    $panelResultadosBusquedaHash.innerHTML = `
      <p>Colisión detectada: ${colision}</p>
      <p>Solución de colisión utilizada: ${solucion.value}</p>
    `;
  } else {
    $panelResultadosBusquedaHash.textContent = "No se produjo colisión.";
  }
}

function insertarClaveHash(clave, tipoHash, tipoColision) {
  let hash;
  if (tipoHash === "modulo") {
    hash = moduloHash(clave, rangoHash);
  } else if (tipoHash === "cuadrado") {
    hash = cuadradoHash(clave, rangoHash);
  } else if (tipoHash === "plegamiento") {
    hash = plegamientoHash(clave, rangoHash);
  } else if (tipoHash === "truncamiento") {
    hash = truncamientoHash(clave, rangoHash);
  }
  console.log(estructuraHash);

  // Verificar si hay colisión
  if (estructuraHash[hash] !== "") {
    // Se produjo una colisión, aplica la función de resolución
    if (tipoColision === "pruebaLineal") {
      hash = pruebaLineal(hash, estructuraHash, rangoHash);
    } else if (tipoColision === "pruebaCuadratica") {
      hash = pruebaCuadratica(hash, estructuraHash, rangoHash);
    } else if (tipoColision === "dobleFuncionHash") {
      hash = dobleFuncionHash(hash, estructuraHash, rangoHash);
    } else if (tipoColision === "arregloAnidado") {
      hash = arregloAnidado(hash, estructuraHash, rangoHash);
    }
  }

  // Inserta la clave en la estructura utilizando la posición calculada
  estructuraHash[hash] = clave;
}



function buscarClaveHash(clave, tipoHash) {
  let hash;
  if (tipoHash === "modulo") {
    hash = moduloHash(clave, rangoHash);
  } else if (tipoHash === "cuadrado") {
    hash = cuadradoHash(clave, rangoHash);
  } else if (tipoHash === "plegamiento") {
    hash = plegamientoHash(clave, rangoHash);
  } else if (tipoHash === "truncamiento") {
    hash = truncamientoHash(clave, rangoHash);
  }

  // Realiza la búsqueda en la posición calculada
  if (estructuraHash[hash] === clave) {
    return hash; // Clave encontrada en la posición calculada
  } else {
    return -1; // Clave no encontrada
  }
}

function visualizarEstructuraHash(estructuraHash) {
  let $tableFragment = d.createDocumentFragment();
  $estructuraHash.innerHTML = `<thead>
      <tr>
        <th>Posición</th>
        <th>Clave</th>
      </tr>
    </thead>`;
  for (let i = 0; i < rangoHash; i++) {
    let $registroClaveHash = d.createElement("tr");
    $registroClaveHash.innerHTML = `
      <td>${i + 1}</td>
      <td>${estructuraHash[i] || ""}</td>
    `;
    $tableFragment.appendChild($registroClaveHash);
  }
  //$estructura.appendChild($tableFragment);
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
    e.preventDefault();
    if (e.target == $btnCrearEstructura) {
      const inputValue = parseInt($rango.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        rango = inputValue;
        estructura = new Array(rango).fill(""); // Crea un arreglo vacío con la longitud especificada.
      }
    }
    if (e.target == $btnVisualizarEstructura) {
      visualizarEstructura(estructura);
    }
    if (e.target == $btnOrdenarEstructura) {
      visualizarEstructura(
        estructura.sort(function (a, b) {
          if (a === "" && b !== "") {
            return 1;
          } else if (a !== "" && b === "") {
            return -1;
          } else {
            return a - b;
          }
        })
      );
    }
    if (e.target == $btnInsertarClave) {
      const inputValue = parseInt($claveInsertar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveInsertar = inputValue;
        insertarClave(claveInsertar);
      }
    }
    if (e.target == $btnEstructuraOriginal) {
      visualizarEstructura(estructura);
    }

    if (e.target == $btnBuscarClave) {
      const inputValue = parseInt($claveBuscar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveBuscar = inputValue;
        buscarClave($tipoBusqueda.selectedOptions[0].value, claveBuscar); // Usar selectedOptions[0].value
      }
    }
    //hash
    if (e.target == $btnCrearEstructuraHash) {
      const inputValue = parseInt($rangoHash.value);
      console.log($rangoHash.value);
      if (!isNaN(inputValue) && inputValue > 0) {
        rangoHash = inputValue;
        estructuraHash = new Array(rangoHash).fill(""); // Crea un arreglo vacío con la longitud especificada.
      }
    }
    if (e.target == $btnVisualizarEstructuraHash) {
      visualizarEstructuraHash(estructuraHash);
    }

    if (e.target == $btnInsertarClaveHash) {
      const inputValue = parseInt($claveInsertarHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveInsertarHash = inputValue;
        // La clave se insertará únicamente si se ha seleccionado un tipo hash y un tipo Colision
        insertarClaveHash(claveInsertarHash, $tipoHash.selectedOptions[0].value, $tipoSolColision.selectedOptions[0].value); // Usar selectedOptions[0].value
      }
    }

    if (e.target == $btnBuscarClaveHash) {
      const inputValue = parseInt($claveBuscarHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveBuscarHash = inputValue;
        // La clave se buscará únicamente si se ha seleccionado un tipo hash
        buscarClaveHash(claveBuscarHash, $tipoHash.selectedOptions[0].value); // Usar selectedOptions[0].value
      }
    }
  });
});
