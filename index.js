document.addEventListener("DOMContentLoaded", function () {
  let productos = [];

  fetch("/productos.json")
    .then((response) => response.json())
    .then((data) => {
      productos = data;
      renderProductos(productos);
    })
    .catch((error) => console.error("Error al cargar los productos:", error));

  function renderProductos(productosFiltrados) {
    const cardContainer = document.querySelector(".container-card");
    cardContainer.innerHTML = '';

    productosFiltrados.forEach((product) => {
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
        </div>
      `;

      cardContainer.appendChild(card);
    });

    document.querySelectorAll(".btncr").forEach((button) => {
      button.addEventListener("click", function () {
        const product = JSON.parse(this.getAttribute("data-product"));
        addToCart(product);
      });
    });
  }
  document
  .querySelectorAll(".btncr")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const product = JSON.parse(this.getAttribute("data-product"));
      addToCart(product);
    });
  })

  const searchInput = document.getElementById("product-search");
  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();

    const productosFiltrados = productos.filter((product) =>
      product.referencia.toLowerCase().includes(searchTerm)
    );

    renderProductos(productosFiltrados);
  });
});
function addToCart(product) {
  var cart = JSON.parse(localStorage.getItem("carrito")) || [];

  cart.push(product);

  localStorage.setItem("carrito", JSON.stringify(cart));

  alert("Producto añadido al carrito");
}