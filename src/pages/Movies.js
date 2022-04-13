import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { getGenres, getMovies } from "../Api";
import useGenreId from "../components/hooks/useGenreId";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Container, Grid } from "@mui/material";
import SinglePage from "../components/SinglePage";
import Genre from "../components/Genre";

function Movie() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    getGenres("movie").then((data) => {
      setGenres(data);
    });
  }, []);
  const genreId = useGenreId(selectedGenres);
  useEffect(() => {
    getMovies(genreId, page).then((data) => {
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);

      console.log({ genreId });
    });
  }, [genreId, page]);
  const nextData = () => {
    if (page > totalPages) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };

  return (
    <>
      <Typography
        variant="h4"
        color="white"
        sx={{ mt: "5vh", textAlign: "center" }}
      >
        Movie
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "5vh",
          mb: "5vh",
        }}
      >
        <Typography variant="body1" color="white" sx={{ mr: 2 }}>
          Filter By:
        </Typography>
        <Genre
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          type="movie"
          setPage={setPage}
          setContent={setContent}
        />
      </Box>
      <InfiniteScroll
        dataLength={content.length} //This is important field to render the next data
        next={nextData}
        style={{ overflow: "hidden" }}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="error" size={80} />
          </Box>
        }
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {content?.map((video) => (
              <SinglePage content={video} key={video.id} type="movie" />
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
      )
    </>
  );
}

export default Movie;
