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
// ====================================================================================================
function ready() {
    // localStorage.clear();
    var cartItemsContainer = document.querySelector('.cart-i ');
    if (cartItemsContainer) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const count = cartItems.length;
        updateCartCount(count);
        console.log(cartItems)
        cartItems.forEach(function (item) {
            var cartRow = document.createElement('tbody');
            var itemTotal = item.price * item.quantity
            cartRow.innerHTML = `
          <tr>
              <td><button class="btn-danger"><i class="fa-solid fa-circle-xmark"></i></button></td>
              <td><img src="${item.imageSrc}" alt=""></td>
              <td>${item.title}</td>
              <td><span class="cart-price">$${item.price}</span></td>
              <td><input class="cart-quantity-input" type="number" value="${item.quantity}"></td>
              <td class="row-total">$${itemTotal.toFixed(2)}</td>
          </tr>
        `;

            cartItemsContainer.appendChild(cartRow);
            updateCartTotal()
        });

        var removeCartItemButtons = cartItemsContainer.getElementsByClassName('btn-danger');
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i];
            button.addEventListener('click', removeCartItem);
        }

        var updateQuantitys = cartItemsContainer.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < updateQuantitys.length; i++) {
            var button = updateQuantitys[i];
            button.addEventListener('change', quantityChanged);
        }

    }

}

function removeCartItem(event) {
    console.log('check')
    var buttonClicked = event.target;
    var cartItem = buttonClicked.closest('tbody');
    var cartItemsContainer = document.querySelector('.cart-i');
    console.log(cartItem)
    if (cartItem && cartItemsContainer && cartItem.parentNode === cartItemsContainer) {

        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var cartRows = cartItemsContainer.querySelectorAll('tbody'); // Select all tbody elements
        console.log(cartRows)
        var itemIndex = Array.from(cartRows).indexOf(cartItem); // Calculate index based on tbody elements only
        console.log('Item Index:', itemIndex);
        if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            cartItemsContainer.removeChild(cartItem);
            const count = cartItems.length;
            updateCartCount(count);
            updateCartTotal();
            updateCartPage()

        }
    }
}

function quantityChanged(event) {
    var input = event.target;
    var cartItem = input.closest('tbody');
    var cartItemsContainer = document.querySelector('.cart-i');

    if (cartItem && cartItemsContainer && cartItem.parentNode === cartItemsContainer) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var cartRows = cartItemsContainer.querySelectorAll('tbody');
        var itemIndex = Array.from(cartRows).indexOf(cartItem);

        if (itemIndex > -1) {
            var quantity = parseInt(input.value);
            if (isNaN(quantity) || quantity <= 0) {
                quantity = 1;
                input.value = quantity;
            }

            cartItems[itemIndex].quantity = quantity;
            cartItems[itemIndex].subTotal = quantity * cartItems[itemIndex].price;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            const count = cartItems.length;
            updateCartCount(count);
            updateCartPage()
            updateCartTotal()
            // updateCartTotal(); // Update the cart total
        }
    }
}

function updateCartPage() {
    var cartItemsContainer = document.querySelector('.cart-i');
    if (cartItemsContainer) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        cartItems.forEach(function (item, index) {
            var cartRows = cartItemsContainer.querySelectorAll('tbody');
            var cartRow = cartRows[index];

            // Update quantity
            var quantityInput = cartRow.querySelector('.cart-quantity-input');
            if (quantityInput) {
                quantityInput.value = item.quantity;
            }

            // Update subtotal
            var subtotalElement = cartRow.querySelector('.row-total');
            if (subtotalElement) {
                var subtotal = item.price * item.quantity;
                subtotalElement.textContent = '$' + subtotal.toFixed(2);
            }
        });
    }

}
function updateCartTotal() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var total = 0;
    console.log('check')
    cartItems.forEach(function (item) {
        total += item.price * item.quantity;
    });

    var cartTotalElement = document.querySelector('.cart-total');

    cartTotalElement.innerText = '$' + total.toFixed(2);
    console.log('sdasd', document.querySelector('.cart-totalA'))
    document.querySelector('.cart-totalA').innerText = '$' + total.toFixed(2);


}
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = count;
}

// updateCartTotal();


// Call the ready function when the DOM is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // localStorage.clear();
    ready();

}