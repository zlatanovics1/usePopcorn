import { useState, useEffect } from "react";

/**
 *
 * @param {string} key
 * @returns {Array} value -items from LocalStorage
 * @returns setValue - React setter function
 */
export function useLocalStorage(key) {
  const [value, setValue] = useState(function () {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
