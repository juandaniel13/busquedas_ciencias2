
import { buscarSecuencial, buscarBinaria } from "./busqueda_secuencia_binaria.js";

const d = document;
const w = window;

let estructura = [];
let estructuraHash =[];
let rangoHash = []
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
const $btnCrearEstructuraHash = d.querySelector(".btn-crear-estructura")
const $btnVisualizarEstructuraHash = d.querySelector("btn-visualizar-estructura-hash")
const $tipoHash = d.querySelector(".tipo-hash");
const $tipoSolColision = d.querySelector(".colision-hash")
const $btnInsertarClaveHash = d.querySelector(".btn-insertar-clave-hash");
const $btnBuscarClaveHash = d.querySelector("btn-buscar-clave-hash");


/* Paneles */
const $panelSecuencialBinaria = d.querySelector(".panel-secuencial-binaria");
const $panelHash = d.querySelector(".panel-hash");

const $estructura = d.querySelector(".estructura-interna");
const $panelResultadosBusqueda = d.querySelector(".panel-resultado-busqueda");
//hash
const $estructuraHash = d.querySelector(".estructura-interna-hash");
const $panelResultadosBusquedaHash = d.querySelector(".panel-resultado-busqueda-hash")



/* inputs */
const $rango = d.querySelector(".input-rango");
const $claveInsertar = d.querySelector(".input-insertar-clave");
const $tipoBusqueda = d.querySelector(".tipo-busqueda");
const $claveBuscar = d.querySelector(".clave-buscar");
//hash
const $rangoHash = d.querySelector(".input-rango-hash");
const $claveInsertarHash = d.querySelector(".input-insertar-clave-hash")
const $claveBuscarHash = d.querySelector(".clave-buscar-hash")


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


function buscarClaveHash(metodo,clave){

}


d.addEventListener("DOMContentLoaded", (e) => {
  /* secuencial binaria */
  d.addEventListener("click", (e) => {
    if(e.target ==$btnSecuencialBinaria ){
      $panelSecuencialBinaria.classList.remove("invisible")
      $panelHash.classList.add("invisible")
      
    }else if(e.target ==$btnHash ){
      $panelSecuencialBinaria.classList.add("invisible")
      $panelHash.classList.remove("invisible")
    }
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
    if(e.target == $btnEstructuraOriginal){
      visualizarEstructura(estructura);
    }

    if(e.target == $btnBuscarClave){
      const inputValue = parseInt($claveBuscar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveBuscar= inputValue;
        buscarClave($tipoBusqueda.value, claveBuscar);
        
      }
      
      
    }
  });
});
