const $d = document,
      $listaProductos = $d.querySelector("#lista-productos"),
      $bodyCarrito=$d.querySelector("#body-carrito")

const urlProductos="http://localhost:3000/productos",
      urlCarrito = "http://localhost:3000/carritos",
      carritos = [],
      productos=[]

function ajax(options){
    const {url,method,fsuccess,ferror,data} = options

    fetch(url,{
        method: method || "GET",
        headers:{
            "Content-type": "application/json;charset=utf-8"
        },
        body:JSON.stringify(data)
    })
    .then(resp=>resp.ok?resp.json():Promise.reject(resp))
    .then(json=>fsuccess(json))
    .catch(error=>ferror(error))
}

function getData(){
    Promise.all([fetch(urlProductos),fetch(urlCarrito)])
    .then(resps=>Promise.all(resps.map(resp=>(resp.ok)?resp.json():Promise.reject(resp))))
    .then(([prods,carr])=>{
        carritos.splice(0,carritos.length,...carr)
        productos.splice(0,productos.length,...prods)
        renderProductos(prods)
        renderCarrito(carr,prods)
    })
    .catch(error=>console.log(error))
}

function renderProductos(productos){
    $listaProductos.innerHTML=productos.reduce((anterior,actual)=>anterior+`
        <div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center">
            <div class="card">
                <img src="${actual.thumbnailUrl}" class="card-img-top" alt="item-producto">
                <div class="card-body">
                    <h5 class="card-title">${actual.title}</h5>
                    <p class="card-text">${actual.precio}&euro;</p>
                    <a href="#" class="btn btn-dark" data-id="${actual.id}">Comprar</a>
                </div>
            </div>
        </div>
    `,'')
}

function renderCarrito(carritos,productos){
    if(carritos.length>0){
        $bodyCarrito.innerHTML = carritos.reduce((anterior,actual,i)=>{
        const producto = productos.find(el=>el.id==actual.productoId)
    
        return anterior+`
            <tr>
              <td>${i+1}</td>
              <td>${producto.title}</td>
              <td>${actual.cantidad}</td>
              <td>
                  <button class="btn btn-info btn-sm" data-id="${actual.id}">
                      +
                  </button>
                  <button class="btn btn-danger btn-sm" data-id="${actual.id}">
                      -
                  </button>
              </td>
              <td></td>
            </tr>
        `},'')
    }
}

function add(id){
    ajax({
        url:urlCarrito,
        method:"POST",
        fsuccess:json=>{
            carritos.push(json)
            renderCarrito(carritos,productos)
        },
        ferror:error=>console.log(error),
        data:{
            cantidad:1,
            productoId:id
        }
    })
}

function editarCantidad(carrito,cantidad){
    ajax({
        url:`${urlCarrito}/${carrito.id}`,
        method:"PATCH",
        fsuccess:()=>{
            getData()
        },
        ferror:error=>console.log(error),
        data:{
            cantidad:carrito.cantidad+cantidad
        }
    })
}

function delCarrito(carrito){
    ajax({
        url:`${urlCarrito}/${carrito.id}`,
        method: "DELETE",
        fsuccess:json=>{
            const prod = carritos.findIndex(el=>el.id==json.id)
            carritos.splice(prod,1)
            renderCarrito(carritos,productos)
        },
        ferror:error=>console.log(error)
    })
}

$listaProductos.addEventListener("click",ev=>{
    ev.preventDefault()

    const id = ev.target.dataset.id
    const producto = carritos.find(el=>el.productoId==id)
    if(id){
        if(producto)
            editarCantidad()
        else
            add(id)
    }
})

$bodyCarrito.addEventListener("click",ev=>{
    ev.preventDefault()

    const id = ev.target.dataset.id
    const carrito = carritos.find(el=>el.id==id)
    if(id){
        if(ev.target.classList.contains("btn-info"))
            editarCantidad(carrito,1)
        else if(ev.target.classList.contains("btn-danger")){
            if(carrito.cantidad>1)
                editarCantidad(carrito,-1)
            else 
                delCarrito(carrito)
        }
    }
})

$d.addEventListener("DOMContentLoaded",getData)
