const $d = document,
      $selectCiclos = $d.querySelector("#ciclos"),
      $main = $d.querySelector("main")

const urlCiclos = "http://localhost:3000/ciclos",
      urlAlumnos = "http://localhost:3000/alumnos",
      ciclos = [],
      alumnos = []

function ajax(options){
    const {url,method,fsuccess,ferror,data} = options

    fetch(url,{
        method: method || "GET",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    .then(resp=>resp.ok?resp.json():Promise.reject(resp))
    .then(json=>fsuccess(json))
    .catch(error=>ferror(error))
}

function getCiclos(){
    ajax({
        url:urlCiclos,
        fsuccess:json=>{
            ciclos.splice(0,ciclos.length,...json)
            renderCiclos(ciclos)
        },
        ferror:error=>console.log(error)
    })
}

function getAlumnos(cicloId){
    ajax({
        url:urlAlumnos,
        fsuccess:json=>{
            alumnos.splice(0,alumnos.length,...json)
            const alumnosCiclo = alumnos.filter(el=>el.ciclo==cicloId)
            renderAlumnos(alumnosCiclo)
        },
        ferror:error=>console.log(error)        
    })
}

function addAlumnos(alumno){
    ajax({
        url:urlAlumnos,
        method:"POST",
        fsuccess:()=>{
            getAlumnos($selectCiclos.value)
        },
        ferror:error=>console.log(error),
        data: {
            nombre: alumno.nombre,
            nif: alumno.nif,
            proyecto: alumno.proyecto,
            ciclo: alumno.ciclo,
            fecha: alumno.fecha,
            hora: alumno.hora
        }
        
    })
}

function editAlumnos(alumno,id){
    ajax({
        url:`${urlAlumnos}/${id}`,
        method: "PATCH",
        fsuccess: ()=>{
            getAlumnos($selectCiclos.value)
        },
        ferror:error=>console.log(error),
        data:{
            nombre: alumno.nombre,
            nif: alumno.nif,
            proyecto: alumno.proyecto,
            ciclo: alumno.ciclo,
            fecha: alumno.fecha,
            hora: alumno.hora
        }
    })
}

function delAlumno(alumnoId){
    ajax({
        url:`${urlAlumnos}/${alumnoId}`,
        method: "DELETE",
        fsuccess:json=>{
            getAlumnos($selectCiclos.value)
        },
        ferror:error=>console.log(error)
    })
}

function crearListadoDatos(){
    $listadoDatos = $main.querySelector("#listado-datos") || null

    if(!$listadoDatos){
        $div = $d.createElement("div")
        $div.id = "listado-datos"
    
        $main.appendChild($div)
    }
}

function renderAlumnos(alumnos){
    crearListadoDatos()
    $listadoDatos = $main.querySelector("#listado-datos")

    $listadoDatos.innerHTML = `
        <div id="body-datos">
            <div id="tabla-datos">
                <div class="item" id="td-cabecera">
                    <p>Nombre</p>
                    <p>Accion</p>
                </div>
                <div id="td-body"></div>
            </div>
        </div>
        <div class="pie" id="td-pie">
            <a href="" id="btn-proyecto" class="boton">Añadir Proyecto</a>
        </div>
    `

    $tdBody = $listadoDatos.querySelector("#td-body")

    $tdBody.innerHTML = alumnos.reduce((anterior,actual)=>anterior+`
        <div class="item">
            <p>${actual.nombre}</p>
            <div class="bt-acciones">
                <i class="fas fa-undo-alt" data-id="${actual.id}"></i>
                <i class="fa fa-trash" aria-hidden="true" data-id="${actual.id}"></i>
            </div> 
        </div>
    `,'')
}

function renderCiclos(ciclos){
    $selectCiclos.innerHTML=`<option value="0">Elegir curso</option>`
    $selectCiclos.innerHTML+=ciclos.reduce((anterior,actual)=>anterior+`
        <option value="${actual.id}">${actual.ciclo}</option>
    `,'')
}

function createForm(accion,id){
    $acciones = $main.querySelector("#acciones") || null
    id = id || null

    if(!$acciones){
        $div = $d.createElement("div")
        $div.id = "acciones"

        $main.appendChild($div)

        $div.innerHTML = `
            <h2><span>${(accion=="add")?"Añadir":"Actualizar"}</span> Datos del Proyecto</h2>
            <form action="" id="form-acciones">
                <p>
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" size="40" class="completo campo">
                </p>
                <p>
                    <label for="nif">NIF</label>
                    <input type="text" name="NIF" id="nif" size="10" class="completo campo">
                </p>
                <p class="full-row">
                    <label for="proyecto">Titulo del Proyecto</label>
                    <input type="text" name="proyecto" id="proyecto" class="completo campo">
                </p>
                <p>
                    <label for="fecha">Fecha de Presentación</label>
                    <input type="date" name="fecha" id="fecha" class="campo">
                </p>
                <p>
                    <label for="hora">Hora de Presentación</label>
                    <input type="time" name="hora" id="hora" class="campo">
                </p>
                <div class="pie full-row">
                    <input class="boton" type="button" id="btn-enviar" value=${(accion=="add")?"Añadir":"Actualizar"} ${(id)?`data-id=${id}`:""}>
                    <input class="boton" type="button" id="btn-cancelar" value="Cancelar">
                </div>
            </form>
        `

        if(accion=="edit")
            modoEdicion(id)
    }
}

function modoEdicion(id){
    const $form = $d.querySelector("#form-acciones"),
          [$inputNombre, $inputNif,$inputProyecto,$inputFecha,$inputHora] = $form.querySelectorAll("input")

    const proyecto = alumnos.find(el=>el.id==id)

    $inputNombre.value = proyecto.nombre
    $inputNif.value = proyecto.nif
    $inputProyecto.value = proyecto.proyecto
    $inputFecha.value = proyecto.fecha
    $inputHora.value = proyecto.hora
}

function delForm(){
    $acciones = $d.querySelector("#acciones")
    $main.removeChild($acciones)
}

$selectCiclos.addEventListener("change",ev=>{
    const cicloId = $selectCiclos.value
    if(cicloId==0){
        $listadoDatos = $main.querySelector("#listado-datos") || null
        if($listadoDatos)
            $main.removeChild($listadoDatos)
    } else
        getAlumnos($selectCiclos.value)
})

$main.addEventListener("click",ev=>{
    ev.preventDefault()

    if(ev.target.dataset.id)
        proyectoId=ev.target.dataset.id        

    switch(true){
        case ev.target.classList.contains("fa-trash"):
            delAlumno(proyectoId)
        break;

        case ev.target.classList.contains("fa-undo-alt"):
            createForm("edit",proyectoId)
        break;

        case ev.target.id=="btn-proyecto":
            createForm("add")
        break;

        case ev.target.id=="btn-enviar":
            const [$inputNombre, $inputNif,$inputProyecto,$inputFecha,$inputHora] = $d.querySelectorAll("input"),
            alumno = {
                    nombre: $inputNombre.value,
                    nif: $inputNif.value,
                    proyecto: $inputProyecto.value,
                    ciclo: $selectCiclos.value,
                    fecha: $inputFecha.value,
                    hora: $inputHora.value
                }

            if(ev.target.dataset.id)
                editAlumnos(alumno,ev.target.dataset.id)
            else
                addAlumnos(alumno)

            delForm()
        break;

        case ev.target.id=="btn-cancelar":
            delForm()
        break;
    }
})

$d.addEventListener("DOMContentLoaded",getCiclos)