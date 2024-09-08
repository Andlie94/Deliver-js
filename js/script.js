let posts = [];

import { createPosts } from './Posts/createPosts.js';

async function fetchPosts() {
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    posts = await response.json(); 
    const container = document.querySelector('#posts-container');
    const loadingMessage = document.querySelector('#loading-message'); 

    if (loadingMessage) {
      loadingMessage.style.display = 'none'; 
    }

    createPosts(container, posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    const container = document.querySelector('#posts-container');
    container.innerHTML = `<p>Sorry, could not get the products. Please try again later.</p>`; 
  }
}

const categorySelect = document.querySelector('#category');

if (categorySelect) {
  categorySelect.addEventListener('change', respondToCategoryChange);
}

function respondToCategoryChange(event) {
  const selectedCategory = event.target.value;


  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === '') return true; 
    return post.gender === selectedCategory;
  });

 
  const container = document.querySelector('#posts-container');
  createPosts(container, filteredPosts); 
}
fetchPosts();