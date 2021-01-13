import React from "react";
import { Box, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import { MovieCards } from "./SearchMovieCards";
import { MovieList } from "./SearchMovieList";

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
}) {
  const classes = useStyles();

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
  }

  if (isError) {
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
  }

  return (
    <Box>
      <h3>
        <span role="img" aria-label="film">
          🎞️
        </span>{" "}
        Results for "{searchKey}" ({numResult})
      </h3>
      <Hidden xsDown>
        <MovieCards
          movieData={movieData}
          nominations={nominations}
          addNomination={addNomination}
        />
      </Hidden>
      <Hidden smUp>
        <MovieList
          movieData={movieData}
          nominations={nominations}
          addNomination={addNomination}
        />
      </Hidden>

      <Pagination
        page={page}
        onChange={handlePageChange}
        count={Math.ceil(numResult / 10)}
        className={classes.pagination}
      />
    </Box>
  );
}
