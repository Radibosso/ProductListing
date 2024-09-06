jQuery( document ).ready(function( $ ) {

        // Initialize cart as an empty array
let cart = [];

// Function to update cart
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  const totalQuantity = document.getElementById('total-quantity');
  
  cartItems.innerHTML = '';
  let total = 0;
  let totalQty = 0; // To track total quantity

  cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <span class="item-name">${item.name}</span>
          <span class="item-price">${item.price}</span>
          <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-index="${index}">
          <span class="remove-item" data-index="${index}">Remove</span>
      `;
      cartItems.appendChild(li);
      
      // Calculate the total amount
      const price = parseFloat(item.price.replace('R', '').replace(',', ''));
      total += price * item.quantity;
      totalQty += item.quantity; // Increment the total quantity
  });

  // Update the total amount display
  totalAmount.innerHTML = `Total Amount: R${total.toFixed(2)}`;

  // Update the total quantity display
  totalQuantity.innerHTML = `Total Quantity: ${totalQty}`;

  // Add event listeners to "Remove" buttons
  document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          cart.splice(index, 1); // Remove the item from the cart array
          updateCart(); // Update the cart display
      });
  });

  // Add event listeners to quantity inputs
  document.querySelectorAll('.item-quantity').forEach(input => {
      input.addEventListener('change', function() {
          const index = this.getAttribute('data-index');
          const newQuantity = parseInt(this.value);
          if (newQuantity > 0) {
              cart[index].quantity = newQuantity; // Update quantity in cart
              updateCart(); // Update the cart display
          }
      });
  });
}

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault();
      const productName = this.getAttribute('data-product-name');
      const productPrice = this.getAttribute('data-product-price');
      const existingProduct = cart.find(item => item.name === productName);

      if (existingProduct) {
          existingProduct.quantity += 1; // Increase quantity if the item already exists in the cart
      } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      updateCart();
      alert(`${productName} has been added to your cart.`);
  });
});
 
});

