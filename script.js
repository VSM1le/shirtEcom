const bar = document.getElementById('bar')
const closeBtn = document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}


// cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    // console.log(cartItemcontainer)
    var addToCartButtons = document.getElementsByClassName('fa-shopping-cart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    const count = cartItems.length;
    updateCartCount(count)
}
function addToCartClicked(event) {
    var button = event.target
    console.log(button.parentElement)
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0]
    var price = shopItem.getElementsByClassName("shop-item-price")[0]
    price = parseFloat(price.innerText.replace('$', ''))
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0]

    if (title && price && imageSrc) {
        var item = {
            title: title.innerText,
            price: price,
            imageSrc: imageSrc.src,
            quantity: 1,

        }
        console.log(item)
        addItemToCart(item)
    }
}
function addItemToCart(item) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

    var existingItem = cartItems.find(function (cartItem) {
        return cartItem.title === item.title
    })
    if (!existingItem) {
        cartItems.push(item)
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        console.log(cartItems)
    }
    const count = cartItems.length;
    updateCartCount(count);
}
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = count;
}

