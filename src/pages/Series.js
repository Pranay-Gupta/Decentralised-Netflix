import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { getGenres, getSeries } from "../Api";
import useGenreId from "../components/hooks/useGenreId";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Grid } from "@mui/material";
import SinglePage from "../components/SinglePage";
import Genre from "../components/Genre";
import ReactLoading from "react-loading";
function Series() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    getGenres("tv").then((data) => {
      setGenres(data);
    });
  }, []);
  const genreId = useGenreId(selectedGenres);
  useEffect(() => {
    getSeries(genreId, page).then((data) => {
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);
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
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        color="white"
        sx={{ mt: "5vh", mb: "25px", textAlign: "center" }}
      >
        TV Series
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
        <Genre
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          type="tv"
          setPage={setPage}
          setContent={setContent}
        />
      </Box>

      <InfiniteScroll
        dataLength={content.length} //This is important field to render the next data
        next={nextData}
        hasMore={hasMore}
        style={{ overflow: "hidden" }}
        loader={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactLoading type="bubbles" color="red" height={200} width={100} />
          </div>
        }
      >
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            {content?.map((video) => (
              <SinglePage content={video} key={video.id} type="tv" />
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </Container>
  );
}

export default Series;
