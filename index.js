
let form = document.getElementById("form");
let tarjetaSelect = document.getElementById("tarjeta");
let btn = document.getElementById("btn-btc");
let priceText = document.getElementById("card-price");
let priceAdvice = document.getElementById("price-advice");

// Creacion clase - Tarjeta
class Tarjeta {
    constructor(id, marcaDeTarjeta, interes) {
        this.id = id;
        this.marcaDeTarjeta = marcaDeTarjeta;
        this.interes = interes;
    }
}

// Creacion tarjetas(objetos) con propiedades
let tarjetas = [];
let tarjetaVisa = new Tarjeta(1, "Visa", 1.34);
let tarjetaMaster = new Tarjeta(2, "Master", 1.45);
let tarjetaAmex = new Tarjeta(3, "AmericanExpress", 2.45);

// Push/agregar tarjetas al class (tarjetas)
tarjetas.push(tarjetaVisa);
tarjetas.push(tarjetaMaster);
tarjetas.push(tarjetaAmex);

// Creacion de optiones para el dropdown en el HTML/DOM
function generarOptionsForTarjeta() {
    tarjetas.forEach(tarjeta => {
        let optionTarjetas = `<option value=${tarjeta.id}>${tarjeta.marcaDeTarjeta}</option>`
        tarjetaSelect.innerHTML += optionTarjetas;    
    });
}

generarOptionsForTarjeta();

// Agregar evento que captura la info. del form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Anclaje de variable con el elemento en HTML
    const montoIngresado = document.getElementById("monto").value;
    const cuotasIngresadas = document.getElementById("cuotas").value;
    const tarjetaIngresada = document.getElementById("tarjeta").value;
    // Captura de ID/tarjeta seleccionada por el user en el DOM y la guarda en 'tarjetaSeleccionada'
    let tarjetaSeleccionada = tarjetas.find(tarjeta => tarjeta.id == tarjetaIngresada);
    let resultado = montoIngresado / cuotasIngresadas * tarjetaSeleccionada.interes;
    Swal.fire({
        title: "El valor de la cuota mensual es:" + resultado,
        confirmButtonText: 'OK'
    });
    // alert("El valor de la cuota mensual es: " + resultado)
});

// Event handler del botón que inicializa la funcion reqData
btn.addEventListener('click', reqData);

// Funcion que ejecuta el fetch request
function reqData(){
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    // Conversion del response a formato JSON
    .then((response) => {
        console.log(response);
        return response.json();
    }) 
    // Uso de la data en el DOM
    .then((data) => {
        console.log(data)
        priceText.innerHTML = "El precio actual del Bitcoin es " + JSON.stringify(data.bpi.USD.rate)
        if (data.bpi.USD.rate > "30,000,0000"){
            priceAdvice.innerHTML = "Se recomienda no invertir por ahora"
        }else{
            priceAdvice.innerHTML = "Se recomienda invertir ahora"
        }
    });
}

