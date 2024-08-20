function addToCart(product) {
  var cart = JSON.parse(localStorage.getItem("carrito")) || [];

  cart.push(product);

  localStorage.setItem("carrito", JSON.stringify(cart));

  alert("Producto añadido al carrito");
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/productos.json")
    .then((response) => response.json())
    .then((data) => {
      const cardContainer = document.querySelector(".container-card");
      data.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="box box1">
                    <img src="${product.img}" alt="${product.alt}">
                    <div class="referencia">${product.referencia}</div>
            </div>
            <div class="box box2">
                <div class="content">
                    <div class="precio">${product.precio}</div>
                    <div class="comprar">
                    <button class="btncr" data-product='${JSON.stringify(product)}'>Agregar al carrito</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);
      });
      document.querySelectorAll(".btncr").forEach(button => {
        button.addEventListener("click", function () {
            const product = JSON.parse(this.getAttribute('data-product'));
            addToCart(product); 
          });
    })
    .catch((error) => console.error("Error al cargar los productos:", error));
})
});

document.addEventListener("DOMContentLoaded", function () {
  const containercard = document.getElementById('container-cart');
  const cart = JSON.parse(localStorage.getItem("carrito")) || [];

  if (cart.length === 0) {
      containercard.innerHTML = "<h1>Tu carrito está vacío.<h1>";
      return;
  }

cart.forEach(product , function (){
      const cart = document.createElement('div');
      cart.className = 'cart';

      cart.innerHTML = `
      <div class="box box1">
              <img src="${product.img}" alt="${product.alt}">
              <div class="referencia">${product.referencia}</div>
      </div>
      <div class="box box2">
          <div class="content">
              <div class="precio">${product.precio}</div>
              <div class="comprar">
              <button class="btncr" data-product='${JSON.stringify(product)}'>Agregar al carrito</button>
          </div>
      </div>
  `;
      containercard.appendChild(cart);
  });
});
