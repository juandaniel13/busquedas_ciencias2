
  
  const d = document;
  const w = window;
  
  let estructuraExterna = [];
  let estructuraHashExterna = [];
  let rangoHashExterna = 0;
  let rango = 0;
  
  /* botones */
  const $btnSecuencialBinaria = d.querySelector(".btn-secuencial-binaria-externa");
  const $btnHash = d.querySelector(".btn-hash-externa");
  
  const $btnCrearEstructura = d.querySelector(".btn-crear-estructura-externa"); //listo
  const $btnOrdenarEstructura = d.querySelector(".btn-ordenar-estructura-externa"); //listo
  const $btnEstructuraOriginal = d.querySelector(".btn-estructura-original-external"); //listo
  const $btnVisualizarEstructura = d.querySelector(".btn-visualizar-estructura-externa"); //listo
  const $btnInsertarClave = d.querySelector(".btn-insertar-clave-externa"); //listo
  const $btnBuscarClave = d.querySelector(".btn-buscar-clave-externa"); //listo
  //hash
  const $btnCrearEstructuraHash = d.querySelector(".btn-crear-estructura-externa-hash");
  const $btnVisualizarEstructuraHash = d.querySelector(".btn-visualizar-estructura-externa-hash");
  const $btnInsertarClaveHash = d.querySelector(".btn-insertar-clave-hash-externa");
  const $btnBuscarClaveHash = d.querySelector(".btn-buscar-clave-hash-externa");
  
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
  const $rango = d.querySelector(".input-rango-externa");
  const $claveInsertar = d.querySelector(".input-insertar-clave");
  const $tipoBusqueda = d.querySelector(".tipo-busqueda");
  const $claveBuscar = d.querySelector(".clave-buscar");
  //hash
  const $rangoHash = d.querySelector(".input-rango-externa");
  const $claveInsertarHash = d.querySelector(".input-insertar-clave-hash");
  const $claveBuscarHash = d.querySelector(".clave-buscar-hash");
  const $tipoHash = d.querySelector(".tipo-hash");
  const $tipoSolColision = d.querySelector(".colision-hash");
  
  /* secuencial binaria */
  function insertarClave(clave) {
    
  }
  
  function visualizarEstructura(estructura) {
      }
  
  
  
  function buscarClave(metodo, clave) {
   }
  
  //hashing
  function insertarClaveHash(clave, tipoHash, tipoColision) {
  
  }
  
  
  
  function buscarClaveHash(clave, tipoHash) {
  }
  
  function visualizarEstructuraHash(estructuraHash) {
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
  