async function fetchPostDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('id');
  
    try {
      const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
      const posts = await response.json();
      const post = posts.find((post) => post.id === postId);
  
      if (!post) throw new Error('Post not found');
  
      const container = document.querySelector('#details-container');
      const loadingMessage = document.querySelector('#loading-message');
      if (loadingMessage) loadingMessage.style.display = 'none';
  
      const title = document.createElement('h2');
      title.textContent = post.title;
      container.appendChild(title);
  
      const body = document.createElement('p');
      body.textContent = post.body;
      container.appendChild(body);
  
      const img = document.createElement('img');
      img.src = post.image;
      container.appendChild(img);

      const description=document.createElement(`p`);
      description.textContent=post.description;
      container.appendChild(description);
  
  
      const discountedPrice = document.createElement('p');
      discountedPrice.textContent = `${
        post.discountedPrice == post.price ? '' : 'Discounted '
      }Price: ${post.discountedPrice} ${post.discountedPrice == post.price ? "" : "(before: " + post.price + ")"}`;
      container.append(discountedPrice);
  
      const gender = document.createElement('p');
      gender.textContent = `Gender: ${post.gender}`;
      container.appendChild(gender);
  

      const cartButton = document.createElement('button');
      cartButton.textContent = 'Add to Cart';
      cartButton.addEventListener('click', () => {
        addToCart(post);
        updateCartCount();
      });
      container.appendChild(cartButton);
    } catch (error) {
      console.error('Failed to fetch post details:', error);
      const container = document.querySelector('#details-container');
      container.innerHTML = `<p>Sorry, could not load the post details. Please try again later.</p>`;
    }
  }
  

  function addToCart(post) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(post);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.querySelector('#cart-count').textContent = cartCount;
  }
  
 
    fetchPostDetails();
    updateCartCount();