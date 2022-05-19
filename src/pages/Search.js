import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, InputBase, Tabs, useMediaQuery } from "@mui/material";
import Tab from "@mui/material/Tab";
import ReactLoading from "react-loading";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { getSearch } from "../Api";
import InfiniteScroll from "react-infinite-scroll-component";
import SinglePage from "../components/SinglePage";

function Search() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [type, setType] = useState("movie");
  const handleForm = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setContent([]);
    setPage(1);
    setSearch(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
    setType(!value ? "tv" : "movie");
    setContent([]);
  };
  const fetchData = () => {
    getSearch(type, search, page).then((data) => {
      setContent([...content, data?.results]);
      setTotalPages(data?.total_pages);
    });
  };
  useEffect(() => {
    const abortCont = new AbortController();
    fetchData();
    return () => abortCont.abort();
  }, [search, value, page]);
  const nextData = () => {
    if (page > totalPages) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };

  const handleClick = () => {
    setContent([]);
    setPage(1);
    fetchData();
  };
  const isMobile = useMediaQuery("(max-width:950px)");
  return (
    <Container maxWidth="xl">
      <Container
        maxWidth="xl"
        sx={{
          mt: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <center>
          <Typography variant={isMobile ? "h4" : "h3"} color="white">
            Unlimited movies, TV shows and more.
          </Typography>
        </center>

        <form
          style={{
            marginTop: "5vh",
            backgroundColor: "white",
            display: "flex",
            width: "60%",
            ...(isMobile && {
              width: "100%",
            }),
          }}
          variant="standard"
          onSubmit={(e) => handleForm(e)}
        >
          <InputBase
            placeholder="Search for movies, tv shows and more..."
            sx={{ p: 1.5, flex: 1 }}
            onChange={(e) => handleSubmit(e)}
          />
          <Button
            variant="contained"
            sx={{ width: "15%", borderRadius: 0 }}
            onClick={handleClick}
          >
            <SearchIcon />
          </Button>
        </form>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            sx={{ mt: 5 }}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Movies" value={0} sx={{ color: "white" }} />
            <Tab label="TV Shows" value={1} sx={{ color: "white" }} />
          </Tabs>
        </Box>
      </Container>
      {search && (
        <InfiniteScroll
          dataLength={content.length}
          style={{ marginTop: "5vh", overflow: "hidden" }}
          next={nextData}
          hasMore={hasMore}
          loader={
            <Box sx={{ display: "flex", justifyContent: "center", mt: "5vh" }}>
              <ReactLoading
                type="bubbles"
                color="red"
                height={200}
                width={100}
              />
            </Box>
          }
        >
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              {content?.map((video) => (
                <SinglePage content={video} key={video?.id} type={type} />
              ))}
            </Grid>
          </Container>
        </InfiniteScroll>
      )}
    </Container>
  );
}

export default Search;
