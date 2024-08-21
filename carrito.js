document.addEventListener("DOMContentLoaded", function () {
    const containercard = document.getElementById("container-card");
    const btnbuy =  document.getElementById("btncmprtd")

    function cargarcarrito(){
        containercard.innerHTML = ""
        const card = JSON.parse(localStorage.getItem("carrito")) || [];
     if (card.length === 0) {
         containercard.innerHTML = "<h1>Tu carrito está vacío.<h1>";
         return;
        }
        
        card.forEach(product =>{
            console.log("ENTRA")
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
            <div class="box box1">
            <img src="${product.img}" alt="${product.alt}">
            <div class="referencia">${product.referencia}</div>
            </div>
            <div class="box box2">
            <div class="content">
            <div class="precio">${product.precio}</div>
            <div class="comprar">
            <button class="btn" id="btnel" data-product='${JSON.stringify(product)}'>eliminar</button>
            <button class="btn" id="btncm" data-product='${JSON.stringify(product)}'>Comprar</button>
            
            </div>
            </div>
            `;
            const removeButton = card.querySelector('#btnel');
            removeButton.addEventListener('click', () => {
                removeItemFromcard(product.referencia);
            });
            containercard.appendChild(card);
        });
    } 

    function removeItemFromcard(referencia){
        let card = JSON.parse(localStorage.getItem("card")) || [];
        card = card.filter ( card => card.referencia !== referencia)
        localStorage.setItem("carrito", JSON.stringify(card));
        cargarcarrito();
    }
    function comprar(){
        alert("Compra realizada con éxito.")
        localStorage.removeItem("carrito");
        cargarcarrito()
    }  
    btnbuy.addEventListener("click", comprar);
    cargarcarrito();
    })