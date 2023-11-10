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

function accesosEstructuraIndicesPrimarios(panel,obj){
  panel.innerHTML =  `<br/><br/><p>La complegidad de la búsqueda es ${obj.complejidadBusqueda}</p>`;
}

function accesosEstructuraMultinivelPrimarios(panel,obj){
  panel.innerHTML =  `<br/><br/><p>El numero de niveles es ${obj.numNiveles}</p>
  <p>El numero de accesos es ${obj.numAccesos}</p>`;
}

function generarTablaConNFilas(n) {
  // Crear la tabla
  const tabla = document.createElement('table');

  // Crear filas y celdas
  for (let i = 0; i < n; i++) {
    const fila = tabla.insertRow();
    const celda = fila.insertCell(0);
    celda.textContent = `clave ${i+1}`;
  }

  return tabla;
}
function graficarEstructura(estructuraPrincipal, estructuraIndices, panelEstructura) {


  // Crear tabla para estructuraPrincipal
  const tablaPrincipal = document.createElement('table');
  tablaPrincipal.innerHTML = '<caption>Estructura Principal</caption>';
  const encabezadoPrincipal = tablaPrincipal.createTHead();
  const filaEncabezadoPrincipal = encabezadoPrincipal.insertRow();
  const encabezadoBloquePrincipal = filaEncabezadoPrincipal.insertCell(0);
  const encabezadoRegistrosPrincipal = filaEncabezadoPrincipal.insertCell(1);
  encabezadoBloquePrincipal.textContent = 'Bloque';
  encabezadoRegistrosPrincipal.textContent = 'Registros';

  
  for(let j =0; j <estructuraPrincipal.capacidadBloque; j++){

  }

  const cuerpoPrincipal = tablaPrincipal.createTBody();
  for (let i = 0; i < estructuraPrincipal.cantidadBloques; i++) {
    const fila = cuerpoPrincipal.insertRow();
    const celdaBloque = fila.insertCell(0);
    const celdaRegistros = fila.insertCell(1);
    celdaBloque.textContent = i + 1;
    celdaRegistros.textContent = "";
    celdaRegistros.appendChild(generarTablaConNFilas(estructuraPrincipal.capacidadBloque))

  }

  // Crear tabla para estructuraIndices
  const tablaIndices = document.createElement('table');
  tablaIndices.innerHTML = '<caption>Estructura de Índices</caption>';
  const encabezadoIndices = tablaIndices.createTHead();
  const filaEncabezadoIndices = encabezadoIndices.insertRow();
  const encabezadoBloqueIndices = filaEncabezadoIndices.insertCell(0);
  const encabezadoRegistrosIndices = filaEncabezadoIndices.insertCell(1);
  encabezadoBloqueIndices.textContent = 'Bloque';
  encabezadoRegistrosIndices.textContent = 'Registros';

  const cuerpoIndices = tablaIndices.createTBody();
  for (let i = 0; i < estructuraIndices.cantidadBloqueIndice; i++) {
    const fila = cuerpoIndices.insertRow();
    const celdaBloque = fila.insertCell(0);
    const celdaRegistros = fila.insertCell();
    
    celdaBloque.textContent = i + 1;
   // celdaRegistros.textContent = estructuraIndices.capacidadBloqueIndice;
   celdaRegistros.textContent = ""
   celdaRegistros.appendChild(generarTablaConNFilas(estructuraIndices.capacidadBloqueIndice))
  }

  // Limpiar el contenido anterior y agregar las tablas al panelEstructura
  tablaIndices.classList.add("tabla")
  tablaPrincipal.classList.add("tabla")
  panelEstructura.innerHTML = '';
  panelEstructura.appendChild(tablaIndices);
  panelEstructura.appendChild(tablaPrincipal);
 
}


function graficarEstructuraMulti(estructuraPrincipal, estructurasIndices, panelEstructura) {


  // Crear tabla para estructuraPrincipal
  const tablaPrincipal = document.createElement('table');
  tablaPrincipal.innerHTML = '<caption>Estructura Principal</caption>';
  const encabezadoPrincipal = tablaPrincipal.createTHead();
  const filaEncabezadoPrincipal = encabezadoPrincipal.insertRow();
  const encabezadoBloquePrincipal = filaEncabezadoPrincipal.insertCell(0);
  const encabezadoRegistrosPrincipal = filaEncabezadoPrincipal.insertCell(1);
  encabezadoBloquePrincipal.textContent = 'Bloque';
  encabezadoRegistrosPrincipal.textContent = 'Registros';

  
  

  const cuerpoPrincipal = tablaPrincipal.createTBody();
  for (let i = 0; i < estructuraPrincipal.cantidadBloques; i++) {
    const fila = cuerpoPrincipal.insertRow();
    const celdaBloque = fila.insertCell(0);
    const celdaRegistros = fila.insertCell(1);
    celdaBloque.textContent = i + 1;
    celdaRegistros.textContent = "";
    celdaRegistros.appendChild(generarTablaConNFilas(estructuraPrincipal.capacidadBloque))

  }
  
  tablaPrincipal.classList.add("tabla")
  panelEstructura.innerHTML = '';
  
  // Crear tabla para estructuraIndices
  estructurasIndices.reverse().forEach((estructura,i) => {
    const tablaIndices = document.createElement('table');
  tablaIndices.innerHTML = '<caption>Estructura de Índices</caption>';
  const encabezadoIndices = tablaIndices.createTHead();
  const filaEncabezadoIndices = encabezadoIndices.insertRow();
  const encabezadoBloqueIndices = filaEncabezadoIndices.insertCell(0);
  const encabezadoRegistrosIndices = filaEncabezadoIndices.insertCell(1);
  encabezadoBloqueIndices.textContent = 'Bloque';
  encabezadoRegistrosIndices.textContent = 'Registros';

  const cuerpoIndices = tablaIndices.createTBody();
  for (let i = 0; i < estructura.cantidadBloqueIndice; i++) {
    const fila = cuerpoIndices.insertRow();
    const celdaBloque = fila.insertCell(0);
    const celdaRegistros = fila.insertCell();
    
    celdaBloque.textContent = i + 1;
   // celdaRegistros.textContent = estructuraIndices.capacidadBloqueIndice;
   celdaRegistros.textContent = ""
   celdaRegistros.appendChild(generarTablaConNFilas(estructura.capacidadBloqueIndice))
  }
  panelEstructura.appendChild(tablaIndices);
  tablaIndices.classList.add("tabla")
 
  })

  // Limpiar el contenido anterior y agregar las tablas al panelEstructura
  panelEstructura.appendChild(tablaPrincipal);
 
}

function crearEstructuraIndicesSecundarios( registros,
  longitudRegistro,
  capacidadBloque,
  longitudRegistroIndicej){
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
  
  const estructuraIndices2 = {}
  estructuraIndices2.cantidadBloqueIndice = Math.ceil(
    estructuraDatos.cantidadRegistro/estructuraIndices.capacidadBloqueIndice
  )
  estructuraIndices2.capacidadBloqueIndice = estructuraIndices.capacidadBloqueIndice;
  
  
  let complejidadBusqueda = Math.ceil(logBaseN(estructuraIndices2.cantidadBloqueIndice ,2))+1
  console.log(estructuraDatos, estructuraIndices2);
  //complejidad de búsqueda??'
  return {estructuraDatos, estructuraIndices2,complejidadBusqueda};

}

function crearEstructuraMultinivelSecundarios(
  registros,
  longitudRegistro,
  capacidadBloque,
  longitudRegistroIndice
){
  const estructuraDatos = {};
  estructuraDatos.cantidadRegistro = registros;
  estructuraDatos.capacidadBloque = Math.floor(
    capacidadBloque / longitudRegistro
  );
  estructuraDatos.cantidadBloques = Math.ceil(
    registros / Math.floor(capacidadBloque / longitudRegistro)
  );

  /* indices */
  const estructurasIndices = [];
  const estructuraIndices = {};
  estructuraIndices.capacidadBloqueIndice = Math.floor(
    capacidadBloque / longitudRegistroIndice
  );
  estructuraIndices.cantidadBloqueIndice = Math.ceil(
    estructuraDatos.cantidadBloques /
      Math.floor(capacidadBloque / longitudRegistroIndice)
  );
  let capacidadBloqueIndice = estructuraIndices.capacidadBloqueIndice;
  let cantidadBloqueIndice = Math.ceil(
    estructuraDatos.cantidadRegistro/estructuraIndices.capacidadBloqueIndice
  )
  const estructuraIndices2 = {}
  estructuraIndices2.capacidadBloqueIndice = capacidadBloqueIndice;
  estructuraIndices2.cantidadBloqueIndice = cantidadBloqueIndice;
  estructuraIndices2.cantidadRegistroIndice = estructuraDatos.cantidadBloques;

  estructurasIndices.push(estructuraIndices2);

  while (cantidadBloqueIndice > 1) {
    const estructuraIndices3 = {};
    estructuraIndices3.cantidadRegistroIndice = cantidadBloqueIndice;
    cantidadBloqueIndice = Math.ceil(
      cantidadBloqueIndice / capacidadBloqueIndice
    );
    
    estructuraIndices3.cantidadBloqueIndice = cantidadBloqueIndice;
    estructuraIndices3.capacidadBloqueIndice = capacidadBloqueIndice; //estructurasIndices[estructurasIndices.length-1].cantidadBloqueIndice
    
     //estructurasIndices[estructurasIndices.length-1].capacidadBloqueIndice

    estructurasIndices.push(estructuraIndices3);
    console.log(cantidadBloqueIndice);
    console.log(estructurasIndices);
  }
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
        const estructura= crearEstructuraIndicesPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
        graficarEstructura(estructura.estructuraDatos, estructura.estructuraIndices, $panelEstructura) 
      }
      if ($tipoEstructura.value == "indices-multinivel-primarios") {
        const estructura = crearEstructuraMultinivelPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
        graficarEstructuraMulti(estructura.estructuraDatos, estructura.estructurasIndices, $panelEstructura)
      }

      if($tipoEstructura.value == "indices-secundarios"){
        const estructura = crearEstructuraIndicesSecundarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
          )
          graficarEstructura(estructura.estructuraDatos, estructura.estructuraIndices2, $panelEstructura)
      }
      if($tipoEstructura.value == "indices-multinivel-secundarios"){
        const estructura = crearEstructuraMultinivelSecundarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        )
        graficarEstructuraMulti(estructura.estructuraDatos, estructura.estructurasIndices, $panelEstructura)
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
      if ($tipoEstructura.value == "indices-multinivel-secundarios") {
        const estructuraMultinivelSecundarios = crearEstructuraMultinivelPrimarios(
          registros,
          longitudRegistro,
          capacidadBloque,
          longitudRegistroIndice
        );
        accesosEstructuraMultinivelPrimarios($panelResultadoBusqueda, estructuraMultinivelSecundarios);
      }
    }
  });
});
