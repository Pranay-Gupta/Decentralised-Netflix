import { Container, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import CardDetails from "../components/CardDetails/CardDetails";
const Watchlist = () => {
  const contractProcessor = useWeb3ExecuteFunction();
  const { account } = useMoralis();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchList = async () => {
    setIsLoading(true);
    let options = {
      contractAddress: process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
      functionName: "getWatchList",
      abi: [
        {
          inputs: [],
          name: "getWatchList",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "id",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "typeOfVideo",
                  type: "string",
                },
              ],
              internalType: "struct Netflix.content[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      params: {},
    };
    const data = await contractProcessor.fetch({
      params: options,
    });

    setList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, [account]);

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: "5vh", display: "flex", justifyContent: "center" }}
    >
      {isLoading ? (
        <ReactLoading type="bubbles" color="red" height={200} width={100} />
      ) : (
        <Grid container spacing={1}>
          {list?.map((l, i) => (
            <Grid items sm={12} md={4} lg={2}>
              <CardDetails id={l.id} type={l.typeOfVideo} key={i} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
