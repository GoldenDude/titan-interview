const { default: axios } = require('axios');

const CONFIG = require('./config');
const { PIXABAY_API_KEY: key } = require('../../config');
const { handlePromiseBatch_SAFE } = require('../../services/promiseUtils');
const TimeLimitedCacheService = require('../../services/imageCacheService');

const { ENDPOINTS } = CONFIG;
const imageCache = new TimeLimitedCacheService(CONFIG.PAGE_TTL);

async function getImagesPage(page) {
  const { PAGE_MAX_IMAGES: per_page } = CONFIG;
  const cachedPage = imageCache.get(page);

  if (cachedPage) return cachedPage;

  try {
    const result = await axios.get(ENDPOINTS.GENERATE_IMAGES, { params: { key, page, per_page }});
    const { hits = [] } = result?.data || {};
    imageCache.set(page, hits);

    return hits;
  } catch (e) {
    console.error(e); // or any other logging service
    return [];
  }
}

async function generateImages(amountOfImages) {
  let promises = [];
  const images = [];
  const results = [];
  const { PAGE_MAX_IMAGES, MAX_ASYNC_CALLS } = CONFIG;
  const pagesNeeded = Math.ceil(amountOfImages / PAGE_MAX_IMAGES);

  for (let page = 0; page < pagesNeeded; ++page) {
    promises.push(getImagesPage(page + 1));

    if (promises.length >= MAX_ASYNC_CALLS) {
      const tempResults = await handlePromiseBatch_SAFE(promises, []);
      promises = [];
      results.push(...tempResults);
    }
  }
  
  if (promises.length) {
    const tempResults = await handlePromiseBatch_SAFE(promises, []);
    results.push(...tempResults);
  }

  for (const result of results) images.push(...result);
  
  return images.slice(0, amountOfImages);
}

module.exports = {
  generateImages,
};