import { menuArray } from "./data.js"
const menuDiv = document.getElementById("menu-container")
const checkoutDiv = document.getElementById("checkout-section")
let cardForm = document.getElementById('card-form')
let closeModalBtn = document.getElementById("closeModalBtn")
let formPay = document.getElementById("form")
let name = document.getElementById("name")
let checkoutCart = []


function render() {
    let menuHtml = ``

    menuArray.forEach(function(menu) {
        menuHtml += `
        <div class="menu">
            <h2 class="menu-emoji">${menu.emoji}</h2>
            <div class="menu-details">
                <h2 class="menu-name">${menu.name}</h2>
                <p class="menu-ingredients">${menu.ingredients}</p>
                <h3 class="menu-price">$${menu.price}</h3>
            </div>
            <button class="add-btn" id="add-btn" data-id="${menu.id}"><i class="fa-regular fa-plus" id="add-btn" data-id="${menu.id}"></i></button> 
        </div>
        <hr>`
    })
    menuDiv.innerHTML = menuHtml
}


document.addEventListener("click", function(e) {
    if(e.target.dataset.id) {
        searchMenu(e.target.dataset.id)
    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }else {

    }
})


function searchMenu(menuId) {
    const filteredMenu = menuArray.filter(function(singleMenu) {
        return singleMenu.id == menuId
    })[0]

    checkoutCart.push(filteredMenu)

    if (checkoutCart.length > 0) {
        checkoutSection()
    }
}


function checkoutSection() {
    let totalCost = 0;
    let checkoutHtml = ``
 
    checkoutHtml = `<h2 class="checkout-title">Your order</h2>`
    checkoutDiv.innerHTML += checkoutHtml

// consider maybe renaming this variable to be more specific
    let incrementingNum = 0;
    
       checkoutCart.forEach(function(addItemToCheckout) {
        incrementingNum++
        totalCost += addItemToCheckout.price
        checkoutHtml += `   
        <div class="checkout-item">
        <h2>${addItemToCheckout.name}</h2>
        <button class="remove-btn" data-remove=${incrementingNum}>remove</button>
  
        <h2 class="checkout-price">$${addItemToCheckout.price}</h2>
    </div>`
    })

    checkoutDiv.innerHTML = checkoutHtml    
 
    /* Total Price */
    let totalHtml = `
    <div class="total-container">
        <h2>Total Price:</h2>
        <h2 class="total-cost">$${totalCost}</h2>  
    </div>
    `
    checkoutDiv.innerHTML += totalHtml
   
    /* Checkout Button */
    let buttonHtml = `<button class="purchase-btn" id="complete-order-btn">Complete Order</button>`
    checkoutDiv.innerHTML += buttonHtml

    let completeOrderBtnId = document.getElementById("complete-order-btn")
    enableClick(completeOrderBtnId)
 
   checkoutDiv.style.display = "block"
}


/* REMOVE */
function removeItem(id) {
        if (id == 1) {
            checkoutCart.splice(id-1, id)  
        } else  {    
            checkoutCart.splice(id-1, id-1)
        }

        if (checkoutCart.length == 0) {
            checkoutDiv.style.display ="none"
        } else {
            checkoutSection()
        }
}


function enableClick(id) {
    id.addEventListener("click", () => {
        cardForm.style.display = "flex"
    })
}


closeModalBtn.addEventListener("click", function() {
    cardForm.style.display = "none"
})


formPay.addEventListener("submit", function(e) {
    cardForm.style.display = "none"
    let paidHtml = `<div class="confirmation-message">
    <h3>Thanks, ${name.value}! Your order is on its way!</h3>
    </div>`
    
    checkoutDiv.innerHTML = paidHtml
    e.preventDefault()
    checkoutCart = []

/* Instead of manually setting every field to clear out like this you can instead use
formPay.reset(). The reset() is a built-in method in JavaScript to clear the form. You can use it to reset all values to the default in the form. */

    formPay.reset()
})


render()