export function createPosts(container, posts) {
    container.innerHTML = '';
  
    posts.forEach((post) => {
      const div = document.createElement('div');
      div.classList.add('post');
  
      const h2 = document.createElement('h4');
      h2.textContent = post.title;
      div.append(h2);
  
      const p = document.createElement('p');
      p.textContent = post.body;
      div.append(p);
  
      const img = document.createElement('img');
      img.src = post.image;
      div.append(img);

  
      const discountedPrice = document.createElement('p');
      discountedPrice.textContent = `${
        post.discountedPrice == post.price ? '' : 'Discounted '
      }Price: ${post.discountedPrice} ${post.discountedPrice == post.price ? "" : "(before: " + post.price + ")"}`;
      div.append(discountedPrice);
  
      const gender = document.createElement('span');
      gender.textContent = `Gender: ${post.gender}`;
      div.append(gender);
  
  
      const viewButton = document.createElement('button');
      viewButton.textContent = 'View Details';
      viewButton.addEventListener('click', () => {
        window.location.href = `detail.html?id=${post.id}`;
      });
      div.append(viewButton);
  

      const cartButton = document.createElement('button');
      cartButton.textContent = 'Add to Cart';
      cartButton.addEventListener('click', () => {
        addToCart(post);
        updateCartCount();
      });
      div.append(cartButton);
  
      container.append(div);
    });
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
  
updateCartCount();
