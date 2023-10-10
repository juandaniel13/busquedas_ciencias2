const d = document;
let clave;

/* Botones */
const $btnCrearArbol = d.querySelector(".btn-crear-arbol");
const $btnVisualizarArbol = d.querySelector(".btn-visualizar-arbol");

/* Inputs */
const $tipoArbol = d.querySelector(".tipo-arbol");
const $claveArbol = d.querySelector(".input-clave-arbol");

/* Outputs */
const $estructuraArbol = d.querySelector(".estructura-arbol");
const $resultadoArbol = d.querySelector(".resultado-arbol");

// Función para asignar números a las letras del alfabeto americano
function asignarNumeroALetra(letra) {
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alfabeto.indexOf(letra.toUpperCase()) + 1;
}

// Función para convertir un número en su representación binaria
function decimalABinario(numero) {
  return numero.toString(2);
}

// Clase para representar un nodo en el árbol digital
class NodoArbol {
  constructor(valor) {
    this.valor = valor;
    this.hijoIzquierdo = null;
    this.hijoDerecho = null;
  }
}

// Función para crear un árbol digital a partir de una clave
function crearArbolDigital(clave) {
  const raiz = new NodoArbol(clave[0]);
  let nodoActual = raiz;

  for (let i = 1; i < clave.length; i++) {
    const letra = clave[i];
    const numero = asignarNumeroALetra(letra);
    const binario = decimalABinario(numero);

    for (let j = 0; j < binario.length; j++) {
      if (binario[j] === '0') {
        if (!nodoActual.hijoIzquierdo) {
          nodoActual.hijoIzquierdo = new NodoArbol(letra);
        }
        nodoActual = nodoActual.hijoIzquierdo;
      } else {
        if (!nodoActual.hijoDerecho) {
          nodoActual.hijoDerecho = new NodoArbol(letra);
        }
        nodoActual = nodoActual.hijoDerecho;
      }
    }
  }

  return raiz;
}

// Función para convertir el árbol a un formato D3.js
function convertirArbolAD3(arbol) {
  const treeData = {
    name: arbol.valor,
    children: [],
  };

  if (arbol.hijoIzquierdo) {
    treeData.children.push(convertirArbolAD3(arbol.hijoIzquierdo));
  }

  if (arbol.hijoDerecho) {
    treeData.children.push(convertirArbolAD3(arbol.hijoDerecho));
  }

  return treeData;
}

// Función para visualizar el árbol digital con D3.js
function visualizarArbolDigital(clave) {
  const arbol = crearArbolDigital(clave);
  const treeData = convertirArbolAD3(arbol);

  // Configurar dimensiones y escalas del gráfico
  const width = 400;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  const svg = d3.select($estructuraArbol)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
  const root = d3.hierarchy(treeData);
  const tree = treeLayout(root);

  // Crear enlaces (líneas) entre nodos
  const links = tree.links();
  svg.selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y));

  // Crear nodos
  const nodes = tree.descendants();
  const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

  // Agregar círculos a los nodos
  node.append("circle")
    .attr("r", 10);

  // Agregar etiquetas a los nodos
  node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => (d.children ? -10 : 10))
    .style("text-anchor", d => (d.children ? "end" : "start"))
    .text(d => d.data.name);
}

d.addEventListener("DOMContentLoaded", () => {
  d.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == $btnCrearArbol) {
      clave = $claveArbol.value;
    }
    if (e.target == $btnVisualizarArbol) {
      // Limpiar el elemento $estructuraArbol antes de agregar el gráfico
      $estructuraArbol.innerHTML = "";
      visualizarArbolDigital(clave);
    }
  });
});
