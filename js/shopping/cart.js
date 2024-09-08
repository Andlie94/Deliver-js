    displayCartItems();
    updateCartCount();

  
  
  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('#cart-container');
    const totalPriceElement = document.querySelector('#total-price');
    const payContainer = document.querySelector('#pay-container'); 
    cartContainer.innerHTML = ''; 
    payContainer.innerHTML = ''; 
  
    let totalPrice = 0;
  
    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
  
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
  
      const img = document.createElement('img');
      img.src = item.image;
      itemDiv.appendChild(img);
  
      const title = document.createElement('h4');
      title.textContent = item.title;
      itemDiv.appendChild(title);
  
  
      const discountedPrice = document.createElement('p');
      discountedPrice.textContent = `Discounted Price: ${item.discountedPrice}`;
      itemDiv.appendChild(discountedPrice);
  
      totalPrice += item.discountedPrice;
  
 
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        removeItemFromCart(index);
      });
      itemDiv.appendChild(removeButton);
  
      cartContainer.appendChild(itemDiv);
    });
  
   
    totalPriceElement.textContent = totalPrice.toFixed(2);
  
 
    if (cart.length > 0) {
      const payButton = document.createElement('button');
      payButton.textContent = 'Pay';
      payButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
      payContainer.appendChild(payButton);
    }
  }
  

  function removeItemFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCartItems(); 
    updateCartCount(); 
  }
  

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('#cart-count').textContent = cart.length;
  }