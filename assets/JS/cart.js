let productArray = {};

$(document).ready(function () {
    if(localStorage.getItem("savedItems")){
        productArray = JSON.parse(localStorage.getItem("savedItems"))
        createCart()
    }
});

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
        template.querySelector("img").setAttribute("src", producto.thumbnailUrl)
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
    localStorage.setItem("savedItems", JSON.stringify(productArray))

    
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
    document.getElementById("cart-items").innerHTML= nCantidad;
    localStorage.setItem('cartQuantity',nCantidad)

    const clone =template.cloneNode(true);
    fragment.appendChild(clone);    
    footer.appendChild(fragment);

    const boton = document.querySelector('#vaciar-carrito');
    boton.addEventListener('click', () => {
        productArray = {};
        createCart()
        localStorage.clear();
        document.getElementById("cart-items").innerHTML = 0;
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
                              
        });
    });
};




