import React from "react";
import CardDetails from "./CardDetails/CardDetails";
import Grid from "@mui/material/Grid";
function SinglePage({ content, type }) {
  return (
    <>
      {content?.map((video) => (
        <Grid item xs={4} md={3} lg={2}>
          <CardDetails
            key={video.id}
            id={video.id}
            type={video.media_type || type}
          />
        </Grid>
      ))}
    </>
  );
}

export default SinglePage;
