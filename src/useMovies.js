import { useState, useEffect } from "react";

const KEY = "751627e6";

/**
 *
 * @param {string} query
 * @returns movies,isLoading,error
 */
export function useMovies(query) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Failed to fetch!");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found!");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) return;
      fetchMovies();

      return () => controller.abort();
    },
    [query]
  );
  return [movies, loading, error];
}
