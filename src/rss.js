import axios from 'axios';
import i18next from './i18n.js';

const parseRss = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  const titleElement = xmlDoc.querySelector('channel > title');
  const descriptionElement = xmlDoc.querySelector('channel > description');
  const items = xmlDoc.querySelectorAll('item');

  if (!titleElement || !descriptionElement || items.length === 0) {
    throw new Error(i18next.t('form.errors.invalidRSS'));
  }

  const title = titleElement.textContent;
  const description = descriptionElement.textContent;
  const posts = [...items].map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description')?.textContent || '',
  }));

  return { title, description, posts };
};

const fetchRss = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => {
    if (!response.data.contents) {
      throw new Error(i18next.t('form.errors.invalidRSS'));
    }
    return parseRss(response.data.contents);
  })
  .catch((error) => {
    if (error.isAxiosError) {
      throw new Error(i18next.t('form.errors.networkError'));
    }
    throw new Error(i18next.t('form.errors.invalidRSS'));
  });

const updateFeeds = (state, watchedState) => {
  const checkForUpdates = () => {
    const feedPromises = state.feeds.map((feed) => fetchRss(feed.url)
      .then(({ posts }) => {
        const existingPostLinks = new Set(state.posts.map((post) => post.link));
        const newPosts = posts.filter((post) => !existingPostLinks.has(post.link));

        if (newPosts.length > 0) {
          console.log(`🔄 ${newPosts.length} nuevos posts detectados en ${feed.title}`);
          watchedState.posts = [...newPosts, ...watchedState.posts];
        }
      })
      .catch((error) => console.error(`❌ Error al actualizar ${feed.url}:`, error.message)));

    Promise.all(feedPromises).finally(() => {
      setTimeout(checkForUpdates, 5000);
    });
  };

  checkForUpdates();
};

export { fetchRss, updateFeeds };
