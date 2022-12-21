
export const getAllMoviesRequest = () => ({
  method: "get",
  url: "/movies",
});
export const getMovieRequest = (id) => ({
  method: "get",
  url: `/movies/${id}`,
});
export const createMovieRequest = (movie) => ({
  method: "post",
  url: "/movies",
  data: movie,
});
export const updateMovieRequest = (id, movie) => ({
  method: "POST",
  url: `/movies/${id}`,
  data: movie,
});
export const deleteMovieRequest = (id) => ({
  method: "delete",
  url: `/movies/${id}`,
});

export const getAllMoviesByCategoryRequest = (category) => ({
  method: "get",
  url: `/moviesByCategory/${category}`,
});


