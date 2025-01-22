const CONFIG = require('./config');

class TimeLimitedCache {
  constructor(entryExpiration = CONFIG.DEFAULT_RESET_MS) {
    this.cache = new Map();
    this.entryExpiration = entryExpiration;
  }

  get(key) {
    if (!this.cache.has(key)) return;
    const { value } = this.cache.get(key);

    return value;
  }

  set(key, value) {
    const existingEntry = this.cache.get(key);

    if (existingEntry !== undefined) {
      const { timeout } = existingEntry;
      clearTimeout(timeout);
    }

    const timeout = setTimeout(() => this.cache.delete(key), this.entryExpiration);
    this.cache.set(key, { value, timeout });
  }

  reset() {
    this.cache.forEach(entry => {
      const { timeout } = entry;
      clearTimeout(timeout);
    });

    this.cache.clear();
  }
}

module.exports = TimeLimitedCache;