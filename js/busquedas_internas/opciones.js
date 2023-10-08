import { buscarSecuencial,buscarBinaria} from "./busqueda_secuencia_binaria.js";

const d = document;
const w = window;

let estructura = [];
let rango = 0;

/* botones */
const $btnSecuencialBinaria = d.querySelector(".btn-secuencial-binaria");
const $btnCrearEstructura = d.querySelector(".btn-crear-estructura"); //listo
const $btnOrdenarEstructura = d.querySelector(".btn-ordenar-estructura"); //listo
const $btnEstructuraOriginal = d.querySelector(".btn-estructura-original");//listo
const $btnVisualizarEstructura = d.querySelector(".btn-visualizar-estructura"); //listo
const $btnInsertarClave = d.querySelector(".btn-insertar-clave"); //listo
const $btnBuscarClave = d.querySelector(".btn-buscar-clave");//listo

/* Paneles */
const $panelSecuencialBinaria = d.querySelector(".panel-secuencial-binaria")
const $estructura = d.querySelector(".estructura-interna");
const $panelResultadosBusqueda = d.querySelector(".panel-resultado-busqueda");

/* inputs */
const $rango = d.querySelector(".input-rango");
const $claveInsertar = d.querySelector(".input-insertar-clave");
const $tipoBusqueda = d.querySelector(".tipo-busqueda");
const $claveBuscar = d.querySelector(".clave-buscar");

function insertarClave(clave) {
  for (let i = 0; i < rango; i++) {
    if (estructura[i] == "") {
      estructura[i] = clave;
      return;
    }
  }
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

function ordenarEstructura(estructura) {
  // Implementa la lógica para ordenar la estructura.
}

function mostrarResultadoBusqueda(posicion) {
  if (posicion !== -1) {
    $panelResultadosBusqueda.textContent = `Clave encontrada en la posición ${posicion}.`;
  } else {
    $panelResultadosBusqueda.textContent = "Clave no encontrada.";
  }
}

function buscarClave(metodo, clave) {
  let resultado = -1; // Inicializa el resultado como -1, lo que indica que no se encontró la clave.
  console.log(metodo);
  if (metodo === "secuencial") {
    resultado = buscarSecuencial(clave,estructura,rango);
  } else if (metodo === "binaria") {
    resultado = buscarBinaria(clave,estructura,rango);
  }

  mostrarResultadoBusqueda(resultado);
}


d.addEventListener("DOMContentLoaded", (e) => {
  d.addEventListener("click", (e) => {
    if(e.target ==$btnSecuencialBinaria ){
      $panelSecuencialBinaria.classList.remove("invisible")
    }else{
      $panelSecuencialBinaria.classList.add("invisible")
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
