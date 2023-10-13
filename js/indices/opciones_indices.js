const d = document;
let registros, longitudRegistro, capacidadBloque, longitudRegistroIndice;
function logBaseN(x, base) {
  // Calcula el logaritmo en base 10 de x
  const logX = Math.log(x);

  // Calcula el logaritmo en la base deseada (base) utilizando el cambio de base
  const logBase = Math.log(base);

  // Calcula el logaritmo en la base deseada (base) de x
  const result = logX / logBase;

  return result;
}

function crearEstructuraIndicesPrimarios(
  registros,
  longitudRegistro,
  capacidadBloque,
  longitudRegistroIndice
) {
  const estructuraDatos = {};
  estructuraDatos.cantidadRegistro = registros;
  estructuraDatos.capacidadBloque = Math.floor(
    capacidadBloque / longitudRegistro
  );
  estructuraDatos.cantidadBloques = Math.ceil(
    registros / Math.floor(capacidadBloque / longitudRegistro)
  );

  const estructuraIndices = {};
  estructuraIndices.capacidadBloqueIndice = Math.floor(
    capacidadBloque / longitudRegistroIndice
  );
  estructuraIndices.cantidadBloqueIndice = Math.ceil(
    estructuraDatos.cantidadBloques /
      Math.floor(capacidadBloque / longitudRegistroIndice)
  );
  estructuraIndices.cantidadRegistroIndice = estructuraDatos.cantidadBloques;

  let complejidadBusqueda = Math.ceil(logBaseN(estructuraDatos.cantidadBloques ,2))+1
  console.log(estructuraDatos, estructuraIndices);
  //complejidad de búsqueda??'
  return {estructuraDatos, estructuraIndices,complejidadBusqueda};
}

function crearEstructuraMultinivelPrimarios(
  registros,
  longitudRegistro,
  capacidadBloque,
  longitudRegistroIndice
) {
  const estructuraDatos = {};
  estructuraDatos.cantidadRegistro = registros;
  estructuraDatos.capacidadBloque = Math.floor(
    capacidadBloque / longitudRegistro
  );
  estructuraDatos.cantidadBloques = Math.ceil(
    registros / Math.floor(capacidadBloque / longitudRegistro)
  );

  const estructurasIndices = [];
  let capacidadBloqueIndice = Math.floor(
    capacidadBloque / longitudRegistroIndice
  ); //546
  let cantidadBloqueIndice = Math.ceil(
    estructuraDatos.cantidadBloques / capacidadBloqueIndice
  ); //4630/546
  console.log(cantidadBloqueIndice);

  const estructuraIndices = {};
  estructuraIndices.capacidadBloqueIndice = capacidadBloqueIndice; //546
  estructuraIndices.cantidadBloqueIndice = cantidadBloqueIndice; //9
  estructuraIndices.cantidadRegistroIndice = estructuraDatos.cantidadBloques; //4630

  estructurasIndices.push(estructuraIndices);

  while (cantidadBloqueIndice > 1) {
    cantidadBloqueIndice = Math.ceil(
      cantidadBloqueIndice / capacidadBloqueIndice
    );
    const estructuraIndices = {};
    estructuraIndices.cantidadBloqueIndice = cantidadBloqueIndice;
    estructuraIndices.capacidadBloqueIndice = capacidadBloqueIndice; //estructurasIndices[estructurasIndices.length-1].cantidadBloqueIndice
    estructuraIndices.cantidadRegistroIndice = Math.ceil(
      estructuraDatos.cantidadBloques / capacidadBloqueIndice
    ); //estructurasIndices[estructurasIndices.length-1].capacidadBloqueIndice

    estructurasIndices.push(estructuraIndices);
    console.log(cantidadBloqueIndice);
    console.log(estructurasIndices);
  }
  //console.log(estructurasIndices[estructurasIndices.length-2].cantidadBloqueIndice);

  let numNiveles = Math.ceil(
    logBaseN(
      estructuraDatos.cantidadBloques,
      estructurasIndices[estructurasIndices.length - 1].capacidadBloqueIndice
    )
  );
  let numAccesos = numNiveles + 1;

  console.log(estructuraDatos, estructurasIndices, numNiveles, numAccesos);
  return { estructuraDatos, estructurasIndices, numNiveles, numAccesos };
}
function graficarEstructuras() {
  // Selecciona el elemento SVG
  const svg = d3.select("#estructura-svg");

  // Define las dimensiones y la posición del rectángulo
  const rectWidth = 50; // Ancho del rectángulo
  const rectHeight = 200; // Alto del rectángulo
  const rectX = 75; // Posición X del rectángulo
  const rectY = 50; // Posición Y del rectángulo

  // Agrega un rectángulo al SVG
  svg
    .append("rect")
    .attr("x", rectX)
    .attr("y", rectY)
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("fill", "blue"); // Color del rectángulo

  // Muestra el resultado en el panel
  const panelEstructura = d.querySelector(".panel-estructura");
  panelEstructura.innerHTML = "Estructura gráfica generada en SVG.";
}
function accesosEstructuraIndicesPrimarios(panel,obj){
  panel.innerHTML =  `<p>La complegidad de la búsqueda es ${obj.complejidadBusqueda}</p>`;
}

function accesosEstructuraMultinivelPrimarios(panel,obj){
  panel.innerHTML =  `<p>El numero de niveles es ${obj.numNiveles}</p>
  <p>El numero de accesos es ${obj.numAccesos}</p>`;
}

// Llama a la función graficarEstructuras cuando sea necesario


d.addEventListener("DOMContentLoaded", () => {
  /* botones */
  const $btnGraficarEstructura = d.querySelector(".btn-graficar-estructura"),
    $btnCalcularAccesos = d.querySelector(".btn-calcular-accesos");

  /* inputs */
  const $cantRegistros = d.querySelector(".cant-registros"),
    $capacidadBloque = d.querySelector(".capacidad-bloque"),
    $longitudRegistro = d.querySelector(".longitud-registo"),
    $longitudRegistroIndice = d.querySelector(".longitud-registo-indice"),
    $tipoEstructura = d.querySelector(".tipo-estructura");

  /* paneles */
  const $panelEstructura = d.querySelector(".panel-estructura"),
    $panelResultadoBusqueda = d.querySelector(".panel-resultado-busqueda");

  d.addEventListener("click", (e) => {
    if (e.target == $btnGraficarEstructura) {
      e.preventDefault();
      longitudRegistro = $longitudRegistro.value;
      registros = $cantRegistros.value;
      capacidadBloque = $capacidadBloque.value;
      longitudRegistroIndice = $longitudRegistroIndice.value;

      if ($tipoEstructura.value == "indices-primarios") {
        const estructuraIndicesPrimarios = crearEstructuraIndicesPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
        graficarEstructuras()
      }
      if ($tipoEstructura.value == "indices-multinivel-primarios") {
        const estructuraIndicesPrimarios = crearEstructuraIndicesPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
      }
    }

    if (e.target == $btnCalcularAccesos) {
      e.preventDefault();
      longitudRegistro = $longitudRegistro.value;
      registros = $cantRegistros.value;
      capacidadBloque = $capacidadBloque.value;
      longitudRegistroIndice = $longitudRegistroIndice.value;

      if ($tipoEstructura.value == "indices-primarios") {
        const estructuraIndicesPrimarios = crearEstructuraIndicesPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
        accesosEstructuraIndicesPrimarios($panelResultadoBusqueda,estructuraIndicesPrimarios);
      }
      if ($tipoEstructura.value == "indices-multinivel-primarios") {
        const estructuraMultinivelPrimarios = crearEstructuraMultinivelPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
        accesosEstructuraMultinivelPrimarios($panelResultadoBusqueda, estructuraMultinivelPrimarios);
      }
    }
  });
});
