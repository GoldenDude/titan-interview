const CONFIG = require('./config');

async function handlePromiseBatch_SAFE(promises = [], rejectedPromiseValue) {
  if (!Array.isArray(promises)) return [];

  const results = await Promise.allSettled(promises);

  const normalizedResults = results.map(result => {
    const { value, status } = result;
    const actualValue = status === 'fulfilled' ? value : rejectedPromiseValue;

    return actualValue;
  });

  return normalizedResults;
}

module.exports = {
  handlePromiseBatch_SAFE
};