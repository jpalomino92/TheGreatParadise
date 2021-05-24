
$('.nav-icon').click(function (e) { 
    createCart();    
});


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

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    
    })

    items.appendChild(fragment)
    pintarFooter();
    accionBotones();
    
}

const footer = document.querySelector('#footer-carrito');
const pintarFooter = () => {
    const template = document.querySelector('#template-footer').content;
    const fragment = document.createDocumentFragment();
    const nCantidad = Object.values(productArray).reduce((acc,{cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(productArray).reduce((acc,{cantidad,precio}) => acc + cantidad * precio,0)



}


const accionBotones = () => {
    
}