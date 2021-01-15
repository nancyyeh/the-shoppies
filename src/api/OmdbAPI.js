export function findMovies(searchKey, page) {
  const url = `https://www.omdbapi.com/?apikey=cbf06e88&s=${searchKey.trim()}&page=${page}&type=movie`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.Response === "True") {
        const data = {
          totalResults: result.totalResults,
          movies: {},
        };
        result.Search.forEach((item) => {
          data.movies[item.imdbID] = item;
        });

        return data;
      } else {
        return Promise.reject(result.Error);
      }
    });
}
