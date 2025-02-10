import onChange from "on-change";

// 🔹 Renderiza la lista de feeds
const renderFeeds = (feeds, elements) => {
  elements.feedsContainer.innerHTML = "";

  const feedsTitle = document.createElement("h2");
  feedsTitle.textContent = "Feeds";
  elements.feedsContainer.appendChild(feedsTitle);

  const feedsList = document.createElement("ul");
  feedsList.classList.add("list-group", "mb-4");

  feeds.forEach((feed) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    
    const title = document.createElement("h3");
    title.textContent = feed.title;
    
    const description = document.createElement("p");
    description.textContent = feed.description;
    
    listItem.appendChild(title);
    listItem.appendChild(description);
    feedsList.appendChild(listItem);
  });

  elements.feedsContainer.appendChild(feedsList);
};

// 🔹 Renderiza la lista de posts
const renderPosts = (posts, state, elements) => {
  elements.postsContainer.innerHTML = "";

  const postsTitle = document.createElement("h2");
  postsTitle.textContent = "Posts";
  elements.postsContainer.appendChild(postsTitle);

  const postsList = document.createElement("ul");
  postsList.classList.add("list-group");

  posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");

    const link = document.createElement("a");
    link.href = post.link;
    link.textContent = post.title;
    link.target = "_blank";
    link.classList.add(state.readPosts.has(post.link) ? "fw-normal" : "fw-bold");

    const previewButton = document.createElement("button");
    previewButton.textContent = "Preview";
    previewButton.classList.add("btn", "btn-secondary", "btn-sm", "ms-2");
    previewButton.dataset.bsToggle = "modal";
    previewButton.dataset.bsTarget = "#postModal";

    previewButton.addEventListener("click", () => {
      document.getElementById("postModalLabel").textContent = post.title;
      document.getElementById("postModalBody").textContent = post.description;
      state.readPosts.add(post.link);
      link.classList.remove("fw-bold");
      link.classList.add("fw-normal");
    });

    listItem.appendChild(link);
    listItem.appendChild(previewButton);
    postsList.appendChild(listItem);
  });

  elements.postsContainer.appendChild(postsList);
};

// 🔹 Inicializa los watchers
const initWatchers = (state, elements) => onChange(state, (path, value) => {
  if (path === "feeds") {
    renderFeeds(value, elements);
  }
  if (path === "posts") {
    renderPosts(value, state, elements);
  }
});

export default initWatchers;
