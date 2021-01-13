import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { MovieCards } from "./MovieCards";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
}));

export function SearchResults({
  searchKey,
  isError,
  error,
  numResult,
  addNomination,
  movieData,
  nominations,
  page,
  handlePageChange,
  isFiveNominations,
}) {
  const classes = useStyles();
  // display instruction that the search key needs to be longer than 2 characters
  if (searchKey.length < 3) {
    return (
      <Box>
        <h3>
          <span role="img" aria-label="find">
            🔍
          </span>{" "}
          Find a movie in the search bar above!
        </h3>
        <p>The keyword needs to be longer than 2 characters</p>
      </Box>
    );
    // display search error
  } else if (isError === true) {
    return (
      <Box>
        <h3>
          <span role="img" aria-label="film">
            🎞️
          </span>
          {"  "}
          No match for "{searchKey}" ({0})
        </h3>
        <p>
          <span role="img" aria-label="confused">
            😵
          </span>{" "}
          Check your spelling or try continue typing
        </p>
      </Box>
    );
    // display search results - button disabled if movie is nominated or have reached 5 nominations. pagination included
  } else {
    return (
      <Box>
        <h3>
          <span role="img" aria-label="film">
            🎞️
          </span>{" "}
          Results for "{searchKey}" ({numResult})
        </h3>
        <div>
          <MovieCards
            movieData={movieData}
            nominations={nominations}
            addNomination={addNomination}
            isFiveNominations={isFiveNominations}
          />
        </div>
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={Math.ceil(numResult / 10)}
          className={classes.pagination}
        />
      </Box>
    );
  }
}
