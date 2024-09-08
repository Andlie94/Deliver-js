
    displayCheckoutItems();
    updateCartCount();

  

  function displayCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutContainer = document.querySelector('#checkout-container');
    const totalPriceElement = document.querySelector('#total-price');
    checkoutContainer.innerHTML = ''; 
  
    let totalPrice = 0;
  
    if (cart.length === 0) {
      checkoutContainer.innerHTML =
        '<p>Your cart is empty. Add some products before checkout.</p>';
      return;
    }
  
    cart.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('checkout-item');
  
  
      const title = document.createElement('h4');
      title.textContent = item.title;
      itemDiv.appendChild(title);
  
  
      const discountedPrice = document.createElement('p');
      discountedPrice.textContent = `Discounted Price: ${item.discountedPrice}`;
      itemDiv.appendChild(discountedPrice);
  
      totalPrice += item.discountedPrice;
  
      checkoutContainer.appendChild(itemDiv);
    });
  

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  
 
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('#cart-count').textContent = cart.length;
  }
  

  document.querySelector('#confirm-payment').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart'); 
    window.location.href = 'index.html'; 
  });