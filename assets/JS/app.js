document.addEventListener("DOMContentLoaded", (e) => {
    obtenerProductos();
  });

$(document).ready(function () {
    if(localStorage.getItem("cartQuantity")){
        cartQuantity = parseInt(localStorage.getItem("cartQuantity"));
        document.getElementById("cart-items").innerHTML= parseInt(cartQuantity);
    }
});

const listaProductos = $("#conteinerProducts");
let productArray = {};
let pName = "";
let pPrice = 0;
let cartQuantity = 0;

$(document).ready(function () {
    if(localStorage.getItem("savedItems")){
        productArray = JSON.parse(localStorage.getItem("savedItems"))
        pintarCarrito()
    }
});




function obtenerProductos() {
    $.ajax({
        url: "productos.json",
        method: "GET",
        success: function pintarTemplate(data)  {
            const template = document.querySelector("#productsTemplate").content;
            const fragment = new DocumentFragment();
            
            data.forEach((producto) => {
                template.querySelector("img").setAttribute("src", producto.thumbnailUrl);
                template.querySelector(".nameProduct").innerHTML = producto.title;
                template.querySelector(".priceProduct").innerHTML = producto.precio;
                template.querySelector("button").setAttribute("data-id", producto.id);
                const clone = template.cloneNode(true);
                fragment.appendChild(clone);
                
         
            });
            $("#conteinerProducts").append(fragment);
            catchButtons(data);
            
          }
    });
}


const catchButtons = (data) => {
    const button = document.querySelectorAll('.buttonAdd');
 
    button.forEach(btn => { 
        btn.addEventListener('click',function (){
            
            const producto = data.find(item => item.id === parseInt(btn.dataset.id));
            producto.cantidad = 1;
            if (productArray.hasOwnProperty(producto.id)){
                producto.cantidad = productArray[producto.id].cantidad + 1;                
            }
            productArray[producto.id] = {...producto };
            cartQuantity= cartQuantity + 1 ;
            localStorage.setItem('cartQuantity',cartQuantity);
            document.getElementById("cart-items").innerHTML= cartQuantity;
            localStorage.setItem("savedItems", JSON.stringify(productArray));
        });

        

    });
}