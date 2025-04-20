'use strict';

// navbar variables
const nav = document.querySelector('.mobile-nav');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');


// navToggle function
const navToggleFunc = function () { nav.classList.toggle('active'); }

navMenuBtn.addEventListener('click', navToggleFunc);
navCloseBtn.addEventListener('click', navToggleFunc);



// theme toggle variables
const themeBtn = document.querySelectorAll('.theme-btn');


for (let i = 0; i < themeBtn.length; i++) {

  themeBtn[i].addEventListener('click', function () {

    // toggle `light-theme` & `dark-theme` class from `body`
    // when clicked `theme-btn`
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    for (let i = 0; i < themeBtn.length; i++) {

      // When the `theme-btn` is clicked,
      // it toggles classes between `light` & `dark` for all `theme-btn`.
      themeBtn[i].classList.toggle('light');
      themeBtn[i].classList.toggle('dark');

    }

  })

}
// blog.js
const API_URL = "https://dummyjson.com/posts?limit=10&skip=10"; // Replace with your actual API

document.addEventListener("DOMContentLoaded", () => {
  fetchBlogPosts();
});

// async function fetchBlogPosts() {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) throw new Error("Failed to fetch blog posts");

//     const posts = await response.json();
//     renderBlogPosts(posts);
//   } catch (error) {
//     console.error("Error fetching blog posts:", error.message);
//   }
// }

function renderBlogPosts(posts) {
  const container = document.getElementById("blog-card-group");
  container.innerHTML = ""; // clear existing

  posts.forEach(post => {
    container.appendChild(createBlogCard(post));
  });
}

function createBlogCard(post) {
  const div = document.createElement("div");
  div.classList.add("blog-card");
  div.innerHTML = `
    <div class="blog-card-banner">
      <img src="${sanitize(post.image)}" alt="${sanitize(post.title)}" width="250" class="blog-banner-img">
    </div>
    <div class="blog-content-wrapper">
      <button class="blog-topic text-tiny">${sanitize(post.category)}</button>
      <h3><a href="${sanitize(post.link)}" class="h3">${sanitize(post.title)}</a></h3>
      <p class="blog-text">${sanitize(post.description)}</p>
      <div class="wrapper-flex">
        <div class="profile-wrapper">
          <img src="${sanitize(post.authorImage)}" alt="${sanitize(post.author)}" width="50">
        </div>
        <div class="wrapper">
          <a href="#" class="h4">${sanitize(post.author)}</a>
          <p class="text-sm">
            <time datetime="${sanitize(post.date)}">${formatDate(post.date)}</time>
            <span class="separator"></span>
            <ion-icon name="time-outline"></ion-icon>
            <time datetime="PT${sanitize(post.readTime)}M">${sanitize(post.readTime)} min</time>
          </p>
        </div>
      </div>
    </div>
  `;
  return div;
}

function sanitize(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}
async function fetchBlogPosts() {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // Show loader

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch blog posts");

    const posts = await response.json();
    renderBlogPosts(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}