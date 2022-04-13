import axios from "axios";
const URL = "https://api.themoviedb.org/3";
const KEY = process.env.REACT_APP_TMDB_KEY;
export const getTrending = async (page) => {
  try {
    const { data } = await axios.get(
      `${URL}/trending/all/week?api_key=${KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getDetails = async (id, type) => {
  try {
    const { data } = await axios.get(`${URL}/${type}/${id}?api_key=${KEY}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUpComing = async (page) => {
  try {
    const { data } = await axios.get(
      `${URL}/movie/upcoming?api_key=${KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getLatestMovies = async () => {
  try {
    const { data } = await axios.get(`${URL}/movie/latest?api_key=${KEY}`);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
export const getTopRated = async (type, page, genreId) => {
  try {
    const { data } = await axios.get(
      `${URL}/${type}/top_rated?api_key=${KEY}&page=${page}&with_genres=${genreId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getGenres = async (type) => {
  try {
    const { data } = await axios.get(
      `${URL}/genre/${type}/list?api_key=${KEY}`
    );
    return data.genres;
  } catch (error) {
    console.log(error);
  }
};
export const getMovies = async (genreId, page) => {
  try {
    const { data } = await axios.get(
      `${URL}/discover/movie?api_key=${KEY}&page=${page}&with_genres=${genreId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSeries = async (genreId, page) => {
  try {
    const { data } = await axios.get(
      `${URL}/discover/tv?api_key=${KEY}&page=${page}&with_genres=${genreId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTrailerID = async (id, type) => {
  try {
    const { data } = await axios.get(
      `${URL}/${type}/${id}/videos?api_key=${KEY}`
    );
    return data.results[0]?.key;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommended = async (id, type, page) => {
  try {
    const { data } = await axios.get(
      `${URL}/${type}/${id}/recommendations?api_key=${KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCast = async (id, type) => {
  try {
    const { data } = await axios.get(
      `${URL}/${type}/${id}/credits?api_key=${KEY}`
    );
    return data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const getSearch = async (type, search, page) => {
  try {
    const { data } = await axios.get(
      `${URL}/search/${type}?query=${search}&api_key=${KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
