
const d = document,
  w = window;

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

function crearArbolDigital(clave) {
  // Crear la estructura del árbol
  const arbol = {
    value: clave[0],
    children: [],
  };

  let currentNode = arbol;

  for (let i = 1; i < clave.length; i++) {
    const newNode = {
      value: clave[i],
      children: [],
    };

    if (clave[i] === "0") {
      currentNode.children.unshift(newNode); // Agregar a la izquierda
    } else {
      currentNode.children.push(newNode); // Agregar a la derecha
    }

    currentNode = newNode;
  }

  return arbol;
}

function visualizarArbolDigital(clave) {
  // Crear el árbol digital
  const arbol = crearArbolDigital(clave);

  // Configurar el lienzo SVG
  const width = 800;
  const height = 500;
  const svg = d3.select($estructuraArbol).append("svg").attr("width", width).attr("height", height);
  const g = svg.append("g").attr("transform", `translate(${width / 2},${50})`);

  // Crear un layout de árbol con orientación horizontal
  const tree = d3.tree().size([height, width - 200]).separation((a, b) => (a.parent === b.parent ? 2 : 2.5));

  // Crear una jerarquía de datos
  const root = d3.hierarchy(arbol);

  // Asignar coordenadas a los nodos
  tree(root);

  // Dibujar las conexiones entre nodos
  const links = g
    .selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", (d) => `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`);

  // Dibujar los nodos
  const nodes = g
    .selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  nodes
    .append("circle")
    .attr("r", 10)
    .style("fill", "steelblue")
    .style("stroke", "white")
    .style("stroke-width", 2);

  nodes
    .append("text")
    .attr("dy", ".35em")
    .attr("x", (d) => (d.children ? -15 : 15))
    .style("text-anchor", (d) => (d.children ? "end" : "start"))
    .text((d) => d.data.value);
}

d.addEventListener("DOMContentLoaded", () => {
  d.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == $btnCrearArbol) {
      clave = $claveArbol.value;
    }
    if (e.target == $btnVisualizarArbol) {
      visualizarArbolDigital(clave);
    }
  });
});
