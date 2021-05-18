document.addEventListener("DOMContentLoaded", (e) => {
    obtenerProductos();
  });

const listaProductos = $("#conteinerProducts");
let productArray = [];
let pName = "";
let pPrice = 0;


class Products{
    constructor(pName,price){
        this.name = pName;
        this.price = price;
    }

}

function obtenerProductos() {
    $.ajax({
        url: "productos.json",
        method: "GET",
        success: function pintarTemplate(data)  {
            const template = document.querySelector("#productsTemplate").content;
            const fragment = new DocumentFragment();
            data.forEach((producto) => {
                template.querySelector("img").setAttribute("src", producto.thumbnailUrl);
                template.querySelector("#nameProduct").innerHTML = producto.title;
                template.querySelector("#priceProduct").innerHTML = producto.precio;
                template.querySelector("button").setAttribute("data-id", producto.id);
                const clone = template.cloneNode(true);
                fragment.appendChild(clone);
         
            });
            $("#conteinerProducts").append(fragment);
          }
    });
}




















  
  let quantity = 0

$('#buttonAdd').click( function () {
    quantity = quantity + 1;
    document.getElementById("cart-items").innerHTML= quantity;
    pName = document.getElementById('nameProduct');
    pPrice = document.getElementById('priceProduct');
    productArray.push(new Products(pName.innerHTML,pPrice.innerHTML));
    localStorage.setItem("products",JSON.stringify(productArray));

    
});

/*
const buttonClear = document.getElementById('buttonClear');

buttonClear.addEventListener('click',function(){
    document.getElementById("cart-items").innerHTML= 0;
    quantity= 0;


})

const buttonShow = document.getElementById('buttonShow');

buttonShow.addEventListener('click',function(){
    for (const producto of productArray){
        let conteiner = document.createElement("div");
        conteiner.innerHTML= `
        <h3> Producto: ${producto.name}</h3>
        <b>$ ${producto.price}</b>`;
        document.getElementById("productList").appendChild(conteiner);
    }
    productArray = [];

})

const buttonEmpty= document.getElementById('buttonEmpty');

buttonEmpty.addEventListener('click',function(){
    var list = document.getElementById("productList");
    while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
    };
    localStorage.clear();

})*/


