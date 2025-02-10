import onChange from 'on-change';

// 🔹 Función para renderizar los feeds en la UI
const renderFeeds = (feeds, elements) => {
  elements.feedsContainer.innerHTML = '';

  const feedsTitle = document.createElement('h2');
  feedsTitle.textContent = 'Feeds';
  elements.feedsContainer.appendChild(feedsTitle);

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-4');

  feeds.forEach((feed) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const title = document.createElement('h3');
    title.textContent = feed.title;

    const description = document.createElement('p');
    description.textContent = feed.description;

    listItem.appendChild(title);
    listItem.appendChild(description);
    feedsList.appendChild(listItem);
  });

  elements.feedsContainer.appendChild(feedsList);
};

// 🔹 Función para renderizar los posts en la UI
const renderPosts = (posts, elements) => {
  if (!elements.postsContainer) {
    console.error('❌ El contenedor de posts no está presente en el DOM.');
    return;
  }

  elements.postsContainer.innerHTML = '';

  const postsTitle = document.createElement('h2');
  postsTitle.textContent = 'Posts';
  elements.postsContainer.appendChild(postsTitle);

  const postsList = document.createElement('ul');
  postsList.classList.add('list-group');

  // 🔹 Asegurar que los posts **se rendericen en orden correcto**
  posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

    const link = document.createElement('a');
    link.href = post.link;
    link.textContent = post.title;
    link.target = '_blank';

    listItem.appendChild(link);
    postsList.appendChild(listItem);
  });

  elements.postsContainer.appendChild(postsList);
};

// 🔹 Función principal para inicializar los watchers
const initWatchers = (state, elements) => onChange(state, (path, value) => {
  if (path === 'feeds') {
    renderFeeds(value, elements);
  }
  if (path === 'posts') {
    renderPosts(value, elements);
  }
});

export default initWatchers;
