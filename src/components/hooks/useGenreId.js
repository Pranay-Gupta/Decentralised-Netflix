const useGenreId = (genres) => {
  if (genres.length < 1) return "";
  const genreId = genres.map((genre) => genre.id);
  return genreId.reduce((acc, curr) => acc + "," + curr);
};
export default useGenreId;
