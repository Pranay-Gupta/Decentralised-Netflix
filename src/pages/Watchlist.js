import { Container, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import CardDetails from "../components/CardDetails/CardDetails";
const Watchlist = () => {
  const { isAuthenticated, Moralis, account } = useMoralis();
  const [list, setList] = useState([]);
  const fetchList = async () => {
    setList(await Moralis.Cloud.run("getMyList", { addrs: account }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchList();
    // console.log(list);
    return () => {};
  }, [account]);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: "5ch" }}>
        <Grid container spacing={1}>
          {list?.map((l, i) => (
            <>
              <Grid items sm={12} md={4} lg={2}>
                <CardDetails id={l.id} type={l.type} key={i} />
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Watchlist;
