/*we create the variables and the arrays*/
/* products */
const product= [];
const price = [];
const productArray = [];
/*products */
let cantProducts = "";
let cuotas= 0;
let subTotal =0;
let iva=0;
let total=0;
let perMonth = 0;
/* customer */
let firstName = "";
let lastName = "";
let phone = "";
let email = "";
let address = "";

/*we create the class */
class User {
    constructor(name, lastName, phone, email , address){
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.address= address;
    }
    datos(){
        console.log("Hola "+ this.name);
        console.log("El paquete sera enviado a la direccion "+ this.address);
    }
}
class Products{
    constructor(pName,price){
        this.pName = pName;
        this.price = price;
    }

}
/*we create the functions*/
function monthlyPayments(months,total){
    return parseInt(total)/parseInt(months);
}

function sumSubTotals(prices){
    let i = 0;
    while(prices.length > i){
        subTotal = parseInt(subTotal) + parseInt(prices[i]);
        i++;
    }
}
function calcIva(monto){
    iva = parseInt(monto) * 0.21;
}

function calcTotal(ST,IV){
    total = parseInt(ST) + parseInt(IV);
}
/*we ask for the customer's information */
firstName = prompt("Por favor ingrese su nombre: ");
lastName = prompt ("Por favor ingrese su apellido: ");
email = prompt ("Por favor ingrese su email: ");
phone = prompt ("Por favor ingrese su telefono: ");
address = prompt ("Por favor ingrese su direccion: ");

/*we save the information in the object  */
const customer = new User(firstName,lastName,phone,email,address)


/* we ask for the first data for the arrays*/
let askProduct = prompt("ingrese un producto:");
let askPrice = parseInt(prompt ("ingrese el precio del producto:"));
product.push(askProduct);
price.push(parseInt(askPrice));
productArray.push(new Products(askProduct,askPrice));




/*we start the first while, to add all the products*/
while (confirm("Desea continuar? ")){
    askProduct = prompt("ingrese un producto:");
    askPrice = parseInt(prompt ("ingrese el precio del producto:"));
    product.push(askProduct);
    price.push(parseInt(askPrice));
    productArray.push(new Products(askProduct,askPrice));
};
/*we make the calculations using the functions */
cantProducts = parseInt(product.length);
cuotas= parseInt(prompt("En cuantas cuotas desea pagar? (3,6,9,12,18)"));

sumSubTotals(price);
calcIva(subTotal);
calcTotal(subTotal,iva);

perMonth = monthlyPayments(cuotas,total);

/*we print all the values */
customer.datos();
console.log("Vas a pagar en " + cuotas + " cuotas");
console.log("Vas a pagar por mes: $"+ perMonth);
console.log("Cantidad de productos: "+ cantProducts);
console.log("El subtotal es : $" + subTotal);
console.log("El valor con el IVA agregado es : $ "+ iva);
console.log("El total es de: $" + total);



