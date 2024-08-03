const TMDB_API_KEY = 'api_key=2aa3c6dc8b4575cb4b74b946ab3f376f';

export const TMDB_API_CONSTANTS = {
  POPULAR_MOVIES_LIST: `https://api.themoviedb.org/3/movie/popular?${TMDB_API_KEY}`,
  POPULAR_TV_SHOWS_LIST: `https://api.themoviedb.org/3/tv/popular?${TMDB_API_KEY}`,
}

export const MEDIA_TYPES = {
  POPULAR_MOVIES_LIST: 'popularMovieList',
  POPULAR_TV_SHOWS_LIST: 'popularTVShowsList',
}
