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
let estructuraHashAnidado = [];
let estructuraHashEncadenado;
let rangoHash = 0;
let rango = 0;

/* botones */
const $btnSecuencialBinaria = d.querySelector(".btn-secuencial-binaria");
const $btnHash = d.querySelector(".btn-hash");

const $btnCrearEstructura = d.querySelector(".btn-crear-estructura"); //listo
const $btnOrdenarEstructura = d.querySelector(".btn-ordenar-estructura"); //listo
const $btnEstructuraOriginal = d.querySelector(".btn-estructura-original"); //listo
const $btnVisualizarEstructura = d.querySelector(".btn-visualizar-estructura"); //listo
const $btnInsertarRegistro = d.querySelector(".btn-insertar-registro"); //listo
const $btnBuscarClave = d.querySelector(".btn-buscar-clave"); //listo
const $btnEliminarRegistro = d.querySelector(".btn-eliminar-clave");
//hash
const $btnCrearEstructuraHash = d.querySelector(".btn-crear-estructura-hash");
const $btnVisualizarEstructuraHash = d.querySelector(
  ".btn-visualizar-estructura-hash"
);
const $btnInsertarClaveHash = d.querySelector(".btn-insertar-clave-hash");
const $btnBuscarClaveHash = d.querySelector(".btn-buscar-clave-hash");
const $btnEliminarRegistroHash = d.querySelector(".btn-eliminar-clave-hash")

/* Paneles */
const $main = d.querySelector("main");
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
const $rango = d.querySelector(".input-rango");
const $claveInsertar = d.querySelector(".input-insertar-clave");
const $nombreRegistro = d.querySelector(".input-insertar-nombre");
const $apellidoRegistro = d.querySelector(".input-insertar-apellido");
const $tipoBusqueda = d.querySelector(".tipo-busqueda");
const $claveBuscar = d.querySelector(".clave-buscar");
const $claveEliminar = d.querySelector(".clave-eliminar");
const $nombreInsertarHash = d.querySelector(".input-insertar-nombre-hash");
const $apellidoInsertarHash = d.querySelector(".input-insertar-apellido-hash");
//hash
const $rangoHash = d.querySelector(".input-rango-hash");
const $claveInsertarHash = d.querySelector(".input-insertar-clave-hash");
const $claveBuscarHash = d.querySelector(".clave-buscar-hash");
const $tipoHash = d.querySelector(".tipo-hash");
const $tipoSolColision = d.querySelector(".colision-hash");
const $claveEliminarHash = d.querySelector(".clave-eliminar-hash")

/* secuencial binaria */
function insertarRegistro(registro) {
  if (estructura.includes(registro)) {
    alert("La clave del registro ya existe en la estructura.");
    return;
  }

  for (let i = 0; i < rango; i++) {
    if (estructura[i] === "") {
      estructura[i] = registro;

      // Limpia el campo de entrada
      $claveInsertar.value = ""; // Establece el valor del input en una cadena vacía
      $nombreRegistro.value = "";
      $apellidoRegistro.value = "";

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
      <td>${estructura[i].clave || ""}</td>
    `;
    $tableFragment.appendChild($registroClave);
  }
  //$estructura.appendChild($tableFragment);
  $estructura.appendChild($tableFragment);
}

function visualizarRegistro(posicion) {
  let registro = estructura[posicion];
  const contenedorModal = d.createElement("div");
  contenedorModal.classList.add("contenedor-modal");
  contenedorModal.innerHTML = `<div class="contenido-modal">
  <input type="checkbox" name="" id="btn-modal" />
  <h3>Registro encontrado:</h3>
  <br/>
  <ul> 
    <li>Clave: ${registro.clave}</li>
    <li>Nombre: ${registro.nombre}</li>
    <li>Apellido: ${registro.apellido}</li>
  </ul>
  <br /><br /><br /><br />
  <div class="btn-cerrar">
    <label for ="btn-modal">Cerrar</label>
  </div>
  </div>`;
  $main.appendChild(contenedorModal);
  console.log($main);
  const btnModal = document.getElementById("btn-modal");
  btnModal.addEventListener("click", function () {
    if (!btnModal.checked) {
      // Cierra el modal cuando se desmarca el checkbox
      contenedorModal.remove();
    }
  });
}

function visualizarRegistroHash(posicion) {
  console.log(estructuraHash);
  let registro = estructuraHash[posicion];
  const contenedorModal = d.createElement("div");
  contenedorModal.classList.add("contenedor-modal");
  contenedorModal.innerHTML = `<div class="contenido-modal">
  <input type="checkbox" name="" id="btn-modal" />
  <h3>Registro encontrado:</h3>
  <br/>
  <ul> 
    <li>Clave: ${registro.clave}</li>
    <li>Nombre: ${registro.nombre}</li>
    <li>Apellido: ${registro.apellido}</li>
  </ul>
  <br /><br /><br /><br />
  <div class="btn-cerrar">
    <label for ="btn-modal">Cerrar</label>
  </div>
  </div>`;
  $main.appendChild(contenedorModal);
  console.log($main);
  const btnModal = document.getElementById("btn-modal");
  btnModal.addEventListener("click", function () {
    if (!btnModal.checked) {
      // Cierra el modal cuando se desmarca el checkbox
      contenedorModal.remove();
    }
  });
}

function mostrarResultadoBusqueda(posicion) {
  if (posicion !== -1) {
    /* panel registro */

    $panelResultadosBusqueda.innerHTML = `<span> Resultados de Búsqueda:</span>
    <br><br><br><br>
    <div class = "panel-resultado-busqueda-text">
    <div>Clave encontrada en la posición ${posicion + 1}</div>
    <br><br><br><br>
    <div   class = "btn-visualizar-registro"><label for ="btn-modal ">Visualizar Registro </label></div>
    </div>`;

    const btnVisualizarRegistro = d.querySelector(".btn-visualizar-registro");
    btnVisualizarRegistro.addEventListener("click", (e) => {
      visualizarRegistro(posicion);
    });
    //onclick="visualizarRegistro(posicion)"
  } else {
    $panelResultadosBusqueda.textContent = `<span> Resultados de Búsqueda:</span>
    <br><br><br><br>
    <div class = "panel-resultado-busqueda-text">
    <div>Registro no encontrado</div>
    </div>`;
  }
}

function mostrarResultadoBusquedaHash(posicion) {
  if (posicion !== -1) {
    /* panel registro */

    $panelResultadosBusquedaHash.innerHTML = `<span> Resultados de Búsqueda:</span>
    <br><br><br><br>
    <div class = "panel-resultado-busqueda-text">
    <div>Clave encontrada en la posición ${posicion}</div>
    <br><br><br><br>
    <div   class = "btn-visualizar-registro"><label for ="btn-modal ">Visualizar Registro </label></div>
    </div>`;

    const btnVisualizarRegistro = d.querySelector(".btn-visualizar-registro");
    btnVisualizarRegistro.addEventListener("click", (e) => {
      visualizarRegistroHash(posicion);
    });
    //onclick="visualizarRegistro(posicion)"
  } else {
    $panelResultadosBusquedaHash.textContent = `<span> Resultados de Búsqueda:</span>
    <br><br><br><br>
    <div class = "panel-resultado-busqueda-text">
    <div>Registro no encontrado</div>
    </div>`;
  }
}

function buscarClave(metodo, clave) {
  let resultado = -1;

  if (metodo === "secuencial") {
    resultado = buscarSecuencial(clave, estructura, rango);
  } else if (metodo === "binaria") {
    resultado = buscarBinaria(clave, estructura, rango);
    /* animacionBinaria(clave,estructura,$estructura); */
  }

  mostrarResultadoBusqueda(resultado);

  // Limpia el campo de búsqueda
  $claveBuscar.value = ""; // Establece el valor del input en una cadena vacía
}

function eliminarRegistro(clave) {
  for (let i = 0; i < estructura.length; i++) {
    if (estructura[i].clave == clave) {
      estructura[i] = "";
    }
  }
}

function eliminarRegistroHash(clave) {
  for (let i = 0; i < estructuraHash.length; i++) {
    if (estructuraHash[i].clave == clave) {
      estructuraHash[i] = "";
    }
  }
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

function insertarClaveHash(registro, tipoHash, tipoColision) {


  console.log(estructuraHashAnidado);
 
  let hash;
  if (tipoHash === "mod") {
    hash = moduloHash(registro.clave, rangoHash);
  } else if (tipoHash === "cuadrado") {
    hash = cuadradoHash(registro.clave, rangoHash);
  } else if (tipoHash === "plegamiento") {
    hash = plegamientoHash(registro.clave, rangoHash);
  } else if (tipoHash === "truncamiento") {
    hash = truncamientoHash(registro.clave, rangoHash);
  }

  // Verificar si hay colisión
  if($tipoSolColision == "arreglo-anidado"){
    var result = {i:hash, j:0}
  if(estructuraHashAnidado[hash][0] !== ""){
     result = arregloAnidado(hash, estructuraHashAnidado, rangoHash, registro.clave);
    estructuraHashAnidado[result.i][result.j] = registro.clave;
  }
  }
  if (estructuraHash[hash] !== ""  ) {
    console.log("se produjo una colisión");
    // Se produjo una colisión, aplica la función de resolución
    if (tipoColision === "lineal") {
      hash = pruebaLineal(hash, estructuraHash, rangoHash);
    } else if (tipoColision === "cuadratica") {
      //hash = pruebaCuadratica(hash, estructuraHash, rangoHash);
    } else if (tipoColision === "doble-hash") {
      hash = dobleFuncionHash(hash, estructuraHash, rangoHash);
    }
    else if (tipoColision === "encadenamiento") {
      
    }
  } 
  // Inserta la clave en la estructura utilizando la posición calculada
if(tipoColision == "arreglos-anidados"){
  estructuraHashAnidado[result.i][result.j] = registro;
  console.log(estructuraHashAnidado);
}else{
  estructuraHash[hash] = registro;
}
// Limpia el campo de entrada
$claveInsertarHash.value = "";

}



function buscarClaveHash(clave, tipoHash) {
  let hash;
  if (tipoHash === "mod") {
    hash = moduloHash(clave, rangoHash);
  } else if (tipoHash === "cuadrado") {
    hash = cuadradoHash(clave, rangoHash);
  } else if (tipoHash === "plegamiento") {
    hash = plegamientoHash(clave, rangoHash);
  } else if (tipoHash === "truncamiento") {
    hash = truncamientoHash(clave, rangoHash);
  }

 
  // Realiza la búsqueda en la posición calculada
  if (estructuraHash[hash] == clave) {
    mostrarResultadoBusquedaHash(hash);
    return hash; // Clave encontrada en la posición calculada
  } else {

     // Verificar si hay colisión
     if($tipoSolColision.value == "arreglo-anidado"){  
  let result = {i:hash, j:0}
  if(estructuraHashAnidado[hash][0] !== ""){
     result = arregloAnidado(hash, estructuraHashAnidado, rangoHash, registro.clave);
    estructuraHashAnidado[result.i][result.j] = registro.clave;
  }
}
  if (estructuraHash[hash] !== ""  ) {
    console.log("se produjo una colisión");
    // Se produjo una colisión, aplica la función de resolución
    if ($tipoSolColision.value  === "lineal") {
      hash = pruebaLineal(hash, estructuraHash, rangoHash);
    } else if ($tipoSolColision.value  === "cuadratica") {
      //hash = pruebaCuadratica(hash, estructuraHash, rangoHash);
    } else if ($tipoSolColision.value  === "doble-hash") {
      hash = dobleFuncionHash(hash, estructuraHash, rangoHash);
    }
    else if ($tipoSolColision.value  === "encadenamiento") {
      
    }
    mostrarResultadoBusquedaHash(hash || result);
  }
  else{
    mostrarResultadoBusquedaHash(-1);
    return -1; // Clave no encontrada
  }
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
      <td>${estructuraHash[i].clave || ""}</td>
    `;
    $tableFragment.appendChild($registroClaveHash);
  }
  //$estructura.appendChild($tableFragment);
  $estructuraHash.appendChild($tableFragment);
}

function visualizarEstructuraHashAnidado(estructuraHashAnidado) {
  let $tableFragment = d.createDocumentFragment();
  $estructuraHash.innerHTML = `<thead>
      <tr>
        <th>Posición</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
        <th>Clave</th>
      </tr>
    </thead>`;
  for (let i = 0; i < rangoHash; i++) {
    /* for (let j = 0; j< rangoHash; j++){ */
      let $registroClaveHash = d.createElement("tr");
      $registroClaveHash.innerHTML = `
        <td>${i + 1}</td>
        <td>${estructuraHashAnidado[i][0].clave || ""}</td>
        <td>${estructuraHashAnidado[i][1].clave || ""}</td>
        <td>${estructuraHashAnidado[i][2].clave || ""}</td>
        <td>${estructuraHashAnidado[i][3].clave || ""}</td>
        <td>${estructuraHashAnidado[i][4].clave || ""}</td>
        <td>${estructuraHashAnidado[i][5].clave || ""}</td>
        <td>${estructuraHashAnidado[i][6].clave || ""}</td>
        <td>${estructuraHashAnidado[i][7].clave || ""}</td>
        <td>${estructuraHashAnidado[i][8].clave || ""}</td>
        <td>${estructuraHashAnidado[i][9].clave || ""}</td>
      `;
      $tableFragment.appendChild($registroClaveHash);
    
   
  }
  //$estructura.appendChild($tableFragment);
  $estructuraHash.appendChild($tableFragment);
}

function visualizarEstructuraHashEncadenado(estructuraHashEncadenado) {
  let $tableFragment = d.createDocumentFragment();
  $estructuraHash.innerHTML = `<thead>
      <tr>
        <th>Posición</th>
        <th>Clave</th>
      </tr>
    </thead>`;


  for (let i = 0; i < rangoHash; i++) {
    let $registroClaveHash = d.createElement("tr");
      $registroClaveHash.innerHTML='';
  estructuraHashEncadenado.forEach((el, i) => {
    let row = '<tr>';
    row += `<td>${i + 1}</td>`;
    
    el.forEach((clave) => {
      row += `<td>${clave.clave || ''}</td>`;
    });
  
    row += '</tr>';
    $registroClaveHash.innerHTML += row;
  });
  $tableFragment.appendChild($registroClaveHash);
    
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
        visualizarEstructura(estructura);
      }
    }

    if (e.target == $btnInsertarRegistro) {
      e.preventDefault();
      const valorInputClave = parseInt($claveInsertar.value);
      const valorInpurNombre = $nombreRegistro.value;
      const valorInputApellido = $apellidoRegistro.value;

      if (!isNaN(valorInputClave) && valorInputClave > 0) {
        let nuevoRegistro = {
          clave: valorInputClave,
          nombre: valorInpurNombre,
          apellido: valorInputApellido,
        };
        insertarRegistro(nuevoRegistro);
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
    }

    if (e.target == $btnBuscarClave) {
      e.preventDefault();
      const inputValue = parseInt($claveBuscar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveBuscar = inputValue;
        buscarClave($tipoBusqueda.value, claveBuscar); // Usar selectedOptions[0].value
      }
    }

    if (e.target == $btnEliminarRegistro) {
      e.preventDefault();
      const inputValue = parseInt($claveEliminar.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveEliminar = inputValue;
        eliminarRegistro(claveEliminar);
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
    }
    //hash
    if (e.target == $btnCrearEstructuraHash) {
      e.preventDefault();
      const inputValue = parseInt($rangoHash.value);
      console.log($rangoHash.value);
      if (!isNaN(inputValue) && inputValue > 0) {
        if ($tipoSolColision.value == "arreglos-anidados") {
          rangoHash = inputValue;
          estructuraHashAnidado = new Array(rangoHash);
          for(let i=0; i<rangoHash;i++){
            estructuraHashAnidado[i]=new Array(rangoHash).fill("")
          }
            
    
          visualizarEstructuraHashAnidado(estructuraHashAnidado);
        
        }else if($tipoSolColision.value == "encadenamiento"){
          rangoHash = inputValue;
          estructuraHashEncadenado = new Array(rangoHash);
          for(let i=0; i<rangoHash;i++){
            estructuraHashEncadenado[i]=[""]
          }
          console.log(estructuraHashEncadenado);
          visualizarEstructuraHashEncadenado(estructuraHashEncadenado);
        }
        else{
          rangoHash = inputValue;
        estructuraHash = new Array(rangoHash).fill(""); // Crea un arreglo vacío con la longitud especificada.
        visualizarEstructuraHash(estructuraHash);
        }
      }
    }

    if (e.target == $btnInsertarClaveHash) {
      e.preventDefault();
      const inputValue = parseInt($claveInsertarHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveInsertarHash = inputValue;
        let registroInsertarHash = {
          clave: claveInsertarHash,
          nombre: $nombreInsertarHash.value,
          apellido: $apellidoInsertarHash.value,
        };
        // La clave se insertará únicamente si se ha seleccionado un tipo hash y un tipo Colision
        insertarClaveHash(
          registroInsertarHash,
          $tipoHash.value,
          $tipoSolColision.value
        ); // Usar selectedOptions[0].value
        if($tipoSolColision.value =="arreglos-anidados"){
          visualizarEstructuraHashAnidado(estructuraHashAnidado);
        }
        else{
          visualizarEstructuraHash(estructuraHash);
        }
      }
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
    if (e.target == $btnEliminarRegistroHash) {
      e.preventDefault();
      const inputValue = parseInt($claveEliminarHash.value);

      if (!isNaN(inputValue) && inputValue > 0) {
        let claveEliminarHash = inputValue;
        eliminarRegistroHash(claveEliminarHash);
        visualizarEstructuraHash(estructuraHash);
      }
    }
  });})
