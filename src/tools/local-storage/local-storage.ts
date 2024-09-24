import merge from 'lodash/merge';

export const localStore = {
  /**
   * Get a value for a key or array of keys from LocalStorage.
   * @param {String|Array} key A key or array of keys.
   * @return {Promise}
   */
  async get(key: string | string[]) {
    if (!Array.isArray(key)) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } else {
      return key.map(k => {
        const value = localStorage.getItem(k);
        return value ? JSON.parse(value) : null;
      });
    }
  },

  /**
   * Save a key value pair or a series of key value pairs to LocalStorage.
   * @param  {String|Array} key The key or an array of key/value pairs.
   * @param  {Any} value The value to save.
   * @return {Promise}
   */
  async save(key: string | Array<Record<string, any>>, value: any) {
    if (!Array.isArray(key)) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      key.forEach(pair => {
        localStorage.setItem(pair[0], JSON.stringify(pair[1]));
      });
    }
  },

  /**
   * Updates the value in the store for a given key in LocalStorage. 
   * If the value is a string, it will be replaced. If the value is an object, it will be deep merged.
   * @param  {String} key The key.
   * @param  {Value} value The value to update with.
   * @return {Promise}
   */
  async update(key: string, value: any) {
    const item = await this.get(key);
    value = typeof value === 'string' ? value : merge({}, item, value);
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Delete the value for a given key in LocalStorage.
   * @param  {String|Array} key The key or an array of keys to be deleted.
   * @return {Promise}
   */
  async delete(key: string | string[]) {
    if (Array.isArray(key)) {
      key.forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.removeItem(key);
    }
  },

  /**
   * Get all keys in LocalStorage.
   * @return {Promise} A promise which when it resolves gets passed the saved keys in LocalStorage.
   */
  async keys(): Promise<string[]> {
    return Object.keys(localStorage);
  },

  /**
   * Push a value onto an array stored in LocalStorage by key or create a new array if it's not yet defined.
   * @param {String} key They key.
   * @param {Any} value The value to push onto the array.
   * @return {Promise}
   */
  async push(key: string, value: any) {
    const currentValue = await this.get(key);
    if (currentValue === null) {
      await this.save(key, [value]);
    } else if (Array.isArray(currentValue)) {
      await this.save(key, [...currentValue, value]);
    } else {
      throw new Error(
        `Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`,
      );
    }
  },

  /**
   * Appends a unique value to an array stored in LocalStorage.
   * If the key does not exist, it initializes a new array.
   * The new value will only be added if it does not already exist in the array.
   * @param {string} key - The key under which the array is stored in LocalStorage.
   * @param {string} newValue - The new value to be added to the array.
   * @returns {Promise<void>} - A promise that resolves when the new value has been added.
   */
  async pushUnique<T>(key: string, newValue: T) {
    try {
      const existingData = localStorage.getItem(key);
      let dataArray: T[] = existingData ? JSON.parse(existingData) : [];

      if (!dataArray.includes(newValue)) {
        dataArray.push(newValue);
        await this.save(key, dataArray);
      }
    } catch (error) {
      console.error('Error saving data to LocalStorage', error);
    }
  },
};
