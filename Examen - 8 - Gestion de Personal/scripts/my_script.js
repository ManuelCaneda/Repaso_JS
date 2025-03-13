const capitalize=(cadena)=>cadena.toLowerCase().split(' ').map(el=>el.trim()).filter(el=>el!="").map(el=>el[0].toUpperCase()+el.slice(1)).join(' ')
const ascSort=(vect,campo)=> vect.sort((u1,u2)=>u1[campo].localeCompare(u2[campo]))
const descSort=(vect,campo)=> ascSort(vect,campo).reverse()

const $d = document,
      $tbody = $d.querySelector("tbody"),
      $tfoot = $d.querySelector("tfoot"),
      $form = $d.querySelector("form"),
      $inputs = [$inputNombre,$inputApellidos,$inputNif,$inputEmail,$inputSearch] = $d.querySelectorAll("input"),
      $selectFiltro = $d.querySelector("select"),
      $btn = $d.querySelector("button"),
      $thead = $d.querySelector("thead")

const usuarios = [],
      urlUsuarios = "http://localhost:3000/usuarios"

let orden = "asc"

function ajax(options){
  const {url,method,fsuccess,ferror,data} = options

  fetch(url,{
    method: method || "GET",
    headers:{
      "Content-type":"application/json;charset=utf-8"
    },
    body:JSON.stringify(data)
  })
  .then(resp=>resp.ok?resp.json():Promise.reject(resp))
  .then(json=>fsuccess(json))
  .catch(error=>ferror(error))
}

function getUsuarios(usuarios){
  ajax({
    url:urlUsuarios,
    fsuccess:json=>{
      usuarios.splice(0,usuarios.length,...json)
      ordenarCampos("apellidos")
    },
    ferror:error=>console.log(error)
  })
}

function addUsuario(usuario){
  ajax({
    url:urlUsuarios,
    method:"POST",
    fsuccess:json=>{
      usuarios.push(json)
      renderUsuarios(usuarios)
    },
    ferror:error=>console.log(error),
    data:{
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      nif: usuario.nif,
      email: usuario.email
    }
  })
}

function editUsuario(usuario,id){
  ajax({
    url:`${urlUsuarios}/${id}`,
    method:"PATCH",
    fsuccess:()=>{
      const usuarioEditado = usuarios.find(el=>el.id==id)
      usuarioEditado.nombre = usuario.nombre
      usuarioEditado.apellidos = usuario.apellidos
      usuarioEditado.nif = usuario.nif
      usuarioEditado.email = usuario.email

      renderUsuarios(usuarios)
    },
    ferror:error=>console.log(error),
    data:{
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      nif: usuario.nif,
      email: usuario.email
    }
  })
}

function delUsuarios(usuarioId){
  ajax({
    url:`${urlUsuarios}/${usuarioId}`,
    method: "DELETE",
    fsuccess:()=>{
      const usuarioIndex = usuarios.findIndex(el=>el.id==usuarioId)
      usuarios.splice(usuarioIndex,1)
      renderUsuarios(usuarios)
    },
    ferror:error=>console.log(error)
  })
}

function renderUsuarios(usuarios){
  $tbody.innerHTML = usuarios.reduce((anterior,actual)=>anterior+`
    <tr>
      <td scope="col">
        <i class="fas fa-undo-alt" data-id="${actual.id}"></i>
        <i class="fa fa-trash" aria-hidden="true" data-id="${actual.id}"></i>
      </td>
      <td scope="col" width="10%">${actual.nombre}</td>
      <td scope="col">${actual.apellidos}</td>
      <td scope="col">${actual.nif}</td>
      <td scope="col">${actual.email}</td>
    </tr>
  `,'')

  renderFooter(usuarios)
}

function renderFooter(usuarios){
  if(usuarios.length>0){
    $tfoot.innerHTML = `
      <tr>
        <td colspan="4">Total de Registros: </td>
        <td>${usuarios.length}</td>
      </tr>
    `
  } else {
    $tfoot.innerHTML = "<tr><td colspan='5'>No hay personal (con esos criterios)</td></tr>"
  }
}

function modoEdicion(editar,id){
  id = id || null
  const usuario = usuarios.find(el=>el.id == id)
  
  if(editar){
    $inputNombre.value=usuario.nombre
    $inputApellidos.value=usuario.apellidos
    $inputNif.value=usuario.nif
    $inputEmail.value=usuario.email
  
    $inputSearch.disabled=true
    $selectFiltro.disabled = true

    $btn.dataset.id = id
    $btn.textContent = capitalize("Actualizar usuario")
  } else {
    $form.reset()
    $inputSearch.disabled=false
    $selectFiltro.disabled=false
    $btn.textContent = capitalize("Añadir usuario")
    $inputSearch.value=""
    delete($btn.dataset.id)
  }
}

function ordenarCampos(campoOrden){
  const $tr = $thead.querySelector("tr")

    $tr.innerHTML = `
      <th scope="col">Acciones</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellidos</th>
      <th scope="col">NIF</th>
      <th scope="col">Email</th>
    `
  const $celdas = $tr.querySelectorAll("th")

  const imagen = (orden=="asc")?"asc.svg":"dsc.svg"

  $celdas.forEach(el=>{
    if(el.textContent.toLowerCase()==campoOrden.toLowerCase()){
      el.classList.add("cabecera--ordenado")
      el.innerHTML = `
      <span>${el.textContent}</span>
      <span class="ordenar">
      <img src="./img/${imagen}" id="order" class="ordenar__icon" alt="">
      </span>
      `
    }
  })
  
  const ordenCorrecto=(orden=="asc")?ascSort(usuarios,campoOrden):descSort(usuarios,campoOrden)

  renderUsuarios(ordenCorrecto)
}

function filtrar(){
  const campo = $selectFiltro.value
  const usuariosBuscados = usuarios.filter(el=>el[campo].toLowerCase().includes($inputSearch.value.toLowerCase()))
  renderUsuarios(usuariosBuscados)
}

$tbody.addEventListener("click",ev=>{
  ev.preventDefault()

  const id = ev.target.dataset.id
  if(id && !$btn.dataset.id){
    if(ev.target.classList.contains("fa-trash")){
      delUsuarios(id)
    } else if(ev.target.classList.contains("fa-undo-alt")){
      modoEdicion(true,id)
    }
  }
})

$btn.addEventListener("click",ev=>{
  ev.preventDefault()

  const usuario = {
    nombre: $inputNombre.value,
    apellidos: $inputApellidos.value,
    nif: $inputNif.value,
    email: $inputEmail.value
  }

  if($btn.dataset.id){
    editUsuario(usuario,$btn.dataset.id)
  } else {
    addUsuario(usuario)
  }

  modoEdicion(false)
})

$inputSearch.addEventListener("keyup",ev=>{
  filtrar()
})

$selectFiltro.addEventListener("change",ev=>{
  filtrar()
})

$thead.addEventListener("click",ev=>{
  if(ev.target.classList.contains("ordenar__icon"))
    orden = (orden=="asc")?"dsc":"asc"

  switch(ev.target.textContent){
      case "Nombre":
        campoOrden="nombre"
      break;
  
      case "Apellidos":
        campoOrden="apellidos"
      break;
  
      case "NIF":
        campoOrden="nif"
      break;
  
      case "Email":
        campoOrden="email"
      break;
    }

  if(campoOrden)
    ordenarCampos(campoOrden)
    
})

$d.addEventListener("DOMContentLoaded",ev=>getUsuarios(usuarios))