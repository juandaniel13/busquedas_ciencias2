const d = document;
let arbol ;

/* Botones */
const $btnCrearArbol = d.querySelector(".btn-crear-arbol");
const $btnVisualizarArbol = d.querySelector(".btn-visualizar-arbol");

/* Inputs */
const $claveArbol = d.querySelector(".input-clave-arbol");

/* Outputs */
const $estructuraArbol = d.querySelector(".estructura-arbol");

// Clase para representar un nodo del árbol

function crearArbolDigital(clave) {
  
}



// Función para visualizar el árbol digital
function visualizarArbolDigital() {
  
}

// Asociar eventos a los botones
d.addEventListener("DOMContentLoaded", () => {
  d.addEventListener("click", (e) => {
    
    if (e.target === $btnCrearArbol) {
      e.preventDefault();
       crearArbolDigital(clave);
      visualizarArbolDigital(root, $estructuraArbol);
    }
    if (e.target === $btnVisualizarArbol) {
      e.preventDefault();
     visualizarArbolDigital();
   }
  });
});
