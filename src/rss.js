import axios from 'axios';
import i18next from './i18n';

const parseRss = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  const titleElement = xmlDoc.querySelector('channel > title');
  const descriptionElement = xmlDoc.querySelector('channel > description');
  const items = xmlDoc.querySelectorAll('item');

  if (!titleElement || !descriptionElement || items.length === 0) {
    throw new Error(i18next.t('form.errors.invalidRSS')); // 🔹 Ahora usa el mensaje correcto
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

const fetchRss = async (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  try {
    const response = await axios.get(proxyUrl);

    if (!response.data.contents) {
      throw new Error(i18next.t('form.errors.invalidRSS')); // 🔹 Si la respuesta está vacía, no es un RSS válido
    }

    return parseRss(response.data.contents);
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error(i18next.t('form.errors.networkError')); // 🔹 Error de red
    }
    throw new Error(i18next.t('form.errors.invalidRSS')); // 🔹 Error de parsing, feed no válido
  }
};

export default fetchRss;
