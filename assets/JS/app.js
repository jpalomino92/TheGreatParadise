document.addEventListener("DOMContentLoaded", (e) => {
    obtenerProductos();
  });

const listaProductos = $("#conteinerProducts");
let productArray = {};
let pName = "";
let pPrice = 0;
let quantity = 0;


/*
class Products{
    constructor(id,pName,price,cantidad){
        this.id = id;
        this.name = pName;
        this.price = price;
        this.cantidad = cantidad;
    }

}
*/

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
            quantity = quantity + 1;
            document.getElementById("cart-items").innerHTML= quantity;
            const producto = data.find(item => item.id === parseInt(btn.dataset.id));
            producto.cantidad = 1;
            if (productArray.hasOwnProperty(producto.id)){
                producto.cantidad = productArray[producto.id].cantidad + 1;                
            }
            productArray[producto.id] = {...producto };
            createCart();


            /*
            pName = document.getElementsByClassName('nameProduct');
            pPrice = document.getElementsByClassName('.priceProduct');
            productArray.push(new Products(pName.innerHTML,pPrice.innerHTML));
            localStorage.setItem("products",JSON.stringify(productArray));
            */

        });

    });
}
 /* desde aca es la cosa del kart*/
/*
$('.nav-icon').click(function (e) { 
    createCart();    
});
*/

const items = document.querySelector('#items');

const createCart = () => {

    items.innerHTML =''


    const template = document.querySelector('#template-carrito').content;
    const fragment = document.createDocumentFragment();

    Object.values(productArray).forEach(producto => {
        template.querySelector('th').textContent = producto.id;
        template.querySelectorAll('td')[0].textContent = producto.title;
        template.querySelectorAll('td')[1].textContent = producto.cantidad;
        template.querySelector('span').textContent = producto.precio * producto.cantidad;

        template.querySelector('.btn-info').dataset.id = producto.id;
        template.querySelector('.btn-danger').dataset.id = producto.id;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    
    })

    items.appendChild(fragment)
    pintarFooter();
    accionBotones();
    
}

const footer = document.querySelector('#footer-carrito');
const pintarFooter = () => {
    footer.innerHTML ='';

    if (Object.keys(productArray).length === 0){
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío!</th>';
        return;
    }

    const template = document.querySelector('#template-footer').content;
    const fragment = document.createDocumentFragment();

    const nCantidad = Object.values(productArray).reduce((acc,{cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(productArray).reduce((acc,{cantidad,precio}) => acc + cantidad * precio,0)

    template.querySelectorAll('td')[0].textContent = nCantidad;
    template.querySelector('span').textContent = nPrecio;

    const clone =template.cloneNode(true);
    fragment.appendChild(clone);    
    footer.appendChild(fragment);

    const boton = document.querySelector('#vaciar-carrito');
    boton.addEventListener('click', () => {
        productArray = {};
        createCart()
    })


}


const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info');
    const botonesEliminar = document.querySelectorAll('#items .btn-danger');

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () =>{
            const producto = productArray[btn.dataset.id];
            producto.cantidad ++;
            productArray[btn.dataset.id] = {...producto};
            createCart();
            
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () =>{
            const producto = productArray[btn.dataset.id];
            producto.cantidad --;
            if (producto.cantidad === 0){
                delete productArray[btn.dataset.id];
            } else {
                productArray[btn.dataset.id] = {...producto}
            };

            createCart();

        
            document.getElementById("cart-items").innerHTML = 0;
            
            
        });
    });
};







/*
const buttonClear = document.getElementById('buttonClear');

buttonClear.addEventListener('click',function(){
    document.getElementById("cart-items").innerHTML= 0;
    quantity= 0;


})



const buttonEmpty= document.getElementById('buttonEmpty');

buttonEmpty.addEventListener('click',function(){
    var list = document.getElementById("productList");
    while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
    };
    localStorage.clear();

*/