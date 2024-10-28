const btnCart = document.querySelector('.container-cart-icon')

const containeCartProducts = document.querySelector(".container-cart-products")

btnCart.addEventListener("click", () => {
    containeCartProducts.classList.toggle('hidden-cart')
})

//############################################################33
const cartInfo = document.querySelector('.cart-product')