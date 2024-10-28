const btnCart = document.querySelector('.container-icon')

const containeCartProducts = document.querySelector(".container-cart-products")

btnCart.addEventListener("click", () => {
    containeCartProducts.classList.toggle('hidden-cart')
})